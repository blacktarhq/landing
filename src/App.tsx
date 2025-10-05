import { useState } from "react";
import { ArrowRight } from "lucide-react";
import TriangleReveal from "./components/TriangleReveal";

export default function BlackTarLanding() {
  const [showReveal, setShowReveal] = useState(true);

  const handleRevealComplete = () => {
    setShowReveal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Triangle Reveal Animation */}
      {showReveal && <TriangleReveal onComplete={handleRevealComplete} />}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl w-full flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal leading-tight mb-6 uppercase tracking-[0.3rem]">
            Building Software
            <br />
            for Humans
          </h1>
          <p className="text-[#454138]/80 text-base sm:text-lg md:text-xl mb-8 leading-relaxed font-light tracking-[0.03rem] max-w-2xl">
            We craft digital experiences that feel natural, not technical.
          </p>
          <a
            href="https://cal.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button inline-flex items-center gap-2 px-8 py-4 group"
          >
            <span className="relative z-10">Let's talk</span>
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform relative z-10"
              size={20}
            />
          </a>
        </div>
      </section>

      {/* Work Section */}
      <section className="py-16 px-4 bg-[#dcd8c0]/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light mb-8 sm:mb-12 text-center tracking-[0.1rem]">
            What We've Built
          </h2>
          <div className="space-y-6 sm:space-y-8">
            {[
              {
                name: "PROJECT NAME",
                desc: "One-line description of what it does",
                tech: "React, Node.js, PostgreSQL",
              },
              {
                name: "PROJECT NAME",
                desc: "One-line description of what it does",
                tech: "Next.js, TypeScript, Tailwind",
              },
              {
                name: "PROJECT NAME",
                desc: "One-line description of what it does",
                tech: "Vue, Express, MongoDB",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="bg-[#d1cdb7] border border-[#bab5a1] p-6 sm:p-8 hover:border-[#454138] transition-colors"
              >
                <h3 className="text-lg sm:text-xl font-light mb-2 tracking-[0.1rem]">
                  {project.name}
                </h3>
                <p className="text-[#454138]/80 text-sm sm:text-base mb-3 font-light tracking-[0.03rem]">
                  {project.desc}
                </p>
                <p className="text-[#454138]/60 text-xs sm:text-sm font-light tracking-[0.03rem]">
                  {project.tech}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#454138]/90 text-base sm:text-lg md:text-xl leading-relaxed font-light tracking-[0.03rem]">
            Software should work for people, not the other way around. We build
            tools that disappear into the background and let you focus on what
            matters.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#bab5a1] py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-[#454138]/70 font-light tracking-[0.03rem]">
            © 2025 BLACKTAR. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
