"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import JSZip from "jszip";
import Button from "./Button";

interface PressKitFile {
	id: string;
	name: string;
	size: number;
	downloadUrl: string;
	thumbnails?: {
		small?: string; // 96x96
		medium?: string; // 176x176
		large?: string; // 800x800
	};
}

interface PressKitData {
	logos: PressKitFile[];
	photos: PressKitFile[];
}

function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

export default function MediaKit() {
	const [data, setData] = useState<PressKitData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [downloadingZip, setDownloadingZip] = useState(false);
	const [expandedSections, setExpandedSections] = useState({
		svgLogos: true,
		pngLogos: true,
		photos: true,
	});

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};

	useEffect(() => {
		fetch("/api/press-kit")
			.then((res) => {
				if (!res.ok) throw new Error("Failed to load media kit");
				return res.json();
			})
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	const downloadAllAsZip = async (type: "logos" | "photos" | "all") => {
		if (!data) return;

		setDownloadingZip(true);
		try {
			const zip = new JSZip();
			const files =
				type === "all"
					? [...data.logos, ...data.photos]
					: type === "logos"
						? data.logos
						: data.photos;

			// Create folders
			const logosFolder = zip.folder("Logos");
			const photosFolder = zip.folder("Photos");

			// Download and add files to ZIP
			await Promise.all(
				files.map(async (file) => {
					try {
						const response = await fetch(file.downloadUrl);
						const blob = await response.blob();
						const isLogo = data.logos.some((l) => l.id === file.id);

						if (isLogo && logosFolder) {
							logosFolder.file(file.name, blob);
						} else if (photosFolder) {
							photosFolder.file(file.name, blob);
						}
					} catch (err) {
						console.error(`Failed to download ${file.name}`, err);
					}
				}),
			);

			// Generate and download ZIP
			const content = await zip.generateAsync({ type: "blob" });
			const url = URL.createObjectURL(content);
			const link = document.createElement("a");
			link.href = url;
			link.download = `saga-sports-group-media-kit-${type}.zip`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);
		} catch (err) {
			console.error("Failed to create ZIP", err);
			alert("Failed to create ZIP file. Please try again.");
		} finally {
			setDownloadingZip(false);
		}
	};

	if (loading) {
		return (
			<div className="text-center py-12">
				<p className="text-[var(--foreground-muted)]">Loading media kit...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-[var(--foreground-muted)]">
					Unable to load media kit: {error}
				</p>
			</div>
		);
	}

	if (!data) return null;

	// Sort logos: SVG first, then PNG
	const sortedLogos = [...data.logos].sort((a, b) => {
		const aExt = a.name.toLowerCase().split(".").pop() || "";
		const bExt = b.name.toLowerCase().split(".").pop() || "";
		if (aExt === "svg" && bExt !== "svg") return -1;
		if (aExt !== "svg" && bExt === "svg") return 1;
		return a.name.localeCompare(b.name);
	});

	// Group logos by type
	const svgLogos = sortedLogos.filter((l) => l.name.toLowerCase().endsWith(".svg"));
	const pngLogos = sortedLogos.filter((l) => l.name.toLowerCase().endsWith(".png"));

	return (
		<div className="space-y-16">
			{/* Logos Section */}
			{data.logos.length > 0 && (
				<div>
					<div className="flex items-center justify-between mb-8">
						<h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground-muted)]">
							Logos
						</h3>
						<button
							onClick={() => downloadAllAsZip("logos")}
							disabled={downloadingZip}
							className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] text-sm font-medium uppercase tracking-wider hover:border-[var(--primary)] transition-colors disabled:opacity-50"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="21 8 21 21 3 21 3 8" />
								<rect x="1" y="3" width="22" height="5" />
								<line x1="10" y1="12" x2="14" y2="12" />
							</svg>
							{downloadingZip ? "Creating ZIP..." : "Download All"}
						</button>
					</div>

					{/* SVG Logos */}
					{svgLogos.length > 0 && (
						<div className="mb-8">
							<button
								onClick={() => toggleSection("svgLogos")}
								className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-4 hover:text-[var(--foreground)] transition-colors"
							>
								<span>SVG Files ({svgLogos.length})</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className={`transition-transform ${expandedSections.svgLogos ? "rotate-180" : ""}`}
								>
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>
							{expandedSections.svgLogos && (
								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
								{svgLogos.map((logo) => (
									<a
										key={logo.id}
										href={logo.downloadUrl}
										download
										className="bg-[var(--surface)] border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors group"
									>
										<div className="aspect-square flex items-center justify-center mb-4 bg-white/5">
											{logo.thumbnails?.medium || logo.thumbnails?.large ? (
												<Image
													src={logo.thumbnails.medium || logo.thumbnails.large || ""}
													alt={logo.name}
													width={200}
													height={200}
													sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
													className="max-w-full max-h-full object-contain"
													loading="lazy"
												/>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="48"
													height="48"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="text-[var(--foreground-muted)]"
												>
													<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
													<circle cx="8.5" cy="8.5" r="1.5" />
													<polyline points="21 15 16 10 5 21" />
												</svg>
											)}
										</div>
										<p className="text-xs font-medium text-[var(--foreground)] mb-1 truncate group-hover:text-[var(--primary)]">
											{logo.name}
										</p>
										<p className="text-xs text-[var(--foreground-muted)]">
											{formatFileSize(logo.size)}
										</p>
									</a>
								))}
								</div>
							)}
						</div>
					)}

					{/* PNG Logos */}
					{pngLogos.length > 0 && (
						<div>
							<button
								onClick={() => toggleSection("pngLogos")}
								className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-[var(--foreground-muted)] mb-4 hover:text-[var(--foreground)] transition-colors"
							>
								<span>PNG Files ({pngLogos.length})</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className={`transition-transform ${expandedSections.pngLogos ? "rotate-180" : ""}`}
								>
									<polyline points="6 9 12 15 18 9" />
								</svg>
							</button>
							{expandedSections.pngLogos && (
								<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
								{pngLogos.map((logo) => (
									<a
										key={logo.id}
										href={logo.downloadUrl}
										download
										className="bg-[var(--surface)] border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors group"
									>
										<div className="aspect-square flex items-center justify-center mb-4 bg-white/5">
											{logo.thumbnails?.medium || logo.thumbnails?.large ? (
												<Image
													src={logo.thumbnails.medium || logo.thumbnails.large || ""}
													alt={logo.name}
													width={200}
													height={200}
													sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
													className="max-w-full max-h-full object-contain"
													loading="lazy"
												/>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="48"
													height="48"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
													className="text-[var(--foreground-muted)]"
												>
													<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
													<circle cx="8.5" cy="8.5" r="1.5" />
													<polyline points="21 15 16 10 5 21" />
												</svg>
											)}
										</div>
										<p className="text-xs font-medium text-[var(--foreground)] mb-1 truncate group-hover:text-[var(--primary)]">
											{logo.name}
										</p>
										<p className="text-xs text-[var(--foreground-muted)]">
											{formatFileSize(logo.size)}
										</p>
									</a>
								))}
								</div>
							)}
						</div>
					)}
				</div>
			)}

			{/* Photos Section */}
			{data.photos.length > 0 && (
				<div>
					<div className="flex items-center justify-between mb-8">
						<button
							onClick={() => toggleSection("photos")}
							className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
						>
							<span>Press Photos ({data.photos.length})</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className={`transition-transform ${expandedSections.photos ? "rotate-180" : ""}`}
							>
								<polyline points="6 9 12 15 18 9" />
							</svg>
						</button>
						<button
							onClick={() => downloadAllAsZip("photos")}
							disabled={downloadingZip}
							className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] border border-[var(--border)] text-sm font-medium uppercase tracking-wider hover:border-[var(--primary)] transition-colors disabled:opacity-50"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polyline points="21 8 21 21 3 21 3 8" />
								<rect x="1" y="3" width="22" height="5" />
								<line x1="10" y1="12" x2="14" y2="12" />
							</svg>
							{downloadingZip ? "Creating ZIP..." : "Download All"}
						</button>
					</div>

					{expandedSections.photos && (
						<div className="bg-[var(--surface)] border border-[var(--border)] p-8">
						<p className="text-[var(--foreground-muted)] mb-8">
							High-resolution press photos ({formatFileSize(data.photos.reduce((sum, p) => sum + p.size, 0))} total). Click preview to view full size, or download individual photos.
						</p>

						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{data.photos.map((photo) => (
								<div
									key={photo.id}
									className="bg-[var(--background)] border border-[var(--border)] overflow-hidden hover:border-[var(--primary)] transition-colors group"
								>
									{/* Photo Preview */}
									{photo.thumbnails?.large ? (
										<a
											href={photo.thumbnails.large}
											target="_blank"
											rel="noopener noreferrer"
											className="block aspect-[4/3] bg-white/5 overflow-hidden"
										>
											<Image
												src={photo.thumbnails.large}
												alt={photo.name}
												width={800}
												height={600}
												sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
												className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
												loading="lazy"
											/>
										</a>
									) : (
										<div className="aspect-[4/3] bg-white/5 flex items-center justify-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="48"
												height="48"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="text-[var(--foreground-muted)]"
											>
												<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
												<circle cx="8.5" cy="8.5" r="1.5" />
												<polyline points="21 15 16 10 5 21" />
											</svg>
										</div>
									)}

									{/* Photo Info */}
									<div className="p-4">
										<p className="text-sm font-medium text-[var(--foreground)] mb-1 truncate">
											{photo.name}
										</p>
										<p className="text-xs text-[var(--foreground-muted)] mb-4">
											{formatFileSize(photo.size)}
										</p>
										<a
											href={photo.downloadUrl}
											download
											className="inline-flex items-center gap-2 px-4 py-2 w-full justify-center bg-[var(--primary)] text-white text-sm font-medium uppercase tracking-wider hover:bg-[var(--primary)]/90 transition-colors"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
												<polyline points="7 10 12 15 17 10" />
												<line x1="12" y1="15" x2="12" y2="3" />
											</svg>
											Download Full Size
										</a>
									</div>
								</div>
							))}
						</div>
						</div>
					)}
				</div>
			)}

			{/* Download All Section */}
			{(data.logos.length > 0 || data.photos.length > 0) && (
				<div className="text-center pt-8 border-t border-[var(--border)] space-y-6">
					<button
						onClick={() => downloadAllAsZip("all")}
						disabled={downloadingZip}
						className="inline-flex items-center gap-3 px-8 py-4 bg-[var(--primary)] text-white text-base font-bold uppercase tracking-wider hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50"
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
							<polyline points="21 8 21 21 3 21 3 8" />
							<rect x="1" y="3" width="22" height="5" />
							<line x1="10" y1="12" x2="14" y2="12" />
						</svg>
						{downloadingZip ? "Creating Complete Media Kit..." : "Download Complete Media Kit"}
					</button>
					<p className="text-[var(--foreground-muted)]">
						Need something else or have questions about usage rights?
					</p>
					<Button to="/contact" variant="secondary">
						Contact Media Relations
					</Button>
				</div>
			)}
		</div>
	);
}
