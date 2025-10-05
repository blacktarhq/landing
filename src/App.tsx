import { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import LunarTearLogo from "./components/logo/LunarTearLogo";
import ThreeLunarTear from "./components/logo/ThreeLunarTear";
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
      {/* Triangle Reveal Animation */}
      {showReveal && <TriangleReveal onComplete={handleRevealComplete} />}

      {/* Navigation with Static Logo */}
      <nav className="fixed w-full bg-zinc-950/95 backdrop-blur-sm z-50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center p-1">
              <LunarTearLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-wider">BLACKTAR</span>
              <span className="text-xs text-zinc-500 tracking-wide">
                ENGINEERING WORKS
              </span>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-sm">
            <a
              href="#services"
              className="hover:text-zinc-400 transition-colors"
            >
              SERVICES
            </a>
            <a href="#about" className="hover:text-zinc-400 transition-colors">
              ABOUT
            </a>
            <a
              href="#contact"
              className="hover:text-zinc-400 transition-colors"
            >
              CONTACT
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800">
            <div className="px-6 py-4 flex flex-col gap-4 text-sm">
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
      <section className="relative pt-32 pb-20 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto h-full">
          <div className="grid md:grid-cols-2 gap-12 items-center h-full">
            <div className="z-10">
              <div className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-800 text-xs tracking-wider mb-6">
                PRECISION • INNOVATION • RELIABILITY
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                ENGINEERING
                <br />
                THE FUTURE
              </h1>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                BlackTar Engineering Works delivers cutting-edge engineering
                solutions with precision and technical excellence. From concept
                to completion, we build tomorrow's infrastructure today.
              </p>
              <button className="px-8 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-zinc-300 transition-colors flex items-center gap-2 group">
                GET STARTED
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </button>
            </div>

            <div className="relative w-full h-[600px] md:h-[800px] -mr-12 md:-mr-24">
              <ThreeLunarTear className="w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            <span className="border-b-4 border-zinc-700 pb-2">
              OUR SERVICES
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                className="bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-700 transition-colors group"
              >
                <div className="text-xs text-zinc-600 mb-3">
                  [{String(i + 1).padStart(2, "0")}]
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-zinc-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">BUILT ON EXCELLENCE</h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
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

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "15+", label: "YEARS EXPERIENCE" },
                { num: "200+", label: "PROJECTS COMPLETED" },
                { num: "98%", label: "CLIENT SATISFACTION" },
                { num: "24/7", label: "SUPPORT AVAILABLE" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-zinc-900 border border-zinc-800 p-6 text-center"
                >
                  <div className="text-3xl font-bold mb-2">{stat.num}</div>
                  <div className="text-xs text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-zinc-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">LET'S BUILD SOMETHING</h2>
          <p className="text-zinc-400 mb-12 text-lg">
            Ready to start your next engineering project? Get in touch with our
            team.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div className="text-sm">
                <div className="text-zinc-500 mb-1">EMAIL</div>
                <div>info@blacktar.works</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div className="text-sm">
                <div className="text-zinc-500 mb-1">PHONE</div>
                <div>+1 (555) 123-4567</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div className="text-sm">
                <div className="text-zinc-500 mb-1">LOCATION</div>
                <div>New York, NY</div>
              </div>
            </div>
          </div>

          <button className="px-12 py-4 bg-zinc-100 text-zinc-950 font-bold hover:bg-zinc-300 transition-colors text-lg">
            CONTACT US
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
          <div>
            © 2025 BLACKTAR ENGINEERING WORKS LLC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">
              PRIVACY
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              TERMS
            </a>
            <a href="#" className="hover:text-zinc-400 transition-colors">
              CAREERS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
