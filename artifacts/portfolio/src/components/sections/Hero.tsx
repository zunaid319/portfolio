import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import profileImg from "../../assets/profile.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_100%)] pointer-events-none" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start text-left"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight mb-6">
              A boy who saw{" "}
              <span className="text-primary italic">magic</span>{" "}
              inside a computer.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              What started as pure curiosity evolved into a multi-skilled career spanning graphic design, digital marketing, MVP development, and career advising. I build things that matter.
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 rounded-none font-medium uppercase tracking-wider"
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Discover My Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[4/5] group">
              <div className="absolute inset-0 border border-primary/50 shadow-[0_0_40px_rgba(255,44,44,0.3)] transition-all duration-700 group-hover:shadow-[0_0_60px_rgba(255,44,44,0.5)] -rotate-3 group-hover:rotate-0" />
              <div className="absolute inset-0 border border-border rotate-3 group-hover:rotate-0 transition-transform duration-700 overflow-hidden bg-black">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
