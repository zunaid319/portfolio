import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Compass, ShieldCheck, Layers, BookOpen, Clock, Heart, Users, ArrowRight, Check, Send, Phone, Info, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import stcLogoImg from "../../assets/stc_logo.jpg";

export default function STC() {
  const [activeTab, setActiveTab] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<string>("50");
  const [customDonation, setCustomDonation] = useState("");
  const [isMonthly, setIsMonthly] = useState(false);
  const [transportForm, setTransportForm] = useState({ name: "", email: "", phone: "", pickup: "", dropoff: "", reason: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedDonation === "custom" ? customDonation : selectedDonation;
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid donation amount.");
      return;
    }
    toast.success(`Thank you for your donation!`, {
      description: `You have successfully donated $${amount} ${isMonthly ? "monthly" : "one-time"} to the STC Mental Health Program.`,
    });
  };

  const handleTransportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transportForm.name || !transportForm.phone || !transportForm.pickup || !transportForm.dropoff) {
      toast.error("Please fill out all required fields.");
      return;
    }
    toast.success("Transportation Request Submitted!", {
      description: `Thank you ${transportForm.name}. We will review your request and follow up soon.`,
    });
    setTransportForm({ name: "", email: "", phone: "", pickup: "", dropoff: "", reason: "" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    toast.success("Message Sent!", {
      description: `Thank you ${contactForm.name}. Your message has been sent to stcmhep@gmail.com.`,
    });
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-[#5A9B2E] selection:text-white">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#0B2E67]/10 py-4 shadow-sm">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-[#0B2E67] hover:text-[#15407f] flex items-center gap-2 cursor-pointer p-0 h-auto">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </Link>
            <div className="w-px h-6 bg-[#0B2E67]/20 hidden sm:block" />
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab("home")}>
              <img src={stcLogoImg} alt="STC Logo" className="w-10 h-10 object-contain shrink-0" />
              <div className="flex flex-col">
                <span className="font-serif font-bold text-sm md:text-base text-[#0B2E67] leading-tight">STC Mental Health</span>
                <span className="text-[8px] font-bold tracking-widest text-[#5A9B2E] uppercase">Awareness & Empowerment Program</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {["home", "about", "classes", "transportation", "donate", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#F6FAF7] text-[#0B2E67]"
                    : "text-slate-600 hover:bg-[#F6FAF7] hover:text-[#0B2E67]"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("transportation")}
              className="hidden sm:inline-flex px-5 py-2.5 rounded-full border border-[#0B2E67]/20 hover:border-[#0B2E67] text-sm font-semibold text-[#0B2E67] transition-all cursor-pointer"
            >
              Request a Ride
            </button>
            <button
              onClick={() => setActiveTab("donate")}
              className="px-5 py-2.5 rounded-full bg-[#5A9B2E] hover:bg-[#4a8126] text-white text-sm font-semibold shadow-md shadow-[#5A9B2E]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current" /> Donate
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0B2E67] cursor-pointer"
            >
              <div className="space-y-1.5">
                <span className={`block w-6 h-0.5 bg-[#0B2E67] transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block w-6 h-0.5 bg-[#0B2E67] transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`} />
                <span className={`block w-6 h-0.5 bg-[#0B2E67] transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#0B2E67]/10 py-3 shadow-md">
            <div className="container mx-auto px-4 flex flex-col gap-1">
              {["home", "about", "classes", "transportation", "donate", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left py-3 px-4 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                    activeTab === tab ? "bg-[#F6FAF7] text-[#0B2E67]" : "text-slate-700 hover:bg-[#F6FAF7]"
                  }`}
                >
                  {tab}
                </button>
              ))}
              <hr className="border-slate-100 my-2" />
              <button
                onClick={() => {
                  setActiveTab("transportation");
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-3 rounded-full border border-[#0B2E67]/20 text-[#0B2E67] font-semibold text-sm transition-all"
              >
                Request a Ride
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area with Tab routing */}
      <main>
        {activeTab === "home" && (
          <>
            {/* Hero Section */}
            <section className="py-20 md:py-28 relative overflow-hidden bg-white">
              {/* Semi-transparent green bubble decoration in background */}
              <div className="absolute right-[-100px] top-[10%] w-[450px] h-[450px] rounded-full bg-[#5A9B2E]/10 pointer-events-none" />
              <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-7">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-[#5A9B2E] mb-3">
                    Mental Health Awareness • Empowerment • Leadership
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-[56px] font-sans font-extrabold text-[#0B2E67] leading-[1.1] mb-6">
                    Build the strength <br />
                    to <span className="text-[#5A9B2E] italic">adapt, grow, <br className="hidden sm:inline" />and thrive.</span>
                  </h1>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-xl">
                    STC uses a person-centered approach to mental health empowerment, personal development, and practical life skills so individuals can move forward with greater confidence in both professional and personal settings.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <button
                      onClick={() => setActiveTab("classes")}
                      className="px-8 py-3.5 bg-[#0B2E67] hover:bg-[#15407f] text-white font-semibold rounded-full shadow-lg shadow-[#0B2E67]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      Explore Programs <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveTab("transportation")}
                      className="px-8 py-3.5 bg-[#5A9B2E] hover:bg-[#4a8126] text-white font-semibold rounded-full shadow-lg shadow-[#5A9B2E]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      Request Transportation
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Mail className="w-4 h-4 text-[#5A9B2E]" />
                    <span>Official email: <a href="mailto:stcmhep@gmail.com" className="text-[#0B2E67] hover:underline font-semibold">stcmhep@gmail.com</a></span>
                  </div>
                </div>
                
                {/* Hero Image Matching Live Site Layout */}
                <div className="md:col-span-5 relative">
                  <div className="absolute -left-4 -bottom-4 w-full h-full rounded-[30px] bg-[#5A9B2E]/10" />
                  <div className="relative aspect-[4/3] rounded-[30px] overflow-hidden border border-[#0B2E67]/5 shadow-2xl bg-slate-100">
                    <img 
                      src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800" 
                      alt="STC Support Group" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Our Mission Section - Recreated to match the screenshot layout exactly */}
            <section className="py-20 bg-[#F6FAF7] border-y border-[#0B2E67]/5">
              <div className="container max-w-6xl mx-auto px-4 grid md:grid-cols-12 gap-12 items-center">
                <div className="md:col-span-6 space-y-3">
                  <span className="text-[#5A9B2E] font-bold text-xs uppercase tracking-widest block">Our Mission</span>
                  <h2 className="text-3xl md:text-[38px] font-sans font-extrabold text-[#0B2E67] leading-snug">
                    Empowering people to understand themselves, direct their behavior, and create lasting progress.
                  </h2>
                </div>
                
                <div className="md:col-span-6 flex gap-6">
                  <div className="w-14 h-14 rounded-full bg-[#5A9B2E]/10 text-[#5A9B2E] flex items-center justify-center shrink-0 shadow-sm">
                    <Compass className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-serif font-bold text-2xl text-[#0B2E67]">Our Mission</h3>
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      The mission of the STC Mental Health Awareness & Empowerment Program is to strengthen mental wellness, personal development, and the ability to adapt and thrive across professional and personal environments.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Four Pillars */}
            <section className="py-20">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="text-center max-w-xl mx-auto mb-16">
                  <span className="text-[#5A9B2E] text-xs font-bold uppercase tracking-widest mb-2 block">Pillars of the Program</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2E67]">Four areas that support sustainable growth</h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { num: "01", title: "Mind", desc: "Participants learn how thoughts, beliefs, and interpretations influence emotion and behavior. The goal is to strengthen self-awareness and challenge assumptions." },
                    { num: "02", title: "Behaviors", desc: "Growth becomes visible through repeated action. Participants identify habits that support or undermine their goals and practice constructive responses." },
                    { num: "03", title: "Self-Perception", desc: "How a person sees themselves affects what they believe is possible. STC promotes realistic confidence, identity development, and accountability." },
                    { num: "04", title: "Action", desc: "Insight is translated into measurable steps. Participants create goal-based plans, build support systems, and practice consistent follow-through." }
                  ].map((pillar) => (
                    <div key={pillar.num} className="bg-white border border-[#0B2E67]/10 p-8 rounded-[20px] shadow-sm relative overflow-hidden group hover:border-[#5A9B2E]/50 transition-colors duration-300">
                      <span className="absolute right-4 top-2 font-serif font-black text-5xl text-[#0B2E67]/5 group-hover:text-[#5A9B2E]/10 transition-colors">{pillar.num}</span>
                      <h3 className="text-xl font-serif font-bold text-[#0B2E67] mb-4">{pillar.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "about" && (
          <section className="py-20">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[#5A9B2E] text-xs font-bold uppercase tracking-widest mb-2 block">About STC</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2E67]">Who We Are & What We Believe</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5A9B2E]/10 text-[#5A9B2E] flex items-center justify-center shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-2">Our Mission</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        The mission of the STC Mental Health Awareness & Empowerment Program is to strengthen mental wellness, personal development, and the ability to adapt and thrive across professional and personal environments.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5A9B2E]/10 text-[#5A9B2E] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-2">Our Approach</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Our person-centered approach supports each participant in identifying their strengths, recognizing unhelpful thought and behavior patterns, and developing practical strategies for healthier decision-making. Program activities are informed by rational-emotive and behavioral principles that connect beliefs, emotions, choices, and outcomes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F6FAF7] border border-[#5A9B2E]/20 p-8 rounded-[24px]">
                  <h3 className="font-serif font-bold text-xl text-[#0B2E67] mb-4">Our Founders</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    STC Mental Health Awareness & Empowerment Program was founded by Victor and Alanna Searcy on a person-centered belief: that people grow best when they are supported in understanding themselves, directing their own behavior, and taking practical steps forward.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-[#0B2E67]/10 p-4 rounded-xl">
                      <div className="font-serif font-bold text-sm text-[#0B2E67]">Victor Searcy</div>
                      <div className="text-[11px] font-bold text-[#5A9B2E] uppercase mt-0.5">Founder</div>
                    </div>
                    <div className="bg-white border border-[#0B2E67]/10 p-4 rounded-xl">
                      <div className="font-serif font-bold text-sm text-[#0B2E67]">Alanna Searcy</div>
                      <div className="text-[11px] font-bold text-[#5A9B2E] uppercase mt-0.5">Founder</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "classes" && (
          <section className="py-20 bg-slate-50">
            <div className="container max-w-6xl mx-auto px-4">
              <div className="text-center max-w-xl mx-auto mb-16">
                <span className="text-[#5A9B2E] text-xs font-bold uppercase tracking-widest mb-2 block">Our Classes</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2E67]">Practical classes for personal and professional development</h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Cooking & Life Skills", desc: "Meal preparation, planning, confidence in the kitchen, teamwork, food safety, and healthy routines." },
                  { title: "Anger Management", desc: "Recognizing triggers, regulating reactions, improving communication, and choosing constructive responses." },
                  { title: "Work Efficacy", desc: "Professional habits, reliability, workplace communication, problem-solving, adaptability, and performance." },
                  { title: "Finance, Budgeting & Investments", desc: "Budget development, saving, credit awareness, responsible spending, risk, and introductory investing concepts." },
                  { title: "Self-Care", desc: "Building routines that protect emotional, physical, social, and spiritual wellness without neglecting responsibilities." },
                  { title: "Identity Development", desc: "Exploring values, strengths, purpose, personal narratives, culture, roles, and future direction." },
                  { title: "Managing Emotions", desc: "Understanding emotional signals, reducing impulsive responses, and applying coping and regulation strategies." },
                  { title: "Corporate Leadership", desc: "Communication, accountability, emotional intelligence, team development, decision-making, and ethical leadership." }
                ].map((cls, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:border-[#5A9B2E]/30 transition-colors">
                    <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-3">{cls.title}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{cls.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "transportation" && (
          <section className="py-20">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                  <span className="text-[#5A9B2E] text-xs font-bold uppercase tracking-widest mb-2 block">Transportation Assistance</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2E67] mb-6">Community Transportation Program</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    Eligible individuals may submit a request for transportation support. Approved transportation may be arranged through a third-party rideshare provider such as Lyft, subject to program availability, funding, eligibility, and provider terms.
                  </p>

                  <div className="bg-[#F6FAF7] border border-[#5A9B2E]/20 p-6 rounded-2xl">
                    <h3 className="font-serif font-bold text-base text-[#0B2E67] mb-4">Eligible needs may include:</h3>
                    <ul className="space-y-3">
                      {["Employment and job-related appointments", "Education and training", "Housing-related appointments", "Senior assistance and essential services"].map((need, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <div className="w-5 h-5 rounded-full bg-[#5A9B2E]/20 text-[#5A9B2E] flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          {need}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-[#FFFBEB] border-l-4 border-amber-500 p-4 rounded-xl mt-6 flex gap-3 text-amber-800 text-xs">
                      <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Form Request Only.</strong>
                        <p className="mt-0.5">Verbal requests will not be recognized or processed.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#0B2E67]/10 p-8 rounded-3xl shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-6">Submit Ride Request</h3>
                  <form onSubmit={handleTransportSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Your Name *</label>
                        <Input
                          required
                          value={transportForm.name}
                          onChange={(e) => setTransportForm({ ...transportForm, name: e.target.value })}
                          className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Phone *</label>
                        <Input
                          required
                          value={transportForm.phone}
                          onChange={(e) => setTransportForm({ ...transportForm, phone: e.target.value })}
                          className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email Address</label>
                      <Input
                        type="email"
                        value={transportForm.email}
                        onChange={(e) => setTransportForm({ ...transportForm, email: e.target.value })}
                        className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pick-up Location *</label>
                      <Input
                        required
                        value={transportForm.pickup}
                        onChange={(e) => setTransportForm({ ...transportForm, pickup: e.target.value })}
                        placeholder="Street Address"
                        className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Drop-off Destination *</label>
                      <Input
                        required
                        value={transportForm.dropoff}
                        onChange={(e) => setTransportForm({ ...transportForm, dropoff: e.target.value })}
                        placeholder="Clinic, Workplace, School, etc."
                        className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Reason for Ride Request</label>
                      <Textarea
                        value={transportForm.reason}
                        onChange={(e) => setTransportForm({ ...transportForm, reason: e.target.value })}
                        rows={3}
                        className="bg-[#F6FAF7]/50 border-slate-100 text-xs"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#0B2E67] hover:bg-[#15407f] text-white rounded-full h-11 text-xs font-bold uppercase tracking-widest">
                      Submit Ride Request
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "donate" && (
          <section className="py-20">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="text-[#5A9B2E] text-xs font-bold uppercase tracking-widest mb-2 block">Support Our Work</span>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0B2E67] mb-6">Your gift keeps our programs within reach</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    STC classes and community support are offered to the people who need them most. Donations help us run classes, keep the Community Transportation Program moving, and reach more families, neighborhoods, and workplaces.
                  </p>

                  <div className="space-y-4">
                    {[
                      { t: "Classes & workshops", d: "Materials, facilitators, and space for the eight classes — from cooking to corporate leadership." },
                      { t: "Community transportation", d: "Rides to employment, education, housing, and essential appointments for those in need." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 p-4 border border-slate-100 rounded-xl bg-[#F6FAF7]/30">
                        <div className="w-10 h-10 bg-[#5A9B2E]/10 rounded-full flex items-center justify-center text-[#5A9B2E] shrink-0 font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-[#0B2E67]">{item.t}</h4>
                          <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{item.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-[#0B2E67]/10 p-8 rounded-3xl shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-6 text-center">Secure Donation Portal</h3>

                  <form onSubmit={handleDonateSubmit} className="space-y-6">
                    {/* Donation Frequency Toggles */}
                    <div className="flex bg-[#F6FAF7] border border-slate-100 p-1 rounded-full">
                      <button
                        type="button"
                        onClick={() => setIsMonthly(false)}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer transition-colors ${
                          !isMonthly ? "bg-[#0B2E67] text-white" : "text-slate-600 hover:text-[#0B2E67]"
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMonthly(true)}
                        className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-full cursor-pointer transition-colors ${
                          isMonthly ? "bg-[#0B2E67] text-white" : "text-slate-600 hover:text-[#0B2E67]"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    {/* Amount Chips Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {["10", "25", "50", "100", "250"].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => {
                            setSelectedDonation(amt);
                            setCustomDonation("");
                          }}
                          className={`py-3 border font-serif font-bold text-sm rounded-xl cursor-pointer transition-all ${
                            selectedDonation === amt
                              ? "border-[#5A9B2E] bg-[#5A9B2E]/10 text-[#5A9B2E]"
                              : "border-slate-100 text-[#0B2E67] hover:border-slate-200"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setSelectedDonation("custom")}
                        className={`py-3 border font-serif font-bold text-sm rounded-xl cursor-pointer transition-all ${
                          selectedDonation === "custom"
                            ? "border-[#5A9B2E] bg-[#5A9B2E]/10 text-[#5A9B2E]"
                            : "border-slate-100 text-[#0B2E67] hover:border-slate-200"
                        }`}
                      >
                        Custom
                      </button>
                    </div>

                    {/* Custom Input */}
                    {selectedDonation === "custom" && (
                      <div className="space-y-1">
                        <label className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Enter Custom Amount ($)</label>
                        <Input
                          type="number"
                          value={customDonation}
                          onChange={(e) => setCustomDonation(e.target.value)}
                          placeholder="e.g. 150"
                          className="bg-slate-50 border-slate-100 text-sm"
                        />
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-[#5A9B2E] hover:bg-[#4a8126] text-white rounded-full h-12 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#5A9B2E]/25">
                      Donate ${selectedDonation === "custom" ? customDonation || "..." : selectedDonation} {isMonthly ? "/ Month" : ""}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="py-20">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                <div className="bg-[#0B2E67] text-white p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute right-[-50px] bottom-[-50px] w-48 h-48 rounded-full bg-[#5A9B2E]/15 blur-3xl pointer-events-none" />
                  <h3 className="font-serif font-bold text-2xl mb-6 text-white">Get in touch</h3>
                  <p className="text-slate-200 text-sm leading-relaxed mb-8">
                    Whether you are an individual seeking classes, a donor looking to support our cause, or a venue representative interested in partnerships — we would love to hear from you.
                  </p>

                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#A8D672]" />
                      <span>Official Email: stcmhep@gmail.com</span>
                    </div>
                    <div className="text-[#A8D672] font-semibold text-xs border border-white/10 p-4 rounded-xl">
                      In crisis or need to talk right now? Call or text 988 — the Suicide & Crisis Lifeline, available 24/7.
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                  <h3 className="font-serif font-bold text-lg text-[#0B2E67] mb-6">Send a Message</h3>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Your Name</label>
                      <Input
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="bg-slate-50 border-slate-100 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email Address</label>
                      <Input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="bg-slate-50 border-slate-100 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Message</label>
                      <Textarea
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows={4}
                        className="bg-slate-50 border-slate-100 text-xs"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#0B2E67] hover:bg-[#15407f] text-white rounded-full h-11 text-xs font-bold uppercase tracking-widest">
                      <Send className="w-4 h-4 mr-2" /> Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#061a3b] text-white/80 py-12 border-t border-white/5">
        <div className="container max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-sm">
          <div>
            <h4 className="font-serif font-bold text-white text-base mb-4">STC Mental Health</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Person-centered growth for personal, professional, and community wellness.
            </p>
            <div className="text-xs text-[#A8D672] font-semibold mt-4">
              Official Email: stcmhep@gmail.com
            </div>
          </div>
          <div>
            <h5 className="font-bold text-[#A8D672] uppercase text-xs tracking-wider mb-4">Programs</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Our Mission</li>
              <li>Pillars of the Program</li>
              <li>Keys to Growth</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#A8D672] uppercase text-xs tracking-wider mb-4">Classes</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Work Efficacy</li>
              <li>Corporate Leadership</li>
              <li>Finance & Budgeting</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-[#A8D672] uppercase text-xs tracking-wider mb-4">Community</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Transportation Support</li>
              <li>Donate Online</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-xs text-slate-500">
          &copy; 2026 STC Mental Health Awareness & Empowerment Program. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
