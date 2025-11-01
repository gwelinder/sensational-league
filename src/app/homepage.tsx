"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { createDataAttribute } from "@sanity/visual-editing";

interface HomePageProps {
  content?: {
    _id?: string;
    _type?: string;
    hero?: {
      headline?: string;
      subline?: string;
      ctaText?: string;
    };
    about?: {
      title?: string;
      description?: string;
    };
  };
}

function SignupForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={cn(
            "flex-1 px-6 py-4 border-2 border-black rounded-none",
            "text-black placeholder-gray-500 brand-body",
            "focus:outline-none focus:border-[var(--color-volt)]",
            "transition-colors duration-200"
          )}
        />

        <button
          type="submit"
          disabled={isSubmitted}
          className={cn(
            "px-10 py-4 font-black uppercase tracking-wider",
            "brand-caption transition-all duration-200",
            "focus:outline-none disabled:opacity-70",
            isSubmitted
              ? "bg-black text-white"
              : "bg-[var(--color-volt)] text-black hover:bg-black hover:text-[var(--color-volt)]"
          )}
        >
          {isSubmitted ? "✓ JOINED" : "JOIN →"}
        </button>
      </div>
    </form>
  );
}

export default function HomePage({ content }: HomePageProps) {
  const heroDataAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'hero',
  }) : undefined;

  const aboutDataAttribute = content?._id ? createDataAttribute({
    id: content._id,
    type: content._type || 'homePage',
    path: 'about',
  }) : undefined;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 pt-8 pb-20 bg-white"
        data-sanity={heroDataAttribute?.toString()}
      >
        <div className="w-full max-w-6xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <img
              src="/logos/SL-SPARK-LARGE.svg"
              alt="Sensational League"
              className="w-48 h-48 md:w-56 md:h-56 mx-auto"
            />
          </div>

          {/* Headline */}
          <h1 className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-8 text-center">
            <span className="text-black">FAST.</span><br />
            <span className="text-black">REBELLIOUS.</span><br />
            <span className="text-[var(--color-volt)]">FEMALE.</span>
          </h1>

          {/* Subline */}
          <p className="brand-body text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto text-center">
            {content?.hero?.subline ||
             "Women's 7v7 football league that combines athletic excellence with social impact."}
          </p>

          {/* Form */}
          <div className="mb-12">
            <SignupForm />
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-16 text-sm uppercase tracking-wider brand-caption">
            <div>
              <span className="text-2xl font-black text-black">300+</span>
              <span className="ml-2 text-gray-600">Athletes</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div>
              <span className="text-2xl font-black text-black">24</span>
              <span className="ml-2 text-gray-600">Teams</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div>
              <span className="text-2xl font-black text-black">12</span>
              <span className="ml-2 text-gray-600">SDG Goals</span>
            </div>
          </div>

          {/* Image Grid - Bold, Dynamic with Rightward Movement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group">
              <img
                src="/logos/image_046_page_39.jpeg"
                alt="Sensational League Athletes"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border-4 border-black md:mt-8 hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group">
              <img
                src="/logos/image_063_page_42.jpeg"
                alt="Sensational League Action"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border-4 border-black hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group">
              <img
                src="/logos/image_067_page_43.jpeg"
                alt="Sensational League Team"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden border-4 border-black md:mt-8 hover:-translate-y-2 hover:translate-x-1 transition-all duration-500 group">
              <img
                src="/logos/image_073_page_44.jpeg"
                alt="Sensational League Players"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-volt)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Divider - Rightward Movement */}
      <div className="relative h-24 bg-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full mx-auto">
            <div className="h-2 bg-black transform skew-x-[-3deg] origin-left"></div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section
        className="py-32 md:py-40 bg-white"
        data-sanity={aboutDataAttribute?.toString()}
      >
        <div className="max-w-7xl mx-auto px-4">
          {/* Headline - Bold and Clean */}
          <div className="mb-28">
            <h2 className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black text-center leading-tight uppercase">
              {content?.about?.title || (
                <>
                  <span className="block text-black">PLAY FOOTBALL.</span>
                  <span className="block text-[var(--color-volt)]">DRIVE IMPACT.</span>
                  <span className="block text-black">CHANGE THE WORLD.</span>
                </>
              )}
            </h2>
          </div>

          {/* Three Pillars - Clean Cards with Rightward Movement */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 max-w-6xl mx-auto">
            <div className="bg-white border-4 border-black p-8 hover:bg-[var(--color-volt)] hover:translate-x-2 transition-all duration-300 group">
              <div className="w-20 h-3 bg-black mb-6 transform skew-x-[-12deg] group-hover:w-24 transition-all duration-300"></div>
              <h3 className="brand-subhead text-xl md:text-2xl font-black mb-4 uppercase tracking-wider text-black">
                Elite Competition
              </h3>
              <p className="brand-body text-base text-black leading-relaxed">
                7v7 format with professional standards and innovative scoring systems.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-8 hover:bg-[var(--color-volt)] hover:translate-x-2 transition-all duration-300 group">
              <div className="w-20 h-3 bg-black mb-6 transform skew-x-[-12deg] group-hover:w-24 transition-all duration-300"></div>
              <h3 className="brand-subhead text-xl md:text-2xl font-black mb-4 uppercase tracking-wider text-black">
                Social Impact
              </h3>
              <p className="brand-body text-base text-black leading-relaxed">
                Teams earn points for community engagement and UN SDG contributions.
              </p>
            </div>

            <div className="bg-white border-4 border-black p-8 hover:bg-[var(--color-volt)] hover:translate-x-2 transition-all duration-300 group">
              <div className="w-20 h-3 bg-black mb-6 transform skew-x-[-12deg] group-hover:w-24 transition-all duration-300"></div>
              <h3 className="brand-subhead text-xl md:text-2xl font-black mb-4 uppercase tracking-wider text-black">
                Digital Innovation
              </h3>
              <p className="brand-body text-base text-black leading-relaxed">
                Multi-metric tracking including social media growth and viral moments.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="max-w-4xl mx-auto text-center">
            <p className="brand-body text-2xl md:text-3xl text-black leading-relaxed font-bold">
              {content?.about?.description ||
               "We're building a community where female athletes can showcase their skills while making a difference. Our mission is simple: Fast. Rebellious. Female."}
            </p>
          </div>
        </div>
      </section>

      {/* Impact Section - With Bold Dynamic Images */}
      <section className="relative py-32 md:py-48 bg-black text-white overflow-hidden">
        {/* Background Images Grid - High Contrast */}
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="relative">
            <img
              src="/logos/image_046_page_39.jpeg"
              alt=""
              className="w-full h-full object-cover opacity-40 contrast-125 saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          </div>
          <div className="relative">
            <img
              src="/logos/image_063_page_42.jpeg"
              alt=""
              className="w-full h-full object-cover opacity-40 contrast-125 saturate-150"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-transparent"></div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {/* Dynamic Headline */}
          <h2 className="brand-headline text-5xl md:text-7xl lg:text-9xl font-black mb-24 text-center leading-[0.9] uppercase">
            <span className="text-white">LEAGUE</span><br/>
            <span className="text-[var(--color-volt)] text-6xl md:text-8xl lg:text-[10rem]">IMPACT</span>
          </h2>

          {/* Stats - Clean Grid with Rightward Movement */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-32 max-w-6xl mx-auto">
            <div className="bg-black border-4 border-[var(--color-volt)] p-8 md:p-10 text-center hover:bg-[var(--color-volt)] hover:text-black hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 group aspect-square flex flex-col items-center justify-center transform skew-x-[-2deg]">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-volt)] mb-3 group-hover:text-black transform skew-x-[2deg]">24</div>
              <div className="brand-caption text-xs uppercase tracking-widest text-white group-hover:text-black transform skew-x-[2deg]">Teams</div>
            </div>

            <div className="bg-black border-4 border-[var(--color-volt)] p-8 md:p-10 text-center hover:bg-[var(--color-volt)] hover:text-black hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 group aspect-square flex flex-col items-center justify-center transform skew-x-[-2deg]">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-volt)] mb-3 group-hover:text-black transform skew-x-[2deg]">300+</div>
              <div className="brand-caption text-xs uppercase tracking-widest text-white group-hover:text-black transform skew-x-[2deg]">Athletes</div>
            </div>

            <div className="bg-black border-4 border-[var(--color-volt)] p-8 md:p-10 text-center hover:bg-[var(--color-volt)] hover:text-black hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 group aspect-square flex flex-col items-center justify-center transform skew-x-[-2deg]">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-volt)] mb-3 group-hover:text-black transform skew-x-[2deg]">50K</div>
              <div className="brand-caption text-xs uppercase tracking-widest text-white group-hover:text-black transform skew-x-[2deg]">Community</div>
            </div>

            <div className="bg-black border-4 border-[var(--color-volt)] p-8 md:p-10 text-center hover:bg-[var(--color-volt)] hover:text-black hover:translate-x-2 hover:-translate-y-2 transition-all duration-300 group aspect-square flex flex-col items-center justify-center transform skew-x-[-2deg]">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--color-volt)] mb-3 group-hover:text-black transform skew-x-[2deg]">12</div>
              <div className="brand-caption text-xs uppercase tracking-widest text-white group-hover:text-black transform skew-x-[2deg]">SDG Goals</div>
            </div>
          </div>

          {/* Quote Box with Rightward Accent */}
          <div className="max-w-4xl mx-auto bg-[var(--color-volt)] border-4 border-black p-12 text-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-black transform skew-x-[-12deg] origin-top"></div>
            <div className="relative z-10">
              <p className="brand-headline text-2xl md:text-4xl font-black mb-4 uppercase leading-tight">
                "This isn't just football -<br/>it's a movement."
              </p>
              <p className="brand-caption text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="w-8 h-0.5 bg-black transform skew-x-[-12deg]"></span>
                League Founder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 md:py-48 bg-[var(--color-volt)] text-black border-t-4 border-black">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <img
            src="/logos/SL-SPARK-LARGE.svg"
            alt="Sensational League"
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mx-auto mb-20"
          />

          <h2 className="brand-headline text-5xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight uppercase">
            JOIN THE REVOLUTION
          </h2>

          <p className="brand-body text-2xl md:text-3xl mb-16 max-w-3xl mx-auto font-bold">
            Be notified when registration opens for the next season.
          </p>

          <div className="max-w-3xl mx-auto">
            <form onSubmit={(e) => { e.preventDefault(); }} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className={cn(
                  "flex-1 px-8 py-5 border-4 border-black rounded-none",
                  "text-black placeholder-gray-700 brand-body text-lg",
                  "focus:outline-none focus:ring-4 focus:ring-black",
                  "bg-white"
                )}
              />

              <button
                type="submit"
                className={cn(
                  "px-12 py-5 font-black uppercase tracking-wider text-lg relative overflow-hidden",
                  "brand-caption transition-all duration-300 border-4 border-black group",
                  "bg-black text-[var(--color-volt)] hover:bg-white hover:text-black hover:translate-x-1"
                )}
              >
                <span className="relative z-10">JOIN →</span>
                <div className="absolute inset-0 bg-white transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}