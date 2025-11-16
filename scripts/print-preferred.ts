#!/usr/bin/env tsx
import { playerDraftFieldMap } from "../src/lib/typeform/playerDraftFieldMap";

const entry = playerDraftFieldMap.find((item) => item.spField === "Preferredposition");
console.log(entry);
