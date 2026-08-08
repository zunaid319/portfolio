import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Check, Flame, MapPin, Award, ShieldAlert, FileText, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const menuPlatforms = [
  {
    category: "Signature Sandwiches",
    items: [
      { name: "Cleveland Hot Chicken Sandwich", desc: "The sandwich that built the brand — our signature Cleveland hot chicken, voted the #1 chicken sandwich.", tag: "Award Winner", price: "$14", prepTime: "2.5 mins", ingredients: "Cleveland hot chicken breast, home-style slaw, pickles, signature sauce, toasted brioche bun" },
      { name: "Kool Ranch Crispy Chicken", desc: "The hero platform — the crave-driven crunch guests seek out, topped with our custom ranch blend.", tag: "Operator Favorite", price: "$13", prepTime: "2 mins", ingredients: "Crispy chicken breast, lettuce, tomato, house ranch dressing, brioche bun" },
      { name: "Cilantro Buffalo Chicken", desc: "A flavor-forward variant that widens guest demographic appeal with a tangy, fresh finish.", tag: "Customer Crave", price: "$13", prepTime: "2 mins", ingredients: "Crispy chicken breast, fresh cilantro, tang buffalo sauce, garlic aioli, brioche bun" },
      { name: "Honey BBQ Chicken Sandwich", desc: "Sweet-heat glaze profile that drives high volume and repeat game-day concession purchases.", tag: "High Volume", price: "$13", prepTime: "2 mins", ingredients: "Crispy chicken breast, sweet honey BBQ glaze, cheddar cheese, pickles, brioche bun" }
    ]
  },
  {
    category: "Sides & Shareables",
    items: [
      { name: "Loaded Hot Chicken Fries", desc: "High-margin attachment built for stadium shareability and rapid fryer-to-basket serving.", tag: "Max Margin", price: "$11", prepTime: "1.5 mins", ingredients: "Crispy fries, chopped hot chicken, melted cheese sauce, pickles, ranch drizzle" },
      { name: "Crispy Chicken Tenders", desc: "Cross-utilized protein platform — flexible across concession formats and quick-service dayparts.", tag: "Core Platform", price: "$12", prepTime: "1.5 mins", ingredients: "3x premium chicken breast tenders, choice of STC signature dipping sauces" },
      { name: "Game-Day Wings", desc: "An event-day volume driver with broad demographic pull. Quick flash-fry and toss operations.", tag: "Volume Driver", price: "$15", prepTime: "2.5 mins", ingredients: "6x crispy wings, tossed in choice of Cleveland Hot, Buffalo, or Honey BBQ sauce" }
    ]
  }
];

