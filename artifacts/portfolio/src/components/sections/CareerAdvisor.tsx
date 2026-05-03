import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CareerAdvisor() {
  return (
    <section className="py-32 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container px-4 md:px-6 mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
            Helping <span className="italic text-black">500+</span> students start their freelancing careers.
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
            Turn your skills into a sustainable business. Get actionable advice, portfolio reviews, and a roadmap to your first premium client.
          </p>
          <Button
            size="lg"
            className="bg-black text-white hover:bg-neutral-900 text-lg px-10 py-7 rounded-none font-bold uppercase tracking-wider shadow-xl transition-transform hover:scale-105"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book a Session
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
