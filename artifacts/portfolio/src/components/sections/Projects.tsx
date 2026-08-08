import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

import stcLogo from "../../assets/stc_logo.jpg";
import sauceLogo from "../../assets/sauce_logo_thumb.jpg";
import newrangeLogo from "../../assets/newrange_logo.png";

const projects = [
  {
    title: "STC Mental Health",
    category: "Empowerment & Life Skills",
    description: "A person-centered mental health advocacy platform featuring interactive programs and transportation booking.",
    image: stcLogo,
    slug: "https://stcmhep.org/",
  },
  {
    title: "Sauce The City",
    category: "Concessions Foodservice",
    description: "High-volume stadium and airport concession foodservice brand featuring interactive menu strategy guidelines.",
    image: sauceLogo,
    slug: "https://saucethecity.com/",
  },
  {
    title: "New Range Online",
    category: "Auto Parts E-Commerce",
    description: "Aftermarket truck and car parts catalog platform featuring live cart checkout drawers and brand filtering.",
    image: newrangeLogo,
    slug: "https://newrangeonline.com/",
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
          {projects.map((project, index) => {
            const isExternal = project.slug.startsWith("http");
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="cursor-pointer block"
              >
                <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden mb-6 bg-neutral-900 border border-white/5 group-hover:border-primary/30 transition-colors duration-500">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center bg-primary/10 backdrop-blur-sm scale-90 group-hover:scale-100 transition-all duration-500">
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{project.category}</span>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            );

            if (isExternal) {
              return (
                <a
                  key={project.title}
                  href={project.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  {CardContent}
                </a>
              );
            }

            return (
              <Link key={project.title} href={project.slug} className="block group">
                {CardContent}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
