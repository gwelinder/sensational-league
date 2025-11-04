"use client";

import { PortableText } from "@portabletext/react";
import { createDataAttribute } from "@sanity/visual-editing";
import { useEffect, useState } from "react";
import type { PortableTextBlock } from "sanity";

interface PressPhoto {
	id: string;
	name: string;
	downloadUrl: string;
	thumbnails?: {
		medium?: string;
		large?: string;
	};
}

interface PressReleaseProps {
	content: {
		_id: string;
		_type: string;
		publishDate: string;
		// Danish fields
		headlineDa: string;
		subheadlineDa?: string;
		contentDa: PortableTextBlock[];
		aboutSectionsDa?: Array<{
			title: string;
			content: string;
		}>;
		// English fields
		headlineEn?: string;
		subheadlineEn?: string;
		contentEn?: PortableTextBlock[];
		aboutSectionsEn?: Array<{
			title: string;
			content: string;
		}>;
		// Shared fields
		contactPerson?: {
			name?: string;
			title?: string;
			phone?: string;
			email?: string;
		};
	};
}

export default function PressReleaseContent({
	content: pressRelease,
}: PressReleaseProps) {
	// Check if English version exists and set as default
	const hasEnglish = !!(pressRelease.headlineEn && pressRelease.contentEn);
	const [language, setLanguage] = useState<"da" | "en">(
		hasEnglish ? "en" : "da",
	);
	const [photos, setPhotos] = useState<PressPhoto[]>([]);
	const [loadingPhotos, setLoadingPhotos] = useState(true);

	useEffect(() => {
		// Fetch photos from SharePoint
		fetch("/api/press-kit")
			.then((res) => res.json())
			.then((data) => {
				if (data.success && data.photos) {
					setPhotos(data.photos);
					// Debug: Log all photo names to find the right ones
					console.log("Available photos:", data.photos.map((p: PressPhoto) => p.name));
				}
				setLoadingPhotos(false);
			})
			.catch((err) => {
				console.error("Failed to load photos:", err);
				setLoadingPhotos(false);
			});
	}, []);

	const printAsPDF = () => {
		window.print();
	};

	// Find founder photos - specific profile photos
	// Bettina: standing full-body photo (usually named with "profil" or "standing")
	// Majken: portrait with scarf
	const bettinaPhoto =
		photos.find((p) => p.name === "Bettina - Profil.jpg") ||
		photos.find((p) => 
			p.name.toLowerCase().includes("bettina") && 
			(p.name.toLowerCase().includes("profil") || p.name.toLowerCase().includes("standing"))
		) ||
		photos.find((p) => p.name.toLowerCase().includes("bettina") && !p.name.toLowerCase().includes("group"));
	
	const majkenPhoto =
		photos.find((p) => p.name === "Majken - Profil.jpg") ||
		photos.find((p) => 
			p.name.toLowerCase().includes("majken") && 
			(p.name.toLowerCase().includes("profil") || p.name.toLowerCase().includes("scarf"))
		) ||
		photos.find((p) => p.name.toLowerCase().includes("majken") && !p.name.toLowerCase().includes("group"));

	// Format date in Danish
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("da-DK", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	};

	// Get current language content
	const headline =
		language === "en" ? pressRelease.headlineEn : pressRelease.headlineDa;
	const subheadline =
		language === "en" ? pressRelease.subheadlineEn : pressRelease.subheadlineDa;
	const content =
		language === "en" ? pressRelease.contentEn : pressRelease.contentDa;
	const aboutSections =
		language === "en"
			? pressRelease.aboutSectionsEn
			: pressRelease.aboutSectionsDa;

	// Data attributes for visual editing
	const headlineAttr = createDataAttribute({
		id: pressRelease._id,
		type: pressRelease._type,
		path: language === "en" ? "headlineEn" : "headlineDa",
	});

	const subheadlineAttr = createDataAttribute({
		id: pressRelease._id,
		type: pressRelease._type,
		path: language === "en" ? "subheadlineEn" : "subheadlineDa",
	});

	const contentAttr = createDataAttribute({
		id: pressRelease._id,
		type: pressRelease._type,
		path: language === "en" ? "contentEn" : "contentDa",
	});

	return (
		<div>
			{/* Language Toggle & PDF Download - Sticky */}
			<div className="sticky top-4 z-10 mb-8 flex justify-between items-center gap-4 print:hidden">
				{/* Language Toggle - Only show if English version exists */}
				{hasEnglish && (
					<div className="flex gap-2 border-2 border-black">
						<button
							type="button"
							onClick={() => setLanguage("da")}
							className={`px-4 py-2 font-bold uppercase tracking-wider transition-all duration-200 ${
								language === "da"
									? "bg-[var(--color-volt)] text-black"
									: "bg-white text-black hover:bg-gray-100"
							}`}
							style={{
								fontFamily: "'GT Standard Narrow', sans-serif",
								fontWeight: 700,
							}}
						>
							🇩🇰 DA
						</button>
						<button
							type="button"
							onClick={() => setLanguage("en")}
							className={`px-4 py-2 font-bold uppercase tracking-wider transition-all duration-200 ${
								language === "en"
									? "bg-[var(--color-volt)] text-black"
									: "bg-white text-black hover:bg-gray-100"
							}`}
							style={{
								fontFamily: "'GT Standard Narrow', sans-serif",
								fontWeight: 700,
							}}
						>
							🇬🇧 EN
						</button>
					</div>
				)}

				<button
					type="button"
					onClick={printAsPDF}
					className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-volt)] text-black font-bold uppercase tracking-wider hover:bg-black hover:text-[var(--color-volt)] transition-all duration-200 border-2 border-black"
					style={{
						fontFamily: "'GT Standard Narrow', sans-serif",
						fontWeight: 700,
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="6 9 6 2 18 2 18 9" />
						<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
						<rect x="6" y="14" width="12" height="8" />
					</svg>
					{language === "en" ? "Save as PDF" : "Gem som PDF"}
				</button>
			</div>

			{/* Press Release Content */}
			<div id="press-release-content" className="print:space-y-4">
				{/* Header with Spark Logo */}
				<div className="flex items-center justify-between mb-12 pb-8 border-b-2 border-black print:mb-6 print:pb-4">
					<div>
						<img
							src="/logos/SL-SPARK-LARGE.svg"
							alt="Sensational League"
							className="w-16 h-16 mb-4"
						/>
						<p
							className="text-xs uppercase tracking-widest text-gray-600"
							style={{ fontFamily: "'GT Standard Mono', monospace" }}
						>
							Pressemeddelelse
						</p>
						<p
							className="text-xs tracking-wide text-gray-600"
							style={{
								fontFamily: "'GT Standard Small Narrow', sans-serif",
								fontWeight: 500,
							}}
						>
							{formatDate(pressRelease.publishDate)}
						</p>
					</div>
					<a
						href="/"
						className="text-sm text-gray-600 hover:text-black transition-colors print:hidden"
						style={{
							fontFamily: "'GT Standard Small Narrow', sans-serif",
							fontWeight: 500,
						}}
					>
						← {language === "en" ? "Back" : "Tilbage"}
					</a>
				</div>

				{/* Main Headline - GT Standard L Expanded Light, 18pt */}
				<h1
					className="mb-8 text-[18pt] leading-[1.2] tracking-wide uppercase text-black"
					style={{
						fontFamily: "'GT Standard Large', sans-serif",
						fontWeight: 300,
					}}
					data-sanity={headlineAttr?.toString()}
				>
					{headline}
				</h1>

				{/* Subheader - GT Standard L Narrow */}
				{subheadline && (
					<h2
						className="mb-12 text-xl md:text-2xl leading-relaxed text-black"
						style={{
							fontFamily: "'GT Standard Large Narrow', sans-serif",
							fontWeight: 500,
						}}
						data-sanity={subheadlineAttr?.toString()}
					>
						{subheadline}
					</h2>
				)}

				{/* Body Text - GT Standard S Narrow Medium with Portable Text */}
				<div
					className="prose prose-lg max-w-none"
					data-sanity={contentAttr?.toString()}
					style={{
						fontFamily: "'GT Standard Small Narrow', sans-serif",
						fontWeight: 500,
					}}
				>
					<PortableText
						value={content || []}
						components={{
							block: {
								normal: ({ children }) => (
									<p className="mb-6 text-base md:text-lg leading-relaxed text-black">
										{children}
									</p>
								),
								h3: ({ children }) => (
									<h3
										className="text-xl md:text-2xl mt-12 mb-4 uppercase tracking-wide text-black"
										style={{
											fontFamily: "'GT Standard Large Narrow', sans-serif",
											fontWeight: 700,
										}}
									>
										{children}
									</h3>
								),
								h4: ({ children }) => (
									<h4
										className="text-lg md:text-xl mt-8 mb-3 uppercase tracking-wide text-black"
										style={{
											fontFamily: "'GT Standard Large Narrow', sans-serif",
											fontWeight: 700,
										}}
									>
										{children}
									</h4>
								),
								blockquote: ({ children }) => (
									<blockquote
										className="my-8 pl-6 border-l-[6px] border-[var(--color-volt)] italic text-lg md:text-xl text-black"
										style={{
											fontFamily: "'GT Standard Small Narrow', sans-serif",
											fontWeight: 500,
										}}
									>
										{children}
									</blockquote>
								),
							},
							list: {
								bullet: ({ children }) => (
									<ul className="list-disc pl-6 space-y-2 my-6 text-black">
										{children}
									</ul>
								),
								number: ({ children }) => (
									<ol className="list-decimal pl-6 space-y-2 my-6 text-black">
										{children}
									</ol>
								),
							},
							listItem: {
								bullet: ({ children }) => (
									<li className="text-black">{children}</li>
								),
								number: ({ children }) => (
									<li className="text-black">{children}</li>
								),
							},
							marks: {
								strong: ({ children }) => (
									<strong className="font-bold text-black">{children}</strong>
								),
								em: ({ children }) => (
									<em className="italic text-black">{children}</em>
								),
							},
						}}
					/>
				</div>

				{/* Founder Photos - if available from SharePoint */}
				{!loadingPhotos && (bettinaPhoto || majkenPhoto) && (
					<div className="grid md:grid-cols-2 gap-6 my-12 print:page-break-inside-avoid print:break-inside-avoid">
						{majkenPhoto && (
							<div className="border-4 border-black">
								<img
									src={majkenPhoto.thumbnails?.large || majkenPhoto.downloadUrl}
									alt="Majken Gilmartin"
									className="w-full aspect-[4/5] object-cover"
									crossOrigin="anonymous"
								/>
								<div className="p-4 bg-black text-white">
									<p
										className="text-sm font-bold uppercase"
										style={{
											fontFamily: "'GT Standard Narrow', sans-serif",
											fontWeight: 700,
										}}
									>
										Majken Gilmartin
									</p>
									<p
										className="text-xs"
										style={{
											fontFamily: "'GT Standard Small Narrow', sans-serif",
											fontWeight: 500,
										}}
									>
										COO, Saga Sports Group
									</p>
								</div>
							</div>
						)}
						{bettinaPhoto && (
							<div className="border-4 border-black">
								<img
									src={
										bettinaPhoto.thumbnails?.large || bettinaPhoto.downloadUrl
									}
									alt="Bettina Kuperman"
									className="w-full aspect-[4/5] object-cover"
									crossOrigin="anonymous"
								/>
								<div className="p-4 bg-black text-white">
									<p
										className="text-sm font-bold uppercase"
										style={{
											fontFamily: "'GT Standard Narrow', sans-serif",
											fontWeight: 700,
										}}
									>
										Bettina Kuperman
									</p>
									<p
										className="text-xs"
										style={{
											fontFamily: "'GT Standard Small Narrow', sans-serif",
											fontWeight: 500,
										}}
									>
										CEO, Saga Sports Group
									</p>
								</div>
							</div>
						)}
					</div>
				)}

				{/* Contact Person Section */}
				{pressRelease.contactPerson && (
					<div className="mt-16 pt-8 border-t-2 border-black">
						<h3
							className="text-xl md:text-2xl mb-6 uppercase tracking-wide text-black"
							style={{
								fontFamily: "'GT Standard Large Narrow', sans-serif",
								fontWeight: 700,
							}}
						>
							{language === "en" ? "Press Inquiries" : "Pressehenvendelser"}
						</h3>{" "}
						<div className="space-y-2">
							{pressRelease.contactPerson.name && (
								<p>
									<strong>{pressRelease.contactPerson.name}</strong>
								</p>
							)}
							{pressRelease.contactPerson.title && (
								<p>{pressRelease.contactPerson.title}</p>
							)}
							<p>
								{pressRelease.contactPerson.phone && (
									<>
										<a
											href={`tel:${pressRelease.contactPerson.phone.replace(/\s/g, "")}`}
											className="hover:text-[var(--color-volt)] transition-colors"
										>
											{pressRelease.contactPerson.phone}
										</a>
										{pressRelease.contactPerson.email && " | "}
									</>
								)}
								{pressRelease.contactPerson.email && (
									<a
										href={`mailto:${pressRelease.contactPerson.email}`}
										className="hover:text-[var(--color-volt)] transition-colors"
									>
										{pressRelease.contactPerson.email}
									</a>
								)}
							</p>
							<p>
								<a
									href="https://sensationalleague.com"
									className="hover:text-[var(--color-volt)] transition-colors"
								>
									sensationalleague.com
								</a>
							</p>
							<p>
								<strong>
									{language === "en" ? "Press Materials" : "Pressemateriale"}:
								</strong>{" "}
								<a
									href="https://sagasportsgroup.com/press"
									className="hover:text-[var(--color-volt)] transition-colors"
								>
									sagasportsgroup.com/press
								</a>
							</p>
						</div>
					</div>
				)}

				{/* About Sections (Om Founders, Om Saga Sports Group, etc.) */}
				{aboutSections && aboutSections.length > 0 && (
					<div className="mt-12 pt-8 border-t-2 border-gray-200 space-y-8">
						{aboutSections.map((section, index) => (
							<div key={index}>
								<h4
									className="text-lg md:text-xl mb-3 uppercase tracking-wide text-black"
									style={{
										fontFamily: "'GT Standard Large Narrow', sans-serif",
										fontWeight: 700,
									}}
								>
									{section.title}
								</h4>
								<p
									className="text-sm md:text-base leading-relaxed whitespace-pre-line text-black"
									style={{
										fontFamily: "'GT Standard Small Narrow', sans-serif",
										fontWeight: 500,
									}}
								>
									{section.content}
								</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Press Photos Section - Below the article */}
			{!loadingPhotos && photos.length > 0 && (
				<div className="mt-16 pt-12 border-t-4 border-black print:mt-8 print:pt-8 print:border-t-2">
					<h3
						className="text-xl md:text-2xl mb-8 uppercase tracking-wide text-black"
						style={{
							fontFamily: "'GT Standard Large Narrow', sans-serif",
							fontWeight: 700,
						}}
					>
						{language === "en" ? "Press Photos" : "Pressebilleder"}
					</h3>{" "}
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-3">
						{photos.map((photo) => (
							<a
								key={photo.id}
								href={photo.downloadUrl}
								download
								className="group relative aspect-square border-2 border-black overflow-hidden hover:border-[var(--color-volt)] transition-all duration-200 print:border print:hover:border-black"
							>
								<img
									src={
										photo.thumbnails?.medium ||
										photo.thumbnails?.large ||
										photo.downloadUrl
									}
									alt={photo.name}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 print:group-hover:scale-100"
									crossOrigin="anonymous"
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center print:hidden">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="white"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
									>
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="7 10 12 15 17 10" />
										<line x1="12" y1="15" x2="12" y2="3" />
									</svg>
								</div>
							</a>
						))}
					</div>
					<p
						className="mt-6 text-sm text-gray-600 text-center print:hidden"
						style={{
							fontFamily: "'GT Standard Small Narrow', sans-serif",
							fontWeight: 500,
						}}
					>
						{language === "en"
							? "Click on the image to download in full size"
							: "Klik på billedet for at downloade i fuld størrelse"}
					</p>
				</div>
			)}
		</div>
	);
}
