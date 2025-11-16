import type { FieldKind, FieldMapEntry, FieldValue } from "./playerDraftFieldMap";
import {
  PLAYER_DRAFT_EMAIL_FIELD_REF,
  PLAYER_DRAFT_NAME_FIELD_REF,
  playerDraftFieldMap,
} from "./playerDraftFieldMap";

export interface TypeformField {
  id: string;
  ref: string;
  type: string;
}

export interface TypeformAnswer {
  field: TypeformField;
  type: string;
  text?: string;
  number?: number;
  email?: string;
  boolean?: boolean;
  choice?: { label?: string };
  choices?: { labels?: string[] };
  phone_number?: string;
  file_url?: string;
  date?: string;
  url?: string;
}

export interface TypeformFormResponse {
  form_id: string;
  token: string;
  submitted_at?: string;
  landed_at?: string;
  hidden?: Record<string, string>;
  answers?: TypeformAnswer[];
}

export interface PlayerDraftMappingResult {
  fields: Record<string, unknown>;
  email?: string;
  fullName?: string;
  missingRequired: string[];
  unmappedRefs: string[];
}

function normalizeBoolean(value: unknown): string | null {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (typeof value === "string") {
    return value;
  }
  return null;
}

function extractAnswerValue(
  answer: TypeformAnswer | undefined,
  kind: FieldKind,
): FieldValue | null {
  if (!answer) return null;

  switch (kind) {
    case "text":
    case "longText":
      return answer.text ?? answer.email ?? answer.url ?? answer.phone_number ?? null;
    case "email":
      return answer.email ?? answer.text ?? null;
    case "number":
      return answer.number ?? null;
    case "choice":
      return answer.choice?.label ?? answer.text ?? null;
    case "multiChoice":
      if (answer.choices?.labels?.length) {
        return answer.choices.labels;
      }
      if (answer.choice?.label) {
        return [answer.choice.label];
      }
      if (answer.text) {
        return [answer.text];
      }
      return null;
    case "boolean": {
      if (typeof answer.boolean === "boolean") {
        return answer.boolean;
      }
      if (answer.choice?.label) {
        return ["yes", "true"].includes(answer.choice.label.toLowerCase());
      }
      if (typeof answer.text === "string") {
        return ["yes", "true"].includes(answer.text.toLowerCase());
      }
      return answer.boolean ?? null;
    }
	case "file":
		return answer.file_url ?? answer.url ?? answer.text ?? null;
    default:
      return answer.text ?? null;
  }
}

function buildAnswerMaps(formResponse: TypeformFormResponse) {
  const answers = formResponse.answers ?? [];
  const answerByRef = new Map<string, TypeformAnswer>();
  for (const answer of answers) {
    const ref = answer.field?.ref;
    if (ref) {
      answerByRef.set(ref, answer);
    }
  }
  return answerByRef;
}

const SUBMITTED_AT_FIELD = process.env.SHAREPOINT_PLAYER_APPLICATIONS_SUBMITTED_AT_FIELD;

export function mapPlayerDraftResponse(
  formResponse: TypeformFormResponse,
  customMap: FieldMapEntry[] = playerDraftFieldMap,
): PlayerDraftMappingResult {
  const answerByRef = buildAnswerMaps(formResponse);
  const hidden = formResponse.hidden ?? {};
  const fields: Record<string, unknown> = {};
  const missingRequired: string[] = [];

  for (const entry of customMap) {
    const sourceValue = entry.source === "hidden" ? hidden[entry.ref] : extractAnswerValue(answerByRef.get(entry.ref), entry.kind);

    if (
      sourceValue === null ||
      sourceValue === undefined ||
      sourceValue === "" ||
      (Array.isArray(sourceValue) && sourceValue.length === 0)
    ) {
      if (entry.required) {
        missingRequired.push(entry.ref);
      }
      continue;
    }

    if (!entry.spField) {
      continue;
    }

    let processedValue: FieldValue | null = sourceValue as FieldValue;
    if (entry.kind === "boolean") {
      processedValue = normalizeBoolean(sourceValue);
    }

    if (entry.kind === "multiChoice" && Array.isArray(sourceValue)) {
      processedValue = sourceValue.join(", ");
    }

    if (entry.formatter) {
      const safeValue = (processedValue ?? "") as FieldValue;
      processedValue = entry.formatter(safeValue, sourceValue as FieldValue);
    }

    if (processedValue !== null && processedValue !== undefined && processedValue !== "") {
      fields[entry.spField] = processedValue;
    }
  }

  const emailAnswer = answerByRef.get(PLAYER_DRAFT_EMAIL_FIELD_REF);
  const nameAnswer = answerByRef.get(PLAYER_DRAFT_NAME_FIELD_REF);
  const email = (extractAnswerValue(emailAnswer, "email") as string | null) ?? undefined;
  const fullName = (extractAnswerValue(nameAnswer, "text") as string | null) ?? undefined;

  if (fullName && !fields.Title) {
    fields.Title = fullName;
  }

  if (!fields.Title && email) {
    fields.Title = email;
  }

  if (!fields.STATUS) {
    fields.STATUS = "Submitted";
  }

  const submittedAt = formResponse.submitted_at || new Date().toISOString();
  if (SUBMITTED_AT_FIELD) {
    fields[SUBMITTED_AT_FIELD] = submittedAt;
  }

  const mappedRefs = new Set(customMap.map((entry) => entry.ref));
  const unmappedRefs: string[] = [];
  for (const ref of answerByRef.keys()) {
    if (!mappedRefs.has(ref)) {
      unmappedRefs.push(ref);
    }
  }

  if (process.env.NODE_ENV !== "production" && unmappedRefs.length > 0) {
    console.warn("⚠️ Unmapped Typeform refs detected:", unmappedRefs);
  }

  return {
    fields,
    email,
    fullName,
    missingRequired,
    unmappedRefs,
  };
}

export function buildSharePointFields(formResponse: TypeformFormResponse): Record<string, unknown> {
  return mapPlayerDraftResponse(formResponse).fields;
}
