import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import * as THREE from "three";

// Static SVG Logo Component - Lunar Tear inspired
function LunarTearLogo({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* Outer petals - bell-shaped arrangement */}
      <g opacity="0.9">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <ellipse
            key={`outer-${i}`}
            cx="50"
            cy="50"
            rx="8"
            ry="22"
            fill="#e4e4e7"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>

      {/* Middle layer petals */}
      <g opacity="0.95">
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
          (angle, i) => (
            <ellipse
              key={`middle-${i}`}
              cx="50"
              cy="50"
              rx="7"
              ry="18"
              fill="#f4f4f5"
              transform={`rotate(${angle} 50 50)`}
            />
          ),
        )}
      </g>

      {/* Inner petals - more upright */}
      <g>
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="50"
            cy="50"
            rx="5"
            ry="14"
            fill="#fafafa"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
      </g>

      {/* Central stigma with detail */}
      <circle cx="50" cy="50" r="6" fill="#18181b" />
      <circle cx="50" cy="50" r="4" fill="#27272a" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={`stigma-${i}`}
          x1="50"
          y1="50"
          x2={50 + Math.cos((angle * Math.PI) / 180) * 3}
          y2={50 + Math.sin((angle * Math.PI) / 180) * 3}
          stroke="#52525b"
          strokeWidth="0.5"
        />
      ))}
      <circle cx="50" cy="50" r="1.5" fill="#fafafa" />
    </svg>
  );
}

// Three.js Lunar Tear Component - 3D animated version
function ThreeFlower({ size = 100 }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const group = new THREE.Group();

    // Create bell-shaped petals using LatheGeometry
    const createPetal = (size, color, rotationOffset = 0) => {
      const points = [];
      const segments = 8;

      // Create bell curve profile
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const y = t * size * 2;
        // Bell curve shape - wider at top, narrower at bottom
        const x = Math.sin(t * Math.PI) * size * (0.4 + t * 0.6);
        points.push(new THREE.Vector2(x, y - size));
      }

      const geometry = new THREE.LatheGeometry(points, 12);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
      });

      const petal = new THREE.Mesh(geometry, material);
      petal.rotation.x = Math.PI / 3 + rotationOffset; // Tilt petals outward
      return petal;
    };

    // Outer ring - 8 petals
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const petal = createPetal(0.4, 0xe4e4e7, 0);
      petal.position.x = Math.cos(angle) * 0.8;
      petal.position.z = Math.sin(angle) * 0.8;
      petal.rotation.y = angle;
      group.add(petal);
    }

    // Middle ring - 8 petals (offset)
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.PI / 8;
      const petal = createPetal(0.35, 0xf4f4f5, -0.1);
      petal.position.x = Math.cos(angle) * 0.5;
      petal.position.z = Math.sin(angle) * 0.5;
      petal.rotation.y = angle;
      group.add(petal);
    }

    // Inner ring - 6 petals
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const petal = createPetal(0.3, 0xfafafa, -0.2);
      petal.position.x = Math.cos(angle) * 0.25;
      petal.position.z = Math.sin(angle) * 0.25;
      petal.rotation.y = angle;
      group.add(petal);
    }

    // Central stigma
    const stigmaGeom = new THREE.SphereGeometry(0.15, 16, 16);
    const stigmaMat = new THREE.MeshBasicMaterial({ color: 0x27272a });
    const stigma = new THREE.Mesh(stigmaGeom, stigmaMat);
    stigma.position.y = 0;
    group.add(stigma);

    // Stigma detail ring
    const ringGeom = new THREE.TorusGeometry(0.12, 0.02, 8, 16);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x52525b });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2;
    group.add(ring);

    // Small center highlight
    const highlightGeom = new THREE.SphereGeometry(0.04, 8, 8);
    const highlightMat = new THREE.MeshBasicMaterial({ color: 0xfafafa });
    const highlight = new THREE.Mesh(highlightGeom, highlightMat);
    highlight.position.y = 0.12;
    group.add(highlight);

    // Add geometric frame elements inspired by the logo
    const frameGroup = new THREE.Group();

    // Vertical bars
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const barGeom = new THREE.BoxGeometry(0.08, 3, 0.08);
      const barMat = new THREE.MeshBasicMaterial({
        color: 0x27272a,
        transparent: true,
        opacity: 0.6,
      });
      const bar = new THREE.Mesh(barGeom, barMat);
      bar.position.x = Math.cos(angle) * 2;
      bar.position.z = Math.sin(angle) * 2;
      frameGroup.add(bar);
    }

    scene.add(frameGroup);
    scene.add(group);

    let time = 0;
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      time += 0.005;

      // Slow rotation
      group.rotation.y = time * 0.5;

      // Subtle breathing motion
      group.scale.set(
        1 + Math.sin(time * 2) * 0.02,
        1 + Math.sin(time * 2) * 0.02,
        1 + Math.sin(time * 2) * 0.02,
      );

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [size]);

  return <div ref={mountRef} className="inline-block" />;
}

export default function BlackTarLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono">
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
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
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

            <div className="relative flex items-center justify-center">
              <div className="aspect-square w-full max-w-md bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center relative overflow-hidden">
                <ThreeFlower size={400} />
                <div
                  className="absolute inset-0 border border-zinc-700 pointer-events-none"
                  style={{ margin: "15%" }}
                ></div>
                <div
                  className="absolute inset-0 border border-zinc-800 pointer-events-none"
                  style={{ margin: "8%" }}
                ></div>
              </div>
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
