import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, Palette, Layers, TrendingUp, CheckCircle2 } from "lucide-react";

interface SkillItem {
  name: string;
  type: "capability" | "tech" | "tool";
  important?: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  items: SkillItem[];
}

const categories: Category[] = [
  {
    id: "web-tech",
    name: "Web & Tech",
    icon: Terminal,
    items: [
      { name: "AI-Assisted Web Development", type: "capability", important: true },
      { name: "Vibe Coding", type: "capability", important: true },
      { name: "HTML & CSS", type: "tech" },
      { name: "Bootstrap", type: "tech" },
      { name: "WordPress & Elementor", type: "capability" },
      { name: "WooCommerce", type: "tech" },
      { name: "Shopify", type: "tech" },
      { name: "AI / No-Code / Low-Code MVP Development", type: "capability", important: true },
      { name: "Replit", type: "tool" },
      { name: "Antigravity", type: "tool" },
      { name: "Claude", type: "tool" },
      { name: "Gemini", type: "tool" },
      { name: "Firebase Studio", type: "tool" },
      { name: "Bolt", type: "tool" },
      { name: "Git & GitHub", type: "tool" },
      { name: "Deployment & Hosting", type: "capability" },
      { name: "Firebase & Database Development", type: "capability" },
      { name: "n8n Automation", type: "capability", important: true },
      { name: "Docker", type: "tool" }
    ]
  },
  {
    id: "ai",
    name: "AI",
    icon: Cpu,
    items: [
      { name: "ChatGPT", type: "tool" },
      { name: "Gemini", type: "tool" },
      { name: "Claude", type: "tool" },
      { name: "Ideogram", type: "tool" },
      { name: "Nano Banana", type: "tool" },
      { name: "Veo", type: "tool" },
      { name: "AI-Assisted Coding", type: "capability", important: true },
      { name: "AI Product Development", type: "capability", important: true },
      { name: "Prompt Engineering", type: "capability" },
      { name: "AI-Powered SaaS & MVP Development", type: "capability", important: true },
      { name: "AI-Assisted Content Creation", type: "capability" }
    ]
  },
  {
    id: "design",
    name: "Graphic Design",
    icon: Palette,
    items: [
      { name: "6+ Years of Graphic Design", type: "capability", important: true },
      { name: "Line-Art Illustration", type: "capability" },
      { name: "User Manual Design", type: "capability" },
      { name: "Menu Design", type: "capability" },
      { name: "Logo & Vector Design", type: "capability" },
      { name: "Branding & Visual Identity", type: "capability", important: true },
      { name: "Website Visual Design", type: "capability", important: true },
      { name: "Marketing Creatives", type: "capability" }
    ]
  },
  {
    id: "ux-product",
    name: "UX & Product",
    icon: Layers,
    items: [
      { name: "User Experience (UX)", type: "capability", important: true },
      { name: "User Flows", type: "capability" },
      { name: "Information Architecture", type: "capability" },
      { name: "Wireframing", type: "capability" },
      { name: "Prototyping", type: "capability" },
      { name: "Interface Design", type: "capability" },
      { name: "Responsive Design", type: "capability" },
      { name: "Design Systems", type: "capability" },
      { name: "SaaS Product Design", type: "capability", important: true },
      { name: "MVP Product Development", type: "capability", important: true },
      { name: "UX-Focused AI App Development", type: "capability", important: true }
    ]
  },
  {
    id: "marketing",
    name: "Digital Marketing & E-com",
    icon: TrendingUp,
    items: [
      { name: "Digital Marketing", type: "capability", important: true },
      { name: "Social Media Marketing", type: "capability" },
      { name: "Content Creation", type: "capability" },
      { name: "E-commerce Development", type: "capability", important: true },
      { name: "Shopify", type: "tech" },
      { name: "WooCommerce", type: "tech" },
      { name: "Product & Brand Positioning", type: "capability", important: true },
      { name: "Facebook Marketing", type: "capability" },
      { name: "Instagram Marketing", type: "capability" },
      { name: "Pinterest Marketing", type: "capability" },
      { name: "Digital Products", type: "capability" },
      { name: "Print-on-Demand", type: "capability" }
    ]
  }
];

const pipelineSteps = [
  { label: "Idea", desc: "Conceptualization & Validation" },
  { label: "UX", desc: "Flows & Information Arch" },
  { label: "Design", desc: "Visuals & Identity" },
  { label: "AI", desc: "Prompting & SaaS Logic" },
  { label: "Development", desc: "No-Code & Vibe Coding" },
  { label: "Launch", desc: "Deployment & Setup" },
  { label: "Marketing", desc: "Ad Campaigns & Traffic" }
];