export default function SauceTheCity() {
  const [activeTab, setActiveTab] = useState("home");
  const [menuTab, setMenuTab] = useState("Signature Sandwiches");
  const [selectedMenuItem, setSelectedMenuItem] = useState<typeof menuPlatforms[0]["items"][0] | null>(null);
  const [partnerForm, setPartnerForm] = useState({ name: "", company: "", email: "", phone: "", venueType: "Stadium", message: "" });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerForm.name || !partnerForm.company || !partnerForm.email) {
      toast.error("Please fill out all required fields.");
      return;
    }
    toast.success("Partnership Inquiry Received!", {
      description: `Thank you ${partnerForm.name} from ${partnerForm.company}. Our licensing team will contact you shortly.`,
    });
    setPartnerForm({ name: "", company: "", email: "", phone: "", venueType: "Stadium", message: "" });
  };

  return (
    <div className="bg-white min-h-screen text-[#23252B] font-sans selection:bg-[#E0241B] selection:text-white pb-24">
      {/* Import Barlow Condensed font dynamically */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&display=swap');
        .font-barlow {
          font-family: 'Barlow Condensed', sans-serif !important;
        }
      `}} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0C0D10]/95 backdrop-blur-md py-4 border-b border-white/5">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:text-[#F6B53C] flex items-center gap-2 cursor-pointer p-0 font-barlow font-bold uppercase tracking-wider text-base h-auto">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            </Link>
            <div className="w-px h-6 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab("home")}>
              <div className="bg-[#E0241B] text-white px-3 py-1 font-barlow font-extrabold text-2xl uppercase tracking-wider">
                SAUCE <span>THE CITY</span>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#F6B53C]" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {[
              { id: "home", label: "Home" },
              { id: "why", label: "Why STC" },
              { id: "venues", label: "Venue Portfolio" },
              { id: "airport", label: "Concessions" },
              { id: "menu", label: "Menu Strategy" },
              { id: "contact", label: "Partnership" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-barlow font-bold text-base uppercase tracking-wider transition-colors cursor-pointer ${
                  activeTab === tab.id ? "text-[#F6B53C]" : "text-white/80 hover:text-[#F6B53C]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setActiveTab("contact")}
            className="px-6 py-2 bg-[#E0241B] hover:bg-[#B81910] text-white font-barlow font-bold uppercase tracking-wider transition-all rounded-[4px] cursor-pointer shadow-lg shadow-[#E0241B]/20"
          >
            Request Info
          </button>
        </div>
      </header>

      {/* Main Sections */}
      <main>
        {activeTab === "home" && (
          <>
            {/* Hero Banner */}
            <section className="relative min-h-[80vh] flex items-center bg-[#0C0D10] text-white overflow-hidden py-24">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(224,36,27,0.15)_0%,transparent_70%)] pointer-events-none" />
              <div className="container max-w-5xl mx-auto px-4 relative z-10">
                <span className="font-barlow font-bold text-lg uppercase tracking-widest text-[#F6B53C] block mb-4">
                  ★ Partnership-Ready · NFL · NBA · MLB
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-barlow font-extrabold uppercase leading-[0.9] tracking-tight mb-8">
                  A Venue-Ready <br />
                  <span className="text-[#F6B53C]">Food Concept</span> Built <br />
                  for High-Volume
                </h1>
                <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
                  Sauce The City is a multi-platform foodservice brand engineered for stadiums, airports, and entertainment venues — and for the concession operators, venue managers, and hospitality groups who run them.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setActiveTab("contact")}
                    className="px-8 py-4 bg-[#E0241B] hover:bg-[#B81910] text-white font-barlow font-bold text-lg uppercase tracking-wider transition-all rounded-[4px]"
                  >
                    Request Partnership Info
                  </button>
                  <button
                    onClick={() => setActiveTab("menu")}
                    className="px-8 py-4 border-2 border-white/40 hover:border-white text-white font-barlow font-bold text-lg uppercase tracking-wider transition-all rounded-[4px]"
                  >
                    Explore Menu Strategy
                  </button>
                </div>
              </div>
            </section>

            {/* Statistics Band */}
            <section className="bg-[#0C0D10] border-t-4 border-[#E0241B] text-white py-16">
              <div className="container max-w-6xl mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                  <div className="py-6 md:py-0">
                    <h3 className="font-barlow font-extrabold text-5xl md:text-6xl text-white mb-2">3 VENUES</h3>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Pro Stadium Concessions</p>
                  </div>
                  <div className="py-6 md:py-0">
                    <h3 className="font-barlow font-extrabold text-5xl md:text-6xl text-[#F6B53C] mb-2">MILLIONS</h3>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Of Stadium Guests Welcomed</p>
                  </div>
                  <div className="py-6 md:py-0">
                    <h3 className="font-barlow font-extrabold text-5xl md:text-6xl text-white mb-2">HIGH-VOL</h3>
                    <p className="text-white/60 text-sm uppercase tracking-widest font-bold">Engineered Concession Kitchen</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === "why" && (
          <section className="py-20 bg-white">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="max-w-3xl mb-16">
                <span className="font-barlow font-bold text-base uppercase tracking-widest text-[#E0241B] mb-2 block">Operator Benefits</span>
                <h2 className="text-4xl md:text-5xl font-barlow font-extrabold uppercase text-[#0C0D10] mb-4">
                  A Brand That Performs in the Toughest Rooms
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  Everything about Sauce The City is built for hospitality partners who need speed, consistency, and guest satisfaction at massive scale.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { id: "01", t: "Established Identity", d: "A recognizable, crave-driven brand guests actively seek out — driving concourse traffic." },
                  { id: "02", t: "Proven Experience", d: "Live, game-day operations inside NFL, NBA, and MLB venues with zero system outages." },
                  { id: "03", t: "Flexible Deployment", d: "Full stands, grab-and-go kiosks, carts, and virtual brands. Sized to fit your square footage." },
                  { id: "04", t: "Streamlined Operations", d: "Simplified menu architecture and labor models designed to optimize throughput under peak rushes." },
                  { id: "05", t: "Strong Guest Appeal", d: "Premium crispy sandwiches and loaded baskets that increase average guest transactions." },
                  { id: "06", t: "Operator Friendly", d: "An efficient equipment lineup and cross-utilized ingredients that reduce food waste." }
                ].map((card) => (
                  <div key={card.id} className="border border-[#E7E2D9] p-8 rounded-lg hover:border-transparent hover:shadow-2xl transition-all duration-300">
                    <div className="w-11 h-11 bg-[#E0241B] rounded flex items-center justify-center text-white font-barlow font-extrabold text-lg mb-6">
                      {card.id}
                    </div>
                    <h3 className="font-barlow font-bold text-xl uppercase tracking-wider text-[#0C0D10] mb-3">{card.t}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{card.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "venues" && (
          <section className="py-20 bg-[#FBF8F3]">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="font-barlow font-bold text-base uppercase tracking-widest text-[#E0241B] mb-2 block">Trusted Experience</span>
                <h2 className="text-4xl md:text-5xl font-barlow font-extrabold uppercase text-[#0C0D10] mb-4">
                  Proven Where Volume Is Non-Negotiable
                </h2>
                <p className="text-slate-600">
                  Sauce The City operates concessions inside major-league sports venues. We don't guess high-volume capacity; we run it.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {[
                  { league: "NFL", name: "Huntington Bank Field", desc: "Cleveland Browns · Game-day concessions" },
                  { league: "NBA", name: "Rocket Mortgage FieldHouse", desc: "Cleveland Cavaliers · Arena foodservice" },
                  { league: "MLB", name: "Progressive Field", desc: "Cleveland Guardians · Club Level Concessions" }
                ].map((venue, idx) => (
                  <div key={idx} className="bg-white border border-[#E7E2D9] p-8 rounded-lg shadow-sm">
                    <span className="inline-block bg-[#0C0D10] text-[#F6B53C] font-barlow font-bold text-xs uppercase px-3 py-1 mb-6 rounded-sm">
                      {venue.league}
                    </span>
                    <h3 className="font-barlow font-bold text-2xl uppercase tracking-wider text-[#0C0D10] mb-2">{venue.name}</h3>
                    <p className="text-slate-500 text-xs font-semibold">{venue.desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-center text-[10px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Sauce The City operates concession locations within these venues. All team, venue, and league names are the property of their respective owners and are used for identification purposes only; their use does not imply endorsement or affiliation.
              </p>
            </div>
          </section>
        )}

        {activeTab === "airport" && (
          <section className="py-20 bg-white">
            <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="font-barlow font-bold text-base uppercase tracking-widest text-[#E0241B] mb-2 block">Airport Concessions</span>
                <h2 className="text-4xl md:text-5xl font-barlow font-extrabold uppercase text-[#0C0D10] mb-6">
                  Airport Ready. Operator Friendly.
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Engineered to deploy into travel hubs and airport terminal concourses without complex retrofitting or labor models.
                </p>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-8">
                  {["Small Footprint Kiosks", "High Throughput Kitchens", "Simplified Cooking Lines", "Staffing Efficiency", "Quick-Service Layouts", "Craveable Grab-and-Go"].map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#0C0D10]">
                      <div className="w-5 h-5 rounded-full bg-[#E0241B]/10 text-[#E0241B] flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#0C0D10] text-white p-8 rounded-lg border-t-4 border-[#F6B53C]">
                <h3 className="font-barlow font-bold text-xl uppercase tracking-wider text-[#F6B53C] mb-4">High Performance Specs</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Our concession models are optimized around the metrics operators care about most: ticket average, speed of transaction, and ingredient cross-utilization.
                </p>
                <div className="border-l-2 border-[#E0241B] pl-4 text-xs text-white/50 italic">
                  Detailed performance statistics are shared during partnership discussions under NDA.
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "menu" && (
          <section className="py-20 bg-[#FBF8F3]">
            <div className="container max-w-5xl mx-auto px-4">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="font-barlow font-bold text-base uppercase tracking-widest text-[#E0241B] mb-2 block">Menu Strategy</span>
                <h2 className="text-4xl md:text-5xl font-barlow font-extrabold uppercase text-[#0C0D10] mb-4">
                  High-Velocity Food Platforms
                </h2>
                <p className="text-slate-600">
                  Click any menu platform item below to inspect detailed ingredients and prep specifications.
                </p>
              </div>

              {/* Menu Categories Tabs */}
              <div className="flex justify-center gap-4 border-b border-[#E7E2D9] mb-8">
                {menuPlatforms.map((platform) => (
                  <button
                    key={platform.category}
                    onClick={() => setMenuTab(platform.category)}
                    className={`pb-3 font-barlow font-bold text-lg uppercase tracking-wider cursor-pointer border-b-2 transition-all ${
                      menuTab === platform.category ? "border-[#E0241B] text-[#E0241B]" : "border-transparent text-slate-500"
                    }`}
                  >
                    {platform.category}
                  </button>
                ))}
              </div>

              {/* Menu Grid */}
              <div className="grid md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  {menuPlatforms.find((p) => p.category === menuTab)?.items.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => setSelectedMenuItem(item)}
                      className={`p-6 border rounded-lg cursor-pointer bg-white transition-all ${
                        selectedMenuItem?.name === item.name
                          ? "border-[#E0241B] shadow-md"
                          : "border-[#E7E2D9] hover:border-slate-300"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block bg-[#F6B53C]/10 text-[#E0241B] text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm">
                          {item.tag}
                        </span>
                        <span className="font-barlow font-bold text-lg text-[#0C0D10]">{item.price}</span>
                      </div>
                      <h4 className="font-barlow font-bold text-xl uppercase tracking-wider text-[#0C0D10] mb-1">{item.name}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Detail Panel */}
                <div className="bg-white border border-[#E7E2D9] p-8 rounded-lg shadow-sm min-h-[300px] flex flex-col justify-between">
                  {selectedMenuItem ? (
                    <div>
                      <div className="flex items-center gap-2 text-[#E0241B] mb-4">
                        <Flame className="w-5 h-5 fill-current" />
                        <span className="font-barlow font-bold text-lg uppercase tracking-wider">Kitchen Spec</span>
                      </div>
                      <h3 className="font-barlow font-extrabold text-2xl uppercase tracking-wider text-[#0C0D10] mb-3">
                        {selectedMenuItem.name}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-6">
                        {selectedMenuItem.desc}
                      </p>
                      
                      <div className="space-y-4 text-xs">
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-400 font-bold uppercase">Estimated Ticket:</span>
                          <span className="font-bold text-[#0C0D10]">{selectedMenuItem.price}</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-100 pb-2">
                          <span className="text-slate-400 font-bold uppercase">Target Serving Time:</span>
                          <span className="font-bold text-[#E0241B]">{selectedMenuItem.prepTime}</span>
                        </div>
                        <div className="pt-2">
                          <span className="text-slate-400 font-bold uppercase block mb-1">Standard Ingredients:</span>
                          <span className="text-slate-700 leading-relaxed block">{selectedMenuItem.ingredients}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center py-12">
                      <Award className="w-12 h-12 text-[#F6B53C] mb-4" />
                      <p className="text-slate-500 font-barlow font-bold text-lg uppercase tracking-wider">
                        Select a Menu Platform item to view specifications
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "contact" && (
          <section className="py-20 bg-white">
            <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12">
              <div>
                <span className="font-barlow font-bold text-base uppercase tracking-widest text-[#E0241B] mb-2 block">Licensing & Operations</span>
                <h2 className="text-4xl md:text-5xl font-barlow font-extrabold uppercase text-[#0C0D10] mb-6">
                  Bring STC to Your Next Location
                </h2>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Whether you operate arenas, airports, university campuses, casinos, or entertainment venues — let's explore licensing or partnership options to drive concession returns.
                </p>

                <div className="bg-[#0C0D10] text-white p-6 rounded-lg space-y-3 text-sm">
                  <div className="flex items-center gap-3 text-white">
                    <MapPin className="w-5 h-5 text-[#F6B53C]" />
                    <span>Licensing HQ: Cleveland, OH</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <FileText className="w-5 h-5 text-[#F6B53C]" />
                    <span>Contact: stclicensing@gmail.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#FBF8F3] border border-[#E7E2D9] p-8 rounded-lg shadow-sm">
                <h3 className="font-barlow font-bold text-xl uppercase tracking-wider text-[#0C0D10] mb-6">Partnership Questionnaire</h3>
                <form onSubmit={handlePartnerSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Contact Name *</label>
                      <Input
                        required
                        value={partnerForm.name}
                        onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                        className="bg-white border-[#E7E2D9] text-xs h-10"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Company / Group *</label>
                      <Input
                        required
                        value={partnerForm.company}
                        onChange={(e) => setPartnerForm({ ...partnerForm, company: e.target.value })}
                        className="bg-white border-[#E7E2D9] text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Email Address *</label>
                      <Input
                        required
                        type="email"
                        value={partnerForm.email}
                        onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                        className="bg-white border-[#E7E2D9] text-xs h-10"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Phone</label>
                      <Input
                        value={partnerForm.phone}
                        onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                        className="bg-white border-[#E7E2D9] text-xs h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Target Venue Type</label>
                    <select
                      value={partnerForm.venueType}
                      onChange={(e) => setPartnerForm({ ...partnerForm, venueType: e.target.value })}
                      className="w-full bg-white border border-[#E7E2D9] p-2 text-xs rounded-sm focus-visible:outline-[#E0241B]"
                    >
                      <option value="Stadium">Stadium / Arena</option>
                      <option value="Airport">Airport Terminal</option>
                      <option value="University">University Campus</option>
                      <option value="Other">Other Hospitality Footprint</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-500 text-xs font-bold uppercase tracking-wider">Tell us about your project</label>
                    <Textarea
                      value={partnerForm.message}
                      onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                      rows={3}
                      className="bg-white border-[#E7E2D9] text-xs"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#E0241B] hover:bg-[#B81910] text-white rounded-[4px] h-11 text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#E0241B]/20">
                    <Send className="w-4 h-4 mr-2" /> Request Partnership Details
                  </Button>
                </form>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#08090C] text-white/50 py-16 border-t border-white/5 text-sm">
        <div className="container max-w-6xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="font-barlow font-extrabold text-xl text-white uppercase mb-4">
              SAUCE <span>THE CITY</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">
              A venue-ready foodservice brand built for high-volume environments — partnering with operators and venue developers nationwide.
            </p>
          </div>
          <div>
            <h5 className="font-barlow font-bold uppercase text-white tracking-wider text-base mb-4">Company</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("why")}>Why Sauce The City</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("venues")}>Venue Portfolio</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("menu")}>Menu Strategy</li>
            </ul>
          </div>
          <div>
            <h5 className="font-barlow font-bold uppercase text-white tracking-wider text-base mb-4">Licensing</h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("airport")}>Airport Opportunities</li>
              <li className="hover:text-white cursor-pointer" onClick={() => setActiveTab("contact")}>Partnership Terms</li>
            </ul>
          </div>
          <div>
            <h5 className="font-barlow font-bold uppercase text-white tracking-wider text-base mb-4">Contact</h5>
            <div className="text-xs text-[#F6B53C] font-semibold">
              stclicensing@gmail.com
            </div>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto px-4 border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs">
          <span>&copy; 2026 Sauce The City. All rights reserved.</span>
          <span className="text-white/30 mt-2 sm:mt-0">Concept site — for licensing inquiries.</span>
        </div>
      </footer>
    </div>
  );
}
