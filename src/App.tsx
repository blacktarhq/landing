import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import LunarTearLogo from "./components/logo/LunarTearLogo";
import LogoPlaceholder from "./components/LogoPlaceholder";
import TriangleReveal from "./components/TriangleReveal";

export default function BlackTarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showReveal, setShowReveal] = useState(true);
  const [contentVisible, setContentVisible] = useState(true); // Content needs to be visible from start

  // Remove the sessionStorage check - always show animation
  // useEffect(() => {
  //   const hasVisited = sessionStorage.getItem("hasVisited");
  //   if (hasVisited) {
  //     setShowReveal(false);
  //     setContentVisible(true);
  //   } else {
  //     sessionStorage.setItem("hasVisited", "true");
  //   }
  // }, []);

  const handleRevealComplete = () => {
    setShowReveal(false);
    setContentVisible(true);
  };

  return (
    <div className="min-h-screen">
      {/* Triangle Reveal Animation */}
      {showReveal && <TriangleReveal onComplete={handleRevealComplete} />}

      {/* Navigation with Static Logo */}
      <nav className="fixed w-full bg-[#d1cdb7]/95 backdrop-blur-sm z-50 border-b border-[#bab5a1]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-[#dcd8c0] border-2 border-[#bab5a1] flex items-center justify-center p-1">
              <LunarTearLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-normal tracking-[0.5rem] uppercase">BLACKTAR</span>
              <span className="text-xs text-[#454138]/70 tracking-[0.03rem] font-light">
                ENGINEERING WORKS
              </span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-light tracking-[0.03rem]">
            <a
              href="#services"
              className="hover:text-[#454138]/70 transition-colors"
            >
              SERVICES
            </a>
            <a href="#about" className="hover:text-[#454138]/70 transition-colors">
              ABOUT
            </a>
            <a
              href="#contact"
              className="hover:text-[#454138]/70 transition-colors"
            >
              CONTACT
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#dcd8c0] border-t border-[#bab5a1]">
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-light tracking-[0.03rem]">
              <a href="#services" onClick={() => setMenuOpen(false)}>
                SERVICES
              </a>
              <a href="#about" onClick={() => setMenuOpen(false)}>
                ABOUT
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                CONTACT
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with 3D Logo */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 min-h-screen">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center h-full">
            <div className="z-10">
              <div className="inline-block px-3 py-1 bg-[#dcd8c0] border border-[#bab5a1] text-xs tracking-[0.5rem] uppercase mb-4 md:mb-6 font-light">
                PRECISION • INNOVATION • RELIABILITY
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal leading-tight mb-4 md:mb-6 uppercase tracking-[0.5rem]" style={{ textShadow: '0.3rem 0.3rem 0 #bab5a1' }}>
                ENGINEERING
                <br />
                THE FUTURE
              </h1>
              <p className="text-[#454138]/80 text-base md:text-lg mb-6 md:mb-8 leading-relaxed font-light tracking-[0.03rem]">
                BlackTar Engineering Works delivers cutting-edge engineering
                solutions with precision and technical excellence. From concept
                to completion, we build tomorrow's infrastructure today.
              </p>
              <button className="button w-full sm:w-auto px-8 py-4 flex items-center justify-center gap-2 group overflow-hidden">
                <span className="relative z-10">GET STARTED</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform relative z-10"
                  size={20}
                />
              </button>
            </div>

            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] lg:h-[800px]">
              <LogoPlaceholder className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-20 px-4 md:px-6 bg-[#dcd8c0]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-8 md:mb-12 text-center border-t border-b border-[#454138] py-2 tracking-[0.1rem]">
            OUR SERVICES
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "STRUCTURAL ENGINEERING",
                desc: "Advanced structural analysis and design for complex building systems and infrastructure projects.",
              },
              {
                title: "MECHANICAL SYSTEMS",
                desc: "Comprehensive mechanical engineering solutions including HVAC, plumbing, and industrial systems.",
              },
              {
                title: "PROJECT MANAGEMENT",
                desc: "End-to-end project oversight ensuring on-time delivery and quality standards compliance.",
              },
              {
                title: "CIVIL INFRASTRUCTURE",
                desc: "Site development, transportation systems, and civil engineering for large-scale projects.",
              },
              {
                title: "INDUSTRIAL DESIGN",
                desc: "Innovative industrial engineering and manufacturing process optimization solutions.",
              },
              {
                title: "CONSULTING SERVICES",
                desc: "Expert technical consulting and feasibility studies for engineering challenges.",
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-[#dcd8c0] border border-[#bab5a1] p-6 hover:border-[#454138] transition-colors group"
              >
                <div className="text-xs text-[#bab5a1] mb-3 font-light">
                  [{String(i + 1).padStart(2, "0")}]
                </div>
                <h3 className="text-xl font-light mb-3 group-hover:text-[#454138] transition-colors tracking-[0.1rem]">
                  {service.title}
                </h3>
                <p className="text-[#454138]/70 text-sm leading-relaxed font-light tracking-[0.03rem]">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4 md:mb-6">BUILT ON EXCELLENCE</h2>
              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                  BlackTar Engineering Works stands at the intersection of
                  technical precision and innovative design. Our approach
                  combines rigorous engineering principles with creative
                  problem-solving to deliver exceptional results.
                </p>
                <p>
                  Like the legendary Lunar Tear—a flower that symbolizes hope
                  and resilience—we believe in solutions that are both strong
                  and elegant, adaptable yet enduring. Every project is an
                  opportunity to push boundaries while maintaining the highest
                  standards of quality.
                </p>
                <p>
                  Our team brings decades of combined experience across multiple
                  engineering disciplines, unified by a commitment to excellence
                  and client satisfaction.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { num: "15+", label: "YEARS EXPERIENCE" },
                { num: "200+", label: "PROJECTS COMPLETED" },
                { num: "98%", label: "CLIENT SATISFACTION" },
                { num: "24/7", label: "SUPPORT AVAILABLE" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#dcd8c0] border border-[#bab5a1] p-4 md:p-6 text-center"
                >
                  <div className="text-2xl md:text-3xl font-normal mb-1 md:mb-2">{stat.num}</div>
                  <div className="text-xs text-[#454138]/70 font-light tracking-[0.03rem]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 px-4 md:px-6 bg-[#dcd8c0]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-4 md:mb-6 tracking-[0.1rem]">LET'S BUILD SOMETHING</h2>
          <p className="text-[#454138]/80 mb-8 md:mb-12 text-base md:text-lg font-light tracking-[0.03rem]">
            Ready to start your next engineering project? Get in touch with our
            team.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#dcd8c0] border border-[#bab5a1] flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div className="text-sm font-light tracking-[0.03rem]">
                <div className="text-[#454138]/70 mb-1">EMAIL</div>
                <div>info@blacktar.works</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#dcd8c0] border border-[#bab5a1] flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div className="text-sm font-light tracking-[0.03rem]">
                <div className="text-[#454138]/70 mb-1">PHONE</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-[#dcd8c0] border border-[#bab5a1] flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div className="text-sm font-light tracking-[0.03rem]">
                <div className="text-[#454138]/70 mb-1">LOCATION</div>
                <div>New York, NY</div>
              </div>
            </div>
          </div>

          <button className="button w-full sm:w-auto px-12 py-4 text-base md:text-lg">
            CONTACT US
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#bab5a1] py-6 md:py-8 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-[#454138]/70 font-light tracking-[0.03rem]">
          <div className="text-center md:text-left">
            © 2025 BLACKTAR ENGINEERING WORKS LLC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-4 md:gap-6">
            <a href="#" className="hover:text-[#454138] transition-colors">
              PRIVACY
            </a>
            <a href="#" className="hover:text-[#454138] transition-colors">
              TERMS
            </a>
            <a href="#" className="hover:text-[#454138] transition-colors">
              CAREERS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
