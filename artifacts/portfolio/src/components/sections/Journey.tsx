import { motion } from "framer-motion";

const timeline = [
  {
    year: "The Spark",
    title: "Pure Curiosity",
    description: "It started with dismantling computers and writing simple scripts. The screen was a canvas, and code was the brush.",
  },
  {
    year: "Chapter 1",
    title: "Graphic Designer",
    description: "Learned the rules of visual communication. Mastered typography, color theory, and layout to craft compelling brand identities.",
  },
  {
    year: "Chapter 2",
    title: "Responsive Web Design",
    description: "Bridging visual arts and logic. Mastered modern CSS grids, flexbox, and mobile-first layouts to deliver pixel-perfect responsive interfaces.",
  },
  {
    year: "Chapter 3",
    title: "Digital Marketer",
    description: "Translated visual appeal into measurable growth. Orchestrated campaigns, analyzed data, and drove audience engagement.",
  },
  {
    year: "Chapter 4",
    title: "MVP Developer",
    description: "Bridged the gap between design and functionality. Built robust, scalable minimum viable products for ambitious startups.",
  },
  {
    year: "Chapter 5",
    title: "Career Advisor",
    description: "Giving back to the community. Guiding the next generation of freelancers and creators to find their path in the digital world.",
  },
  {
    year: "Present",
    title: "Working Full Time Remotely",
    description: "Engineering and scaling client products globally. Designing clean interfaces, writing modular code, and collaborating with cross-functional teams anywhere.",
  },
];

export function Journey() {
  return (
    <section className="py-24 bg-neutral-950 relative border-t border-white/5" id="journey">
      <div className="container px-4 md:px-6 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">The <span className="text-primary italic">Journey</span></h2>
          <p className="text-muted-foreground">An evolution of craft and purpose.</p>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0 md:mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 relative pl-8 md:pl-0 md:w-1/2 md:even:ml-auto md:odd:mr-auto md:even:pl-12 md:odd:pr-12 md:odd:text-right group"
            >
              <div className="absolute left-[-5px] md:left-auto md:right-[-5px] md:group-even:left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,44,44,0.8)]" />
              
              <div className="flex flex-col">
                <span className="text-primary text-sm font-bold tracking-wider uppercase mb-1">{item.year}</span>
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
