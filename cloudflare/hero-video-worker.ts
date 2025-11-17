type R2ObjectBody = ReadableStream | null;

interface R2Object {
	size: number;
	body: R2ObjectBody;
}

interface R2Bucket {
	head(key: string): Promise<R2Object | null>;
	get(key: string, options?: { range?: { offset: number; length?: number } }): Promise<R2Object | null>;
}

interface Env {
	HERO_VIDEOS: R2Bucket;
}

type KnownVariant = "wide" | "vertical" | "square";

const VARIANT_KEYS: Record<KnownVariant, string> = {
	wide: "hero-wide.mp4",
	vertical: "hero-vertical.mp4",
	square: "hero-square.mp4",
};

const HERO_ALIAS_TO_KEY: Record<string, string> = {
	"": VARIANT_KEYS.wide,
	w: VARIANT_KEYS.wide,
	wide: VARIANT_KEYS.wide,
	"hero-wide": VARIANT_KEYS.wide,
	"hero-wide.mp4": VARIANT_KEYS.wide,
	desktop: VARIANT_KEYS.wide,
	default: VARIANT_KEYS.wide,
	vertical: VARIANT_KEYS.vertical,
	portrait: VARIANT_KEYS.vertical,
	mobile: VARIANT_KEYS.vertical,
	"hero-vertical": VARIANT_KEYS.vertical,
	"hero-vertical.mp4": VARIANT_KEYS.vertical,
	square: VARIANT_KEYS.square,
	tablet: VARIANT_KEYS.square,
	"hero-square": VARIANT_KEYS.square,
	"hero-square.mp4": VARIANT_KEYS.square,
};

const CAPTAIN_VIDEO_KEYS: Record<string, string> = {
	bettina: "captain-bettina.mp4",
	line: "captain-line.mp4",
	theresa: "captain-theresa.mp4",
	nina: "captain-nina.mp4",
	nicoline: "captain-nicoline.mp4",
	rikke: "captain-rikke.mp4",
};

function normalizeKey(pathname: string): string {
	const trimmed = pathname.replace(/^\/+/, "").replace(/\/+$/, "");
	return trimmed.toLowerCase();
}

function buildCandidateKeys(pathname: string): string[] {
	const normalized = normalizeKey(pathname);
	const candidates: string[] = [];

	if (!normalized) {
		return [VARIANT_KEYS.wide];
	}

	const heroKey = HERO_ALIAS_TO_KEY[normalized];
	if (heroKey) {
		candidates.push(heroKey);
	}

	if (normalized.includes(".")) {
		candidates.push(normalized);
	} else {
		candidates.push(`${normalized}.mp4`);
	}

	const slug = normalized
		.replace(/^captains\//, "")
		.replace(/\.mp4$/, "")
		.replace(/[^a-z0-9-]/gi, "")
		.toLowerCase();

	if (slug && CAPTAIN_VIDEO_KEYS[slug]) {
		candidates.push(CAPTAIN_VIDEO_KEYS[slug]);
	}

	// When someone explicitly requests hero variant filenames, include them directly
	if ((Object.values(VARIANT_KEYS) as string[]).includes(normalized)) {
		candidates.push(normalized);
	}

	return Array.from(new Set(candidates.filter(Boolean)));
}

function parseRangeHeader(rangeValue: string, size: number) {
	const match = /^bytes=(\d+)-(\d+)?$/i.exec(rangeValue.trim());
	if (!match) return null;
	const start = Number(match[1]);
	if (Number.isNaN(start) || start >= size) return null;
	const endRaw = match[2];
	const end = endRaw ? Number(endRaw) : size - 1;
	if (Number.isNaN(end) || end < start) return null;
	const length = end - start + 1;
	return { offset: start, length, end: Math.min(end, size - 1) };
}

const baseHeaders = {
	"Access-Control-Allow-Origin": "*",
	"Accept-Ranges": "bytes",
	"Cache-Control": "public, max-age=3600, s-maxage=86400",
	"Content-Type": "video/mp4",
};

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (request.method !== "GET" && request.method !== "HEAD") {
			return new Response("Method Not Allowed", {
				status: 405,
				headers: { Allow: "GET, HEAD" },
			});
		}

		const url = new URL(request.url);
		const candidates = buildCandidateKeys(url.pathname);
		let selectedKey: string | null = null;
		let head: R2Object | null = null;

		for (const key of candidates) {
			const objectHead = await env.HERO_VIDEOS.head(key);
			if (objectHead) {
				selectedKey = key;
				head = objectHead;
				break;
			}
		}

		if (!selectedKey || !head) {
			return new Response("Not found", { status: 404 });
		}

		const size = head.size;
		const rangeHeader = request.headers.get("range");
		const range = rangeHeader ? parseRangeHeader(rangeHeader, size) : null;
		const object = await env.HERO_VIDEOS.get(selectedKey, range ? { range } : undefined);
		if (!object) {
			return new Response("Not found", { status: 404 });
		}

		const headers = new Headers(baseHeaders);
		headers.set("Content-Length", range ? String(range.length) : String(size));
		headers.set("Content-Disposition", `inline; filename="${selectedKey}"`);

		if (range) {
			const actualEnd = Math.min(range.offset + range.length - 1, size - 1);
			headers.set("Content-Range", `bytes ${range.offset}-${actualEnd}/${size}`);
			return new Response(request.method === "HEAD" ? null : object.body, {
				status: 206,
				headers,
			});
		}

		return new Response(request.method === "HEAD" ? null : object.body, {
			status: 200,
			headers,
		});
	},
};
