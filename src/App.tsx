import { useState } from "react";
import { Star, Github, Linkedin } from "lucide-react";
import TriangleReveal from "./components/TriangleReveal";
import logo from "./logo.svg";

export default function BlackTarLanding() {
  const [showReveal, setShowReveal] = useState(true);
  const currentYear = new Date().getFullYear();

  const handleRevealComplete = () => {
    setShowReveal(false);
  };

  return (
    <div className="min-h-screen">
      {/* Triangle Reveal Animation */}
      {showReveal && <TriangleReveal onComplete={handleRevealComplete} />}

      {/* Header */}
      <header className="border-b-2 border-black pt-4 md:pt-8 px-4 md:px-8 pb-4 md:pb-6 flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img src={logo} alt="BlackTar" className="h-12 md:h-16 w-auto" />
          <div className="text-sm md:text-base font-bold leading-tight">
            BLACKTAR<br />
            ENGINEERING<br />
            WORKS
          </div>
        </div>
        <nav className="text-sm md:text-base font-bold text-right flex gap-8">
          <div className="border-l-2 border-black pl-4">WORK</div>
          <div className="border-l-2 border-black pl-4">ABOUT</div>
          <div className="border-l-2 border-black pl-4">CONTACT</div>
        </nav>
      </header>

      {/* Giant Hero Typography */}
      <section className="min-h-screen flex items-end justify-start p-4 md:p-8 pb-20 md:pb-32 relative">
        {/* Vertical text on left */}
        <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <div className="text-sm font-bold tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            EST. {currentYear}
          </div>
        </div>

        <div className="w-full md:pl-8">
          <div className="mb-8 max-w-4xl border-l-4 border-black pl-6">
            <p className="text-base md:text-lg leading-relaxed mb-4">
              WE BUILD SOFTWARE THAT MOVES FAST, SCALES HARD, AND DELIVERS RESULTS. FROM EARLY-STAGE DISRUPTORS TO ESTABLISHED CATEGORY LEADERS, WE ENGINEER SYSTEMS THAT PERFORM UNDER PRESSURE.
            </p>
            <p className="text-sm md:text-base leading-relaxed opacity-90">
              No fluff. No compromises. Just battle-tested code, scalable architecture, and systems built to handle whatever you throw at them.
            </p>
          </div>
          <h1 className="text-[20vw] md:text-[28vw] font-bold leading-none border-t-4 border-b-4 border-black py-4">
            BTEW
          </h1>
        </div>
      </section>

      {/* Black Section with Project List */}
      <section className="bg-black text-[#d21e1e] border-t-4 border-black relative">
        {/* Vertical text on right */}
        <div className="hidden md:block absolute right-4 top-1/4 z-10">
          <div className="text-sm font-bold tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            SELECTED PROJECTS
          </div>
        </div>

        {/* Projects List */}
        <div className="p-8 md:p-16 max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">
              SELECTED WORK
            </h2>

            <div className="space-y-8">
              {[
                {
                  name: "BUILT TO SCALE",
                  subtitle: "REALTIME COMMERCE PLATFORM",
                  client: "RETAIL TECH STARTUP",
                  desc: "Processing 100K+ daily transactions without breaking a sweat. Real-time inventory synchronization across multiple warehouses. Built to handle Black Friday traffic on a Tuesday.",
                  tech: "REACT / NODE.JS / POSTGRESQL / REDIS",
                  year: "2024",
                  number: "01",
                },
                {
                  name: "DATA THAT DRIVES DECISIONS",
                  subtitle: "ENTERPRISE ANALYTICS DASHBOARD",
                  client: "FINTECH COMPANY",
                  desc: "Turned complex financial data into actionable insights. Real-time visualizations that executives actually understand. Custom-built components that make data beautiful and useful.",
                  tech: "NEXT.JS / TYPESCRIPT / D3.JS / GRAPHQL",
                  year: "2024",
                  number: "02",
                },
                {
                  name: "CONTENT AT VELOCITY",
                  subtitle: "HEADLESS CMS ARCHITECTURE",
                  client: "MEDIA PUBLISHER",
                  desc: "One CMS, infinite destinations. AI-powered content tagging that actually works. Workflow automation that gives time back to creators. Serving millions of readers daily.",
                  tech: "VUE / EXPRESS / MONGODB / ELASTICSEARCH",
                  year: "2023",
                  number: "03",
                },
                {
                  name: "HEALTHCARE REIMAGINED",
                  subtitle: "CROSS-PLATFORM MOBILE APP",
                  client: "HEALTHCARE PROVIDER",
                  desc: "HIPAA-compliant from day one. Secure messaging, telehealth, and scheduling in one place. Making healthcare accessible without compromising on security.",
                  tech: "REACT NATIVE / FIREBASE / AWS",
                  year: "2023",
                  number: "04",
                },
                {
                  name: "BUILT FOR MILLIONS",
                  subtitle: "MICROSERVICES API INFRASTRUCTURE",
                  client: "SAAS PLATFORM",
                  desc: "1M+ requests daily. Zero downtime deployments. Auto-scaling that actually scales. Comprehensive monitoring that catches problems before your users do.",
                  tech: "GO / KUBERNETES / KAFKA / PROMETHEUS",
                  year: "2023",
                  number: "05",
                },
              ].map((project, i) => (
                <div key={i} className="border-b-2 border-[#d21e1e] pb-6 border-l-4 border-[#d21e1e] pl-4">
                  <div className="flex items-start gap-4 mb-2">
                    <div className="text-3xl font-bold opacity-50">
                      {project.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-xl md:text-2xl font-bold mb-1">
                            {project.name}
                          </div>
                          <div className="text-sm opacity-80">
                            {project.subtitle}
                          </div>
                        </div>
                        <div className="text-sm opacity-70 ml-4">
                          {project.year}
                        </div>
                      </div>
                      <div className="text-sm mb-2 opacity-80 border-b border-[#d21e1e] inline-block pb-1">
                        {project.client}
                      </div>
                      <p className="text-sm leading-relaxed mb-2 opacity-90">
                        {project.desc}
                      </p>
                      <div className="text-xs opacity-70 font-bold">
                        {project.tech}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t-2 border-[#d21e1e]">
              <p className="text-sm leading-relaxed opacity-90 border-l-4 border-[#d21e1e] pl-4">
                FROM ZERO TO ONE OR ONE TO MILLION. WE BUILD SYSTEMS THAT SCALE, CODE THAT LASTS, AND INFRASTRUCTURE THAT DOESN'T BREAK AT 3AM. LET'S SHIP SOMETHING THAT MATTERS.
              </p>
            </div>
        </div>
      </section>

      {/* Open Source Section - Red Background */}
      <section className="border-t-4 border-black relative">
        {/* Vertical text */}
        <div className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <div className="text-sm font-bold tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            OPEN SOURCE
          </div>
        </div>

        {/* Projects List */}
        <div className="p-8 md:p-16 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">
            OPEN SOURCE CONTRIBUTIONS
          </h2>

          <div className="space-y-8">
            {[
              {
                name: "COMMAND LINE MADE SIMPLE",
                subtitle: "CLI TOOLKIT",
                repo: "GITHUB.COM/BLACKTARENGINEERING/CLI-TOOLKIT",
                desc: "Stop fighting with argument parsers. Beautiful CLIs in minutes, not days. Colorized output, progress bars, interactive prompts. TypeScript-native and battle-tested by thousands.",
                tech: "TYPESCRIPT / NODE.JS",
                stars: "2.5K",
                number: "01",
              },
              {
                name: "SPEED WITHOUT SACRIFICE",
                subtitle: "RUST WEB FRAMEWORK",
                repo: "GITHUB.COM/BLACKTARENGINEERING/RUST-WEB",
                desc: "Web framework that doesn't make you choose between speed and developer experience. Async by default. Zero-cost abstractions. Routing and middleware that just works.",
                tech: "RUST / TOKIO",
                stars: "1.8K",
                number: "02",
              },
              {
                name: "VERSION CONTROL FOR YOUR DATABASE",
                subtitle: "DATABASE MIGRATION TOOL",
                repo: "GITHUB.COM/BLACKTARENGINEERING/MIGRATE",
                desc: "Git for your database schema. One tool, multiple databases. Rollback with confidence. Team-ready from day one. PostgreSQL, MySQL, MongoDB support built-in.",
                tech: "GO / SQL",
                stars: "3.2K",
                number: "03",
              },
            ].map((project, i) => (
              <div key={i} className="border-b-2 border-black pb-6 border-l-4 border-black pl-4">
                <div className="flex items-start gap-4 mb-2">
                  <div className="text-3xl font-bold opacity-50">
                    {project.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="text-xl md:text-2xl font-bold mb-1">
                          {project.name}
                        </div>
                        <div className="text-sm opacity-80">
                          {project.subtitle}
                        </div>
                      </div>
                      <div className="text-sm opacity-70 ml-4 flex items-center gap-1">
                        <Star size={16} fill="currentColor" />
                        {project.stars}
                      </div>
                    </div>
                    <div className="text-sm mb-2 opacity-80 border-b border-black inline-block pb-1">
                      {project.repo}
                    </div>
                    <p className="text-sm leading-relaxed mb-2 opacity-90">
                      {project.desc}
                    </p>
                    <div className="text-xs opacity-70 font-bold">
                      {project.tech}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t-2 border-black">
            <p className="text-sm leading-relaxed opacity-90 border-l-4 border-black pl-4">
              GOOD SOFTWARE SHOULD BE FREE. GREAT SOFTWARE SHOULD BE OPEN. WE BUILD TOOLS WE WISH EXISTED, THEN SHARE THEM WITH THE WORLD. ACTIVELY MAINTAINED. WELL-DOCUMENTED. CONTRIBUTIONS WELCOME.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section - Black Background */}
      <section className="p-8 md:p-16 border-t-4 border-black bg-black text-[#d21e1e] relative">
        {/* Vertical text */}
        <div className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <div className="text-sm font-bold tracking-wider" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            PHILOSOPHY
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="text-3xl md:text-5xl font-bold leading-tight mb-8 border-l-8 border-[#d21e1e] pl-6">
            WE BUILD SOFTWARE THAT WORKS FOR PEOPLE, NOT THE OTHER WAY AROUND
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="border-l-4 border-[#d21e1e] pl-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 border-b-2 border-[#d21e1e] pb-2">
                OUR PROCESS
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                We start by understanding your problem deeply. No premature solutions, no assumptions. Just thorough discovery and planning.
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                Then we build iteratively, shipping early and often. Continuous feedback loops ensure we're always moving in the right direction.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                We believe in simple, maintainable code that others can understand. No clever tricks, no unnecessary complexity.
              </p>
            </div>

            <div className="border-l-4 border-[#d21e1e] pl-6">
              <h3 className="text-xl md:text-2xl font-bold mb-4 border-b-2 border-[#d21e1e] pb-2">
                WHY WORK WITH US
              </h3>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                We're not a factory. We're a small team that cares about the work we do and the people we work with.
              </p>
              <p className="text-sm md:text-base leading-relaxed mb-4">
                Every project gets our full attention. We're involved from strategy through deployment and beyond.
              </p>
              <p className="text-sm md:text-base leading-relaxed">
                We communicate clearly and honestly. No jargon, no surprises. You'll always know where things stand.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t-4 border-[#d21e1e] border-l-4 border-[#d21e1e] pl-6">
            <h3 className="text-xl md:text-2xl font-bold mb-4 border-b-2 border-[#d21e1e] pb-2">
              CLIENTS
            </h3>
            <p className="text-sm md:text-base leading-relaxed">
              We've worked with startups raising their first round, established companies modernizing legacy systems, and everything in between. What they have in common: a vision for better software and a willingness to do things right.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 pb-12 border-b-4 border-black">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              LET'S BUILD SOMETHING THAT SHIPS
            </h2>
            <p className="text-lg md:text-xl opacity-90 border-l-4 border-black pl-4">
              READY TO MOVE FAST AND BUILD THINGS? LET'S TALK.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="border-l-4 border-black pl-4">
              <div className="font-bold mb-2 text-sm border-b-2 border-black pb-1 inline-block">CONTACT</div>
              <div className="text-sm leading-relaxed">
                <div>
                  INFO<span className="opacity-50">[at]</span>BLACKTAR<span className="opacity-50">[dot]</span>WORKS
                </div>
                <div className="opacity-70 mt-2">
                  For project inquiries, partnerships, or general questions.
                </div>
              </div>
            </div>

            <div className="border-l-4 border-black pl-4">
              <div className="font-bold mb-2 text-sm border-b-2 border-black pb-1 inline-block">LOCATION</div>
              <div className="text-sm leading-relaxed">
                <div>REMOTE FIRST</div>
                <div className="opacity-70 mt-2">
                  We work with clients worldwide. Based primarily in North America and Europe.
                </div>
              </div>
            </div>

            <div className="border-l-4 border-black pl-4">
              <div className="font-bold mb-2 text-sm border-b-2 border-black pb-1 inline-block">CONNECT</div>
              <div className="text-sm leading-relaxed space-y-2">
                <a href="https://github.com/blacktarhq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Github size={20} />
                  <span>GITHUB.COM/BLACKTARHQ</span>
                </a>
                <a href="https://x.com/blacktarhq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <svg
                    className="inline-block"
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"/>
                  </svg>
                  <span>X.COM/BLACKTARHQ</span>
                </a>
                <a href="https://linkedin.com/company/blacktarhq" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Linkedin size={20} />
                  <span>LINKEDIN.COM/COMPANY/BLACKTARHQ</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t-4 border-black pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
            <div className="font-bold border-l-4 border-black pl-4">
              © {currentYear} BLACKTAR ENGINEERING WORKS. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-4 opacity-70">
              <div className="border-l-2 border-black pl-2">PRIVACY POLICY</div>
              <div className="border-l-2 border-black pl-2">TERMS OF SERVICE</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
