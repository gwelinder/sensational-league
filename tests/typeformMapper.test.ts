import assert from "node:assert";
import {
	mapPlayerDraftResponse,
	type TypeformFormResponse,
} from "@/lib/typeform/typeformSharePointMapper";
import {
	PLAYER_DRAFT_EMAIL_FIELD_REF,
	PLAYER_DRAFT_NAME_FIELD_REF,
} from "@/lib/typeform/playerDraftFieldMap";

const mockResponse: TypeformFormResponse = {
  form_id: "player-draft-form",
  submitted_at: "2024-11-16T12:00:00.000Z",
  answers: [
		{ field: { id: "1", ref: PLAYER_DRAFT_NAME_FIELD_REF, type: "short_text" }, type: "text", text: "Ava Jensen" },
		{ field: { id: "2", ref: PLAYER_DRAFT_EMAIL_FIELD_REF, type: "email" }, type: "email", email: "ava@example.com" },
		{ field: { id: "3", ref: "6c7909fd-43b6-4364-b5d1-1101ffbebbb7", type: "short_text" }, type: "text", text: "Copenhagen" },
		{ field: { id: "4", ref: "214f283a-4639-4bc3-8500-30ab884a4107", type: "dropdown" }, type: "choice", choice: { label: "18-24" } },
		{ field: { id: "5", ref: "e800711a-6c8b-4e48-9bfd-0695cde52847", type: "dropdown" }, type: "choice", choice: { label: "Division 1" } },
		{ field: { id: "6", ref: "c32c5729-8ced-41b9-96ca-0062923ce8e8", type: "dropdown" }, type: "choice", choice: { label: "Midfielder" } },
		{ field: { id: "7", ref: "d1b9952e-d449-4b49-8aef-0eb67e2c13d1", type: "yes_no" }, type: "boolean", boolean: true },
		{ field: { id: "8", ref: "4a83d967-7882-445e-8ece-514f18daaa56", type: "short_text" }, type: "text", text: "Volt FC" },
		{ field: { id: "9", ref: "3e59cf61-2f98-410f-a5f0-991de5704523", type: "yes_no" }, type: "boolean", boolean: false },
		{ field: { id: "10", ref: "c5d76cf8-728b-4c37-8151-d3df08a49c4d", type: "long_text" }, type: "text", text: "Street Queens" },
		{ field: { id: "11", ref: "fe493c99-d514-4b6b-a4e0-55a7f99d05bf", type: "long_text" }, type: "text", text: "Playmaking" },
		{ field: { id: "12", ref: "f727661e-eea7-4651-a09f-3eefd6c33efa", type: "long_text" }, type: "text", text: "Marta" },
		{ field: { id: "13", ref: "2a2b5747-7373-4e92-a3a8-cbde342e877b", type: "long_text" }, type: "text", text: "Community + football" },
		{ field: { id: "14", ref: "9aa71f75-0a6d-410c-9863-194e609ef265", type: "yes_no" }, type: "boolean", boolean: true },
    {
			field: { id: "15", ref: "8a44b217-206f-4c4f-8a1d-64d9f00d9c4b", type: "multiple_choice" },
      type: "choices",
      choices: { labels: ["Instagram", "TikTok"] },
    },
		{ field: { id: "16", ref: "c60e34de-71fc-4e84-b264-b9c84b53997c", type: "long_text" }, type: "text", text: "@ava" },
		{
			field: { id: "17", ref: "f4acdd57-f3ac-460a-9978-6b9e08621527", type: "multiple_choice" },
			type: "choices",
			choices: { labels: ["Volunteer", "Content team"] },
		},
  ],
};

const result = mapPlayerDraftResponse(mockResponse);

assert.strictEqual(result.fields.Title, "Ava Jensen");
assert.strictEqual(result.fields.City, "Copenhagen");
assert.strictEqual(result.fields.Agegroup, "18-24");
assert.strictEqual(result.fields.Highestlevel, "Division 1");
assert.strictEqual(result.fields.Preferredposition, "Midfielder");
assert.strictEqual(result.fields.Currentlyactiveclub_x003f_, "Yes");
assert.strictEqual(result.fields.Previouslyactiveclub_x003f_, "No");
assert.strictEqual(result.fields.Socialmediaplatforms, "Instagram, TikTok");
assert.strictEqual(result.fields.Interestifnotselected, "Volunteer, Content team");
assert.strictEqual(result.email, "ava@example.com");
assert.strictEqual(result.fullName, "Ava Jensen");
assert.strictEqual(result.missingRequired.length, 0);
assert.strictEqual(result.fields.STATUS, "Submitted");

console.log("✅ typeformMapper tests passed");