export function Skills() {
  const [activeTab, setActiveTab] = useState("web-tech");

  const activeCategory = categories.find((c) => c.id === activeTab) || categories[0];

  const groupedItems = useMemo(() => {
    const capabilities = activeCategory.items.filter((item) => item.type === "capability");
    const technologies = activeCategory.items.filter((item) => item.type === "tech");
    const tools = activeCategory.items.filter((item) => item.type === "tool");
    return { capabilities, technologies, tools };
  }, [activeCategory]);

  return (
    <section className="py-24 bg-black relative border-t border-white/5" id="skills">
      {/* Subtle Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto max-w-6xl relative z-10">
        
        {/* Title Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
            My <span className="text-primary italic">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-sm uppercase tracking-widest max-w-xl mx-auto mb-6">
            Disciplines, frameworks, and intelligence pipelines.
          </p>
          <div className="inline-block border border-white/10 bg-neutral-900/40 px-6 py-3 rounded-full text-xs font-semibold text-neutral-300">
            “I don't just use tools. I combine them to turn ideas into digital products.”
          </div>
        </motion.div>

        {/* UX Storytelling: Process Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 bg-neutral-900/30 border border-white/5 p-6 rounded-2xl hidden md:block"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6 text-center">
            Complete Product Lifecycle Pipeline
          </h3>
          <div className="grid grid-cols-7 gap-2 relative">
            {pipelineSteps.map((step, idx) => (
              <div key={step.label} className="flex flex-col items-center text-center relative group">
                {idx < pipelineSteps.length - 1 && (
                  <div className="absolute top-4 right-[-50%] w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent z-0" />
                )}
                <div className="w-8 h-8 rounded-full border border-white/10 bg-neutral-950 flex items-center justify-center text-xs font-bold text-neutral-400 group-hover:border-primary group-hover:text-primary z-10 transition-colors">
                  {idx + 1}
                </div>
                <span className="text-sm font-bold mt-3 text-white group-hover:text-primary transition-colors">{step.label}</span>
                <span className="text-[10px] text-neutral-500 mt-1 max-w-[110px] leading-tight">{step.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Interface Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Menu Column */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none shrink-0 border-b lg:border-b-0 border-white/5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left px-5 py-4 border rounded-none transition-all flex items-center gap-4 shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-neutral-900/60 border-primary text-white shadow-lg shadow-primary/5"
                      : "border-white/5 bg-transparent text-neutral-400 hover:bg-neutral-900/20 hover:text-white"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-neutral-500"}`} />
                  <span className="font-serif font-bold text-sm tracking-wider uppercase whitespace-nowrap lg:whitespace-normal">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Content Display Column */}
          <div className="lg:col-span-8 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8 bg-neutral-900/10 border border-white/5 p-8"
              >
                {/* Header within active view */}
                <div className="border-b border-white/5 pb-4">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase block mb-1">Active Kit</span>
                  <h3 className="text-2xl font-serif font-bold text-white uppercase">{activeCategory.name}</h3>
                </div>

                {/* Grid Split: Capabilities, Tech, and Tools */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Capabilities Column */}
                  {groupedItems.capabilities.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider border-l-2 border-primary pl-2.5">
                        Capabilities & Strategies
                      </h4>
                      <ul className="space-y-3">
                        {groupedItems.capabilities.map((item) => (
                          <li
                            key={item.name}
                            className="bg-primary/5 border-primary/20 text-white font-bold flex items-start gap-3 p-3 rounded-lg border text-sm transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                            <span>{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech and Tools Stack Column */}
                  {(groupedItems.technologies.length > 0 || groupedItems.tools.length > 0) && (
                    <div className="space-y-6">
                      {/* Technologies Section */}
                      {groupedItems.technologies.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider border-l-2 border-primary pl-2.5">
                            Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {groupedItems.technologies.map((item) => (
                              <span
                                key={item.name}
                                className="bg-primary/5 border-primary/30 text-primary font-bold px-3 py-1.5 text-xs border tracking-wide"
                              >
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tools Section */}
                      {groupedItems.tools.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider border-l-2 border-primary pl-2.5">
                            Tools & Copilots
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {groupedItems.tools.map((item) => (
                              <span
                                key={item.name}
                                className="bg-primary/5 border-primary/30 text-primary font-bold px-3 py-1.5 text-xs border tracking-wide"
                              >
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
