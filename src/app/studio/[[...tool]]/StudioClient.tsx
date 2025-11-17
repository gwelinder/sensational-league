"use client";

import { NextStudio } from "next-sanity/studio";
import { StyleSheetManager } from "styled-components";
import config from "../../../../sanity.config";

export default function StudioClient() {
	return (
		<StyleSheetManager shouldForwardProp={(prop) => prop !== "disableTransition"}>
			<NextStudio config={config} />
		</StyleSheetManager>
	);
}
