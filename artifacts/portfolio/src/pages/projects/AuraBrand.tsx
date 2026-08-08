import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, Type, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const brandColors = [
  { name: "Aura Sage", hex: "#4A5D4E", desc: "Primary brand identifier, representing calmness & natural balance" },
  { name: "Gold Dust", hex: "#D4AF37", desc: "Highlight gold element, adding luxury and cinematic warmth" },
  { name: "Warm Sand", hex: "#F5F2EB", desc: "Soft editorial background color, clean and organic" },
  { name: "Aura Charcoal", hex: "#1C1C1C", desc: "Deep layout contrast color, providing dark premium weight" },
];

const mockAssets = [
  { title: "Business Card Mockup", category: "Stationery", desc: "Double-sided premium card layout with gold foil detailing." },
  { title: "Social Story Grid", category: "Social Templates", desc: "Minimalist layout with custom serif frames." },
  { title: "Wellness Packaging Box", category: "Branding", desc: "Tactile card boxes utilizing organic ink prints." },
];

export default function AuraBrand() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [customText, setCustomText] = useState("Aura Wellness");

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    toast.success(`Copied ${hex} to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
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
          <span className="font-serif text-lg tracking-wider text-primary">Aura Brand Identity</span>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Branding Showcase</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">Aura Wellness</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A complete visual identity redesign for a premium luxury wellness brand. This system bridges organic, natural balance with high-end editorial sophistication using earth tones and classical typography.
          </p>
        </div>
      </section>

      {/* Brand Color Palette Tool */}
      <section className="py-16 bg-neutral-950 border-y border-white/5">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Palette System
            </h2>
            <p className="text-muted-foreground">Interactive brand colors. Hover to inspect, click to copy hex codes.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandColors.map((color) => (
              <motion.div
                key={color.name}
                whileHover={{ y: -6 }}
                className="bg-neutral-900 border border-white/5 p-6 rounded-none flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-full aspect-square mb-6 border border-white/10 cursor-pointer flex items-center justify-center relative group"
                    style={{ backgroundColor: color.hex }}
                    onClick={() => copyToClipboard(color.hex)}
                  >
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      {copiedHex === color.hex ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Copy className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{color.name}</h3>
                  <p className="text-neutral-500 text-xs font-mono uppercase mb-4">{color.hex}</p>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">{color.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography Slogan Tester */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 flex items-center gap-2">
              <Type className="w-5 h-5 text-primary" /> Typography Tester
            </h2>
            <p className="text-muted-foreground">Preview how the custom brand typeface pairing handles headlines and slogans.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="bg-neutral-900 p-8 border border-white/5">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 block">
                Test Your Slogan
              </label>
              <Input
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Type brand slogan..."
                maxLength={40}
                className="bg-black/50 border-white/10 text-white placeholder:text-neutral-700 h-12 rounded-none focus-visible:ring-primary focus-visible:border-primary"
              />
              <p className="text-neutral-500 text-[11px] mt-2">
                Type in custom strings to test layout, kerning, and display sizes in the brand suite style.
              </p>
            </div>

            <div className="lg:col-span-2 space-y-8 bg-neutral-950 p-8 border border-white/5">
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">
                  Cormorant Garamond (Heading Display Serif)
                </span>
                <p className="text-4xl md:text-6xl font-serif leading-tight text-white italic">
                  {customText || "Aura Slogan"}
                </p>
              </div>
              <hr className="border-white/5" />
              <div>
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest mb-1 block">
                  Plus Jakarta Sans (Body Sans-serif)
                </span>
                <p className="text-lg md:text-2xl font-sans tracking-wide leading-relaxed text-neutral-300 uppercase">
                  {customText || "Aura Slogan"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Asset Mockups */}
      <section className="py-16 bg-neutral-950/50">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3">Asset Mockups</h2>
            <p className="text-muted-foreground">Digital and print collaterals created for the brand rollout.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {mockAssets.map((asset) => (
              <div
                key={asset.title}
                className="border border-white/5 p-8 bg-neutral-900/30 backdrop-blur hover:border-primary/20 transition-colors"
              >
                <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-4 block">
                  {asset.category}
                </span>
                <h3 className="text-xl font-serif font-bold mb-3">{asset.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{asset.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
