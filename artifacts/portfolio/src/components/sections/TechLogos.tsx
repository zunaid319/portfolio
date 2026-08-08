import { motion } from "framer-motion";
import { SiGoogle, SiMeta, SiOpenai, SiGooglegemini } from "react-icons/si";
import { Layers, PenTool } from "lucide-react";

const tools = [
  { name: "Google", icon: SiGoogle },
  { name: "Meta", icon: SiMeta },
  { name: "OpenAI", icon: SiOpenai },
  { name: "Gemini", icon: SiGooglegemini },
  { name: "Photoshop", icon: Layers },
  { name: "Illustrator", icon: PenTool },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } }
};

export function TechLogos() {
  return (
    <section className="py-20 bg-neutral-950 border-y border-white/5">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                variants={item}
                className="group relative flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500" />
                <Icon className="w-8 h-8 md:w-12 md:h-12 text-white transition-all duration-300 group-hover:text-primary relative z-10" />
                <span className="absolute -bottom-8 text-xs font-medium text-white/0 group-hover:text-white/70 transition-colors duration-300">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
