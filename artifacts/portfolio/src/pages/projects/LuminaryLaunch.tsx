import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Check, Compass, Cpu, Laptop, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const finishes = [
  { id: "black", name: "Matte Black", color: "bg-neutral-800", price: 499, description: "Deep carbon matte finish with double-layer anti-fingerprint coating." },
  { id: "gold", name: "Champagne Gold", color: "bg-amber-200", price: 549, description: "Polished anodized gold with an elegant, reflective luxury look." },
  { id: "grey", name: "Lunar Grey", color: "bg-zinc-400", price: 519, description: "Micro-blasted titanium grey texture mimicking space-grade durability." },
];

const specifications = {
  optics: [
    { label: "Brightness", val: "2,400 ANSI Lumens" },
    { label: "Resolution", val: "Native 4K Ultra HD" },
    { label: "Contrast Ratio", val: "1,000,000 : 1" },
    { label: "Throw Ratio", val: "0.21 Ultra Short Throw" },
  ],
  connectivity: [
    { label: "Wireless", val: "Wi-Fi 7 (802.11be)" },
    { label: "Inputs", val: "HDMI 2.1 x 3, USB-C DP Alt" },
    { label: "Bluetooth", val: "Bluetooth 5.4 Low Energy" },
    { label: "Audio Out", val: "eARC / Optical TOSLINK" },
  ],
  design: [
    { label: "Dimensions", val: "14.2 x 9.8 x 3.6 inches" },
    { label: "Weight", val: "9.2 lbs" },
    { label: "Noise Level", val: "24 dB (Whisper Silent)" },
    { label: "Warranty", val: "3-Year Limited Cover" },
  ],
};

export default function LuminaryLaunch() {
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);
  const [activeTab, setActiveTab] = useState<"optics" | "connectivity" | "design">("optics");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handlePreorderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all preorder form fields.");
      return;
    }
    toast.success("Preorder reservation successful!", {
      description: `Reserved 1x Luminary Projector in ${selectedFinish.name} ($${selectedFinish.price}). Check ${formData.email} for details.`,
    });
    setFormData({ name: "", email: "" });
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-24">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="container h-full mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <span className="font-serif text-lg tracking-wider text-primary">Luminary Launch</span>
        </div>
      </header>

      {/* Hero Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        {/* Glow Background */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 rounded-full blur-[120px] transition-all duration-700 pointer-events-none ${
          selectedFinish.id === "gold" ? "bg-amber-500/10" : selectedFinish.id === "grey" ? "bg-zinc-500/10" : "bg-primary/10"
        }`} />

        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10 text-center">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Product Launch Showcase</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">Luminary Projector</h1>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            Redefining home theatre projection. Experience cinema-grade 4K optics packed into an ultra-short-throw chassis that rests gracefully on your credentials.
          </p>
        </div>
      </section>

      {/* Interactive Configurator Section */}
      <section className="py-12 bg-neutral-950 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Preview */}
            <div className="relative aspect-video bg-neutral-900 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,rgba(0,0,0,0.5)_100%)]" />
              
              {/* Animated Hardware Rendering glow mockup */}
              <motion.div
                key={selectedFinish.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-3/4 h-1/2 rounded-md shadow-2xl relative flex flex-col justify-end p-6 border border-white/10"
                style={{
                  background: `linear-gradient(135deg, #18181b 0%, #09090b 100%)`,
                  boxShadow: `0 0 50px rgba(${selectedFinish.id === 'gold' ? '212,175,55' : selectedFinish.id === 'grey' ? '160,160,160' : '250,224,178'}, 0.15)`
                }}
              >
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
                  <div className={`w-3.5 h-3.5 rounded-full ${selectedFinish.color} border border-white/20`} />
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">{selectedFinish.name}</span>
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden mb-4">
                  <div className="h-full w-2/3 bg-primary animate-pulse" />
                </div>
                <h4 className="font-serif text-white text-lg">Luminary UST-4K</h4>
              </motion.div>
            </div>

            {/* Customizer Panel */}
            <div className="flex flex-col justify-center">
              <span className="text-primary text-[10px] font-mono font-bold tracking-widest uppercase mb-2 block">Configuration Tool</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Select Finish</h2>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                {selectedFinish.description}
              </p>

              {/* Finish Selection Buttons */}
              <div className="flex gap-4 mb-8">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f)}
                    className={`flex items-center gap-2 px-4 py-3 border text-xs font-bold uppercase transition-all rounded-none cursor-pointer ${
                      selectedFinish.id === f.id
                        ? "border-primary bg-primary/10 text-white"
                        : "border-white/10 hover:border-white/25 text-neutral-400"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full ${f.color} border border-white/20`} />
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">Estimated Base Pricing:</span>
                <span className="text-3xl font-serif font-bold text-white">${selectedFinish.price}</span>
                <span className="text-neutral-500 text-sm">USD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Specifications Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Hardware Specifications</h2>
            <p className="text-muted-foreground">Every detail engineered for performance.</p>
          </div>

          {/* Specification Tabs */}
          <div className="flex justify-center border-b border-white/10 mb-8 max-w-md mx-auto">
            {(["optics", "connectivity", "design"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all text-center cursor-pointer border-b-2 ${
                  activeTab === tab
                    ? "border-primary text-white"
                    : "border-transparent text-neutral-400 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Specifications Grid */}
          <div className="bg-neutral-900/30 border border-white/5 p-8 max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 gap-x-8 gap-y-6"
              >
                {specifications[activeTab].map((spec) => (
                  <div key={spec.label} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-neutral-500 text-xs uppercase font-bold tracking-wider">{spec.label}</span>
                    <span className="text-white text-sm font-semibold">{spec.val}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Preorder reservation form */}
      <section className="py-16 bg-neutral-950">
        <div className="container mx-auto px-4 md:px-6 max-w-xl border border-white/5 p-8 bg-neutral-900/30">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-serif font-bold mb-2">Reserve Your Unit</h2>
            <p className="text-neutral-400 text-sm">Sign up today to secure your custom finish unit.</p>
          </div>

          <form onSubmit={handlePreorderSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-neutral-400 uppercase tracking-wider text-xs block font-bold">Your Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="bg-black/50 border-white/10 rounded-none h-11 text-white focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-400 uppercase tracking-wider text-xs block font-bold">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                className="bg-black/50 border-white/10 rounded-none h-11 text-white focus-visible:ring-primary focus-visible:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-neutral-400 uppercase tracking-wider text-xs block font-bold">Selected Hardware Finish</label>
              <div className="bg-black/50 border border-white/10 p-3 flex justify-between items-center text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className={`w-3.5 h-3.5 rounded-full ${selectedFinish.color} border border-white/20`} />
                  <span>{selectedFinish.name}</span>
                </div>
                <span className="font-mono text-primary font-bold">${selectedFinish.price}</span>
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-black hover:bg-primary hover:text-primary-foreground rounded-none h-12 text-xs font-bold uppercase tracking-widest transition-colors duration-300">
              Submit Pre-order Reservation
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
