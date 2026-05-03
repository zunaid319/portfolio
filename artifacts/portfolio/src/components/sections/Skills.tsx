import { motion } from "framer-motion";
import { PenTool, Megaphone, Code2, Rocket, Layout, GraduationCap } from "lucide-react";

const skills = [
  {
    title: "Graphic Design",
    subtitle: "NSDA Certified",
    icon: PenTool,
    description: "Creating striking visual identities and brand assets.",
  },
  {
    title: "Social Media Marketing",
    subtitle: "Growth & Strategy",
    icon: Megaphone,
    description: "Data-driven campaigns that build engaged audiences.",
  },
  {
    title: "Vibe Coding",
    subtitle: "Frontend Magic",
    icon: Code2,
    description: "Crafting immersive, high-performance web experiences.",
  },
  {
    title: "MVP Development",
    subtitle: "0 to 1",
    icon: Rocket,
    description: "Rapid prototyping and robust architecture for startups.",
  },
  {
    title: "Web Design",
    subtitle: "UI/UX",
    icon: Layout,
    description: "Designing intuitive, user-centric interfaces.",
  },
  {
    title: "Career Advising",
    subtitle: "Mentorship",
    icon: GraduationCap,
    description: "Guiding the next wave of creative professionals.",
  },
];

export function Skills() {
  return (
    <section className="py-24 bg-black relative" id="skills">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">My <span className="text-primary italic">Arsenal</span></h2>
          <p className="text-muted-foreground">Tools and disciplines mastered over years of execution.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 bg-neutral-900/50 border border-white/5 hover:border-primary/50 transition-colors duration-500 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <Icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-1">{skill.title}</h3>
                <span className="text-xs text-muted-foreground uppercase tracking-widest mb-4 block">{skill.subtitle}</span>
                <p className="text-neutral-400 text-sm leading-relaxed">{skill.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
