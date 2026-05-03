import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Aura Brand Identity",
    category: "Branding Work",
    description: "Complete visual overhaul for a luxury wellness brand, including logo design and social media templates.",
    gradient: "from-neutral-800 to-neutral-900",
  },
  {
    title: "NexGen SaaS App",
    category: "Web App UI",
    description: "Designed and developed the frontend for a B2B analytics platform using React and Tailwind CSS.",
    gradient: "from-neutral-900 to-black",
  },
  {
    title: "Luminary Launch",
    category: "Landing Pages",
    description: "High-converting cinematic landing page that drove a 40% increase in pre-orders for a tech hardware startup.",
    gradient: "from-neutral-800 to-black",
  },
  {
    title: "Vibe Culture Grid",
    category: "Social Media Designs",
    description: "A cohesive, viral Instagram grid design system for an emerging streetwear fashion label.",
    gradient: "from-black to-neutral-900",
  },
];

export function Projects() {
  return (
    <section className="py-24 bg-black relative" id="projects">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Selected <span className="text-primary italic">Works</span></h2>
            <p className="text-muted-foreground max-w-xl">A curated collection of projects spanning branding, UI/UX, and development.</p>
          </div>
          <Button variant="outline" className="rounded-none border-white/20 hover:bg-white/5 uppercase tracking-widest text-xs h-10 px-6">
            View Archive
          </Button>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer block"
            >
              <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden mb-6 bg-neutral-900 border border-white/5 group-hover:border-primary/30 transition-colors duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-500">
                    <ExternalLink className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{project.category}</span>
                <h3 className="text-2xl font-serif font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                <span className="text-sm font-medium underline underline-offset-4 decoration-white/20 group-hover:decoration-primary transition-colors">
                  View Project
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
