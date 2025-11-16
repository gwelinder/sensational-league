export type FieldKind =
	| "text"
	| "longText"
	| "number"
	| "email"
	| "choice"
	| "multiChoice"
	| "boolean"
	| "file";

export type FieldValue = string | number | boolean | string[];

export interface FieldMapEntry {
	/** Typeform field.ref */
	ref: string;
	/** SharePoint internal field name (optional for fields only used outside SharePoint like email) */
	spField?: string;
	kind: FieldKind;
	required?: boolean;
	/** Optional custom formatter */
	formatter?: (value: FieldValue, rawValue?: FieldValue) => FieldValue;
	/** Optional source (defaults to answers array) */
	source?: "answers" | "hidden";
}

export const PLAYER_DRAFT_NAME_FIELD_REF = "5aa8e9df-1f61-4ec9-aa7c-8c94e4292438"; // First name
export const PLAYER_DRAFT_LAST_NAME_FIELD_REF = "602744a3-bda7-4f47-831e-223b36fa00ec";
export const PLAYER_DRAFT_EMAIL_FIELD_REF = "1344d8a0-7a64-4a7b-a5a3-6fb8dbc92392";

/**
	* Centralized mapping between the Player Draft Typeform (WS. Sensational League Player Draft 2025/2026)
	* and SharePoint PlayerApplications column internal names.
	*
	* IMPORTANT: When Typeform questions change, update the `ref` value for the affected entry. If SharePoint
	* columns are renamed, update `spField`. Use `node check-list-columns.mjs PlayerApplications --show-hidden`
	* to inspect current column internals before editing this file.
	*/
const basePlayerDraftFieldMap: FieldMapEntry[] = [
	{ ref: PLAYER_DRAFT_NAME_FIELD_REF, kind: "text", required: true },
	{ ref: PLAYER_DRAFT_LAST_NAME_FIELD_REF, kind: "text" },
	{ ref: "6c7909fd-43b6-4364-b5d1-1101ffbebbb7", spField: "City", kind: "text" },
	{ ref: "214f283a-4639-4bc3-8500-30ab884a4107", spField: "Agegroup", kind: "choice" },
	{ ref: "e800711a-6c8b-4e48-9bfd-0695cde52847", spField: "Highestlevel", kind: "choice" },
	{ ref: "c32c5729-8ced-41b9-96ca-0062923ce8e8", spField: "Preferredposition", kind: "choice" },
	{
		ref: "d1b9952e-d449-4b49-8aef-0eb67e2c13d1",
		spField: "Currentlyactiveclub_x003f_",
		kind: "boolean",
	},
	{ ref: "4a83d967-7882-445e-8ece-514f18daaa56", spField: "Activeclubname", kind: "text" },
	{
		ref: "3e59cf61-2f98-410f-a5f0-991de5704523",
		spField: "Previouslyactiveclub_x003f_",
		kind: "boolean",
	},
	{ ref: "c5d76cf8-728b-4c37-8151-d3df08a49c4d", spField: "Pastclubnames", kind: "longText" },
	{ ref: "fe493c99-d514-4b6b-a4e0-55a7f99d05bf", spField: "Superpower", kind: "longText" },
	{ ref: "f727661e-eea7-4651-a09f-3eefd6c33efa", spField: "Playeridol", kind: "longText" },
	{
		ref: "2a2b5747-7373-4e92-a3a8-cbde342e877b",
		spField: "Funsuccessdefinition",
		kind: "longText",
	},
	{
		ref: "9aa71f75-0a6d-410c-9863-194e609ef265",
		spField: "Areyouactiveonsocialmediaplatfor",
		kind: "boolean",
	},
	{ ref: "8a44b217-206f-4c4f-8a1d-64d9f00d9c4b", spField: "Socialmediaplatforms", kind: "multiChoice" },
	{ ref: "c60e34de-71fc-4e84-b264-b9c84b53997c", spField: "Socialmediahandles", kind: "longText" },
	{
		ref: "f4acdd57-f3ac-460a-9978-6b9e08621527",
		spField: "Interestifnotselected",
		kind: "multiChoice",
	},
	{ ref: PLAYER_DRAFT_EMAIL_FIELD_REF, kind: "email", required: true },
];

const motivationalVideoRef = process.env.TYPEFORM_PLAYERDRAFT_VIDEO_FIELD_REF;
if (motivationalVideoRef) {
	basePlayerDraftFieldMap.push({
		ref: motivationalVideoRef,
		spField: process.env.SHAREPOINT_PLAYER_APPLICATIONS_VIDEO_FIELD,
		kind: "file",
	});
}

export const playerDraftFieldMap: FieldMapEntry[] = basePlayerDraftFieldMap;
