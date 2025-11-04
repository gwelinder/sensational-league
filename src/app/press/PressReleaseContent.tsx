"use client";

import { useEffect, useState } from "react";

interface PressPhoto {
	id: string;
	name: string;
	downloadUrl: string;
	thumbnails?: {
		medium?: string;
		large?: string;
	};
}

export default function PressReleaseContent() {
	const [photos, setPhotos] = useState<PressPhoto[]>([]);
	const [loadingPhotos, setLoadingPhotos] = useState(true);

	useEffect(() => {
		// Fetch photos from SharePoint
		fetch("/api/press-kit")
			.then((res) => res.json())
			.then((data) => {
				if (data.success && data.photos) {
					setPhotos(data.photos);
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

	// Find founder photos
	const bettinaPhoto = photos.find(p => p.name.toLowerCase().includes('bettina'));
	const majkenPhoto = photos.find(p => p.name.toLowerCase().includes('majken'));

	return (
		<div>
			{/* PDF Download Button - Sticky */}
			<div className="sticky top-4 z-10 mb-8 flex justify-end print:hidden">
				<button
					onClick={printAsPDF}
					className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-volt)] text-black font-bold uppercase tracking-wider hover:bg-black hover:text-[var(--color-volt)] transition-all duration-200 border-2 border-black"
					style={{ fontFamily: "'GT Standard Narrow', sans-serif", fontWeight: 700 }}
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
					Gem som PDF
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
							style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
						>
							4. november 2025
						</p>
					</div>
					<a
						href="/"
						className="text-sm text-gray-600 hover:text-black transition-colors print:hidden"
						style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
					>
						← Tilbage
					</a>
				</div>

				{/* Main Headline - GT Standard L Expanded Light, 18pt */}
				<h1
					className="mb-8 text-[18pt] leading-[1.2] tracking-wide uppercase text-black"
					style={{ fontFamily: "'GT Standard Large', sans-serif", fontWeight: 300 }}
				>
					Dansk-skabt International Kvindefodboldliga får Millioninvestering fra Moonbug-stifter
				</h1>

				{/* Subheader - GT Standard L Narrow */}
				<h2
					className="mb-12 text-xl md:text-2xl leading-relaxed text-black"
					style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 500 }}
				>
					To danske kvindelige iværksættere lancerer professionel international kvindefodboldliga med innovativt format og kommerciel forretningsmodel
				</h2>

				{/* Body Text - GT Standard S Narrow Medium */}
				<div
					className="space-y-6 text-base md:text-lg leading-relaxed text-black"
					style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
				>
					<p>
						<strong>KØBENHAVN, 4. november 2025</strong> – Sensational League, en ny international 7v7 professionel kvindefodboldliga, lancerer i april 2026 med København som første værtsby. Ligaen er skabt af Bettina Kuperman og Majken Gilmartin fra Saga Sports Group. René Rechtman, stifter af Moonbug Entertainment (Blippi, CoComelon) er investor.
					</p>

					<p>
						Kvindesport oplever markant vækst globalt. Kvinder står for 75% af verdensøkonomiens forbrug og udgør over 700 millioner aktive sportsfans, men modtager under 5% af sportens sponsorkroner. Det er den markedsmulighed, Sensational League går efter.
					</p>

					<blockquote
						className="my-8 pl-6 border-l-[6px] border-[var(--color-volt)] italic text-lg md:text-xl"
						style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
					>
						"Vi bygger et kommercielt økosystem omkring kvindefodbold, hvor værdi skabes for spillere, fans og brands. Momentum i kvindefodbold er massivt, og markedspotentialet er kun lige begyndt at folde sig ud."
						<footer className="mt-2 not-italic font-bold">— Bettina Kuperman, CEO</footer>
					</blockquote>

					<h3
						className="text-xl md:text-2xl mt-12 mb-4 uppercase tracking-wide text-black"
						style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
					>
						Investering fra Moonbug-stifter
					</h3>

					<p>
						René Rechtman, en af Danmarks mest succesfulde iværksættere, investerer i ligaen.
					</p>

					<blockquote
						className="my-8 pl-6 border-l-[6px] border-[var(--color-volt)] italic text-lg md:text-xl"
						style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
					>
						"Sensational League har alt, investorer leder efter: Et erfarent team, en skalerbar forretningsmodel og perfekt timing. Grundlæggerne ved, hvordan man bygger sportsplatforme, der kan vokse internationalt. Kvindesport er uden tvivl det næste store vækstområde"
						<footer className="mt-2 not-italic font-bold">— René Rechtman</footer>
					</blockquote>

					<h3
						className="text-xl md:text-2xl mt-12 mb-4 uppercase tracking-wide text-black"
						style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
					>
						Formatet
					</h3>

					<p>
						Ligaen kombinerer professionel sport med underholdning og digitalt engagement:
					</p>

					<ul className="list-disc pl-6 space-y-2 my-6">
						<li>8 hold med betalte spillere og influencer kaptajner</li>
						<li>7v7-format optimeret til live-produktion og streaming</li>
						<li>6 festival kampdage og finale der kombinerer sport, musik og livsstil</li>
						<li>Point system baseret på sportsresultater, fan og community engagement</li>
						<li>Digital platform med sports og livsstils-content</li>
					</ul>

					<h3
						className="text-xl md:text-2xl mt-12 mb-4 uppercase tracking-wide text-black"
						style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
					>
						Kvindelige iværksættere med international erfaring
					</h3>

					<p>
						Bettina Kuperman og Majken Gilmartin har begge en lang karriere i den internationale sportsverden bag sig. Kuperman har lukket kommercielle aftaler for over $80M USD, har arbejdet med Olympiske budkampagner, Champions League og håndteret marketing og promovering ved adskillige EM og VM'er. Gilmartin er en verdensanerkendt pioner indenfor kvindefodbold og grundlagde den FN-anerkendte Global Goals World Cup og en fodbold specialdesignet til at mindske skader hos kvinder. Hun har blandt andet modtaget IOC's Women & Sport Trophy.
					</p>

					{/* Founder Photos - if available from SharePoint */}
					{!loadingPhotos && (bettinaPhoto || majkenPhoto) && (
						<div className="grid md:grid-cols-2 gap-6 my-12 print:page-break-inside-avoid print:break-inside-avoid">
							{bettinaPhoto && (
								<div className="border-4 border-black">
									<img
										src={bettinaPhoto.thumbnails?.large || bettinaPhoto.downloadUrl}
										alt="Bettina Kuperman"
										className="w-full aspect-[4/5] object-cover"
										crossOrigin="anonymous"
									/>
									<div className="p-4 bg-black text-white">
										<p
											className="text-sm font-bold uppercase"
											style={{ fontFamily: "'GT Standard Narrow', sans-serif", fontWeight: 700 }}
										>
											Bettina Kuperman
										</p>
										<p
											className="text-xs"
											style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
										>
											CEO, Saga Sports Group
										</p>
									</div>
								</div>
							)}
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
											style={{ fontFamily: "'GT Standard Narrow', sans-serif", fontWeight: 700 }}
										>
											Majken Gilmartin
										</p>
										<p
											className="text-xs"
											style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
										>
											COO, Saga Sports Group
										</p>
									</div>
								</div>
							)}
						</div>
					)}

					<blockquote
						className="my-8 pl-6 border-l-[6px] border-[var(--color-volt)] italic text-lg md:text-xl"
						style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
					>
						"Vi designer ikke en liga, der efterligner herrefodbold. Vi bygger en platform, der er skabt til, hvordan kvinder konkurrerer, netværker og forbruger. Det er her, muligheden for gennembrud er,"
						<footer className="mt-2 not-italic font-bold">— Majken Gilmartin, COO</footer>
					</blockquote>

					<h3
						className="text-xl md:text-2xl mt-12 mb-4 uppercase tracking-wide text-black"
						style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
					>
						Ekspansion til UK og USA
					</h3>

					<p>
						Efter lancering i Norden i april 2026 ekspanderer ligaen til Storbritannien og USA.
					</p>

					<p>
						Kommende annonceringer dækker kaptajner og spillere, advisory board, præmiepenge og partnerskaber.
					</p>

					<div className="mt-16 pt-8 border-t-2 border-black">
						<h3
							className="text-xl md:text-2xl mb-6 uppercase tracking-wide text-black"
							style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
						>
							Pressehenvendelser
						</h3>

						<div className="space-y-2">
							<p><strong>Mette Bom</strong></p>
							<p>Head of Communications, Saga Sports Group</p>
							<p>
								<a href="tel:+4540550800" className="hover:text-[var(--color-volt)] transition-colors">+45 40 55 08 00</a>
								{" | "}
								<a href="mailto:media@sagasportsgroup.com" className="hover:text-[var(--color-volt)] transition-colors">media@sagasportsgroup.com</a>
							</p>
							<p>
								<a href="https://sensationalleague.com" className="hover:text-[var(--color-volt)] transition-colors">sensationalleague.com</a>
							</p>
							<p>
								<strong>Pressemateriale:</strong>{" "}
								<a href="https://sagasportsgroup.com/press" className="hover:text-[var(--color-volt)] transition-colors">sagasportsgroup.com/press</a>
							</p>
						</div>
					</div>

					<div className="mt-12 pt-8 border-t-2 border-gray-200 space-y-8">
						<div>
							<h4
								className="text-lg md:text-xl mb-3 uppercase tracking-wide text-black"
								style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
							>
								Om Founders
							</h4>

							<div className="space-y-6">
								<div>
									<p className="font-bold mb-2">Bettina Kuperman - CEO, Saga Sports Group</p>
									<p className="text-sm leading-relaxed">
										Bettina Kuperman har over 20 års international erfaring fra Europa og Mellemøsten. Hun har arbejdet med nogle af verdens største sportsbegivenheder, fra OL-bud til Champions League og FIBA Basketball mesterskaber, og har rådgivet regeringer, forbund og topledere i, hvordan sport kan bruges strategisk til at skabe kommerciel og samfundsmæssig værdi. Hun har stået bag kommercielle aftaler for mere end 80 mio. USD og er kendt for at skabe synergi og netværk på tværs af sektorer. Cand.jur. fra Københavns Universitet og erfaren iværksætter. Tidligere bosat i Bruxelles, Lausanne, Istanbul.
									</p>
								</div>

								<div>
									<p className="font-bold mb-2">Majken Gilmartin - COO, Saga Sports Group</p>
									<p className="text-sm leading-relaxed">
										Majken Gilmartin er en internationalt anerkendt pioner inden for kvindesport og udviklingen af nye sportsformater for kvinder. Hun er grundlægger af Global Goals World Cup og står bag udviklingen af en fodbold designet til at reducere skaderisikoen for kvindelige spillere. Med en baggrund i filmproduktion – fra Hollywood til den nordiske filmbranche – har hun skabt internationale sportskoncepter og står ofte på globale scener som TED, Davos og FN's Generalforsamling. Majken har modtaget IOC Women & Sport Trophy og er blevet anerkendt af både UEFA og europæiske regeringer for sit lederskab inden for kvindesport. Tidligere bosat i Los Angeles og New York.
									</p>
								</div>
							</div>
						</div>

						<div>
							<h4
								className="text-lg md:text-xl mb-3 uppercase tracking-wide text-black"
								style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
							>
								Om Saga Sports Group
							</h4>
							<p className="text-sm leading-relaxed">
								Saga Sports Group er en international sports- og entertainmentvirksomhed med fokus på kvindesport. Saga ejer og driver Sensational League og udvikler kommercielle sportsplatforme, der forener konkurrence, medieproduktion og partnerskaber. Saga Sports Group er støttet af erfarne investorer og ledere med baggrund i sport, medier og teknologi.
							</p>
						</div>

						<div>
							<h4
								className="text-lg md:text-xl mb-3 uppercase tracking-wide text-black"
								style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
							>
								Om Sensational League
							</h4>
							<p className="text-sm leading-relaxed">
								Sensational League er en professionel 7v7-fodboldliga for kvinder. Ligaen lanceres i Norden i april 2026 og udvides derefter til Storbritannien og USA. Formatet kombinerer elitefodbold med underholdning og digitalt indhold i en skalerbar, kommerciel model.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Press Photos Section - Below the article */}
			{!loadingPhotos && photos.length > 0 && (
				<div className="mt-16 pt-12 border-t-4 border-black print:mt-8 print:pt-8 print:border-t-2">
					<h3
						className="text-xl md:text-2xl mb-8 uppercase tracking-wide text-black"
						style={{ fontFamily: "'GT Standard Large Narrow', sans-serif", fontWeight: 700 }}
					>
						Pressebilleder
					</h3>

					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 print:grid-cols-3 print:gap-3">
						{photos.map((photo) => (
							<a
								key={photo.id}
								href={photo.downloadUrl}
								download
								className="group relative aspect-square border-2 border-black overflow-hidden hover:border-[var(--color-volt)] transition-all duration-200 print:border print:hover:border-black"
							>
								<img
									src={photo.thumbnails?.medium || photo.thumbnails?.large || photo.downloadUrl}
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
						style={{ fontFamily: "'GT Standard Small Narrow', sans-serif", fontWeight: 500 }}
					>
						Klik på billedet for at downloade i fuld størrelse
					</p>
				</div>
			)}
		</div>
	);
}
