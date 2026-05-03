import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "Founder, TechStart",
    quote: "The MVP they built for us wasn't just functional, it was beautiful. They understood our vision instantly and executed it with precision. A true partner.",
  },
  {
    name: "David Chen",
    role: "Marketing Director",
    quote: "Their social media strategies completely transformed our online presence. The graphic design work is top-tier, and the analytics prove it.",
  },
  {
    name: "Elena Rodriguez",
    role: "Freelance Designer",
    quote: "The career advising sessions gave me the exact roadmap I needed. I went from struggling to find clients to being booked out for months.",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden border-t border-white/5">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Client <span className="text-primary italic">Impact</span></h2>
          <p className="text-muted-foreground">Words from those I've collaborated with.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 bg-white/[0.02] border border-white/5 backdrop-blur-md relative"
            >
              <div className="flex gap-1 mb-6 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-neutral-300 leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div>
                <h4 className="font-bold text-white">{t.name}</h4>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
