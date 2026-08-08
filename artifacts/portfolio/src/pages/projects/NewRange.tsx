import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Search, ShoppingCart, Trash2, Plus, Minus, Check, Star, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import newrangeLogoImg from "../../assets/newrange_logo.png";

const productsData = [
  { id: "p1", name: "Timbren SES Kit Front Dodge 1/2 Ton 06-19", brand: "Timbren", category: "Suspension", price: 269.36, desc: "Suspension Enhancement System designed to improve load capacity and roll stability." },
  { id: "p2", name: "REDARC Tow-Pro Liberty Electric Brake Controller", brand: "REDARC", category: "Electronics", price: 190.00, desc: "EBRH-ACCNA brake controller designed for inertia-sensing trailer braking applications." },
  { id: "p3", name: "EDGE Insight CTS3 Universal OBD-II Monitoring", brand: "EDGE", category: "Electronics", price: 511.95, desc: "84130-3 digital gauge display offering real-time diagnostic parameters on-screen." },
  { id: "p4", name: "BOXO USA Adventure Motorcycle Tool Kit", brand: "Boxo", category: "Tools", price: 285.00, desc: "40-Piece Compact Tool Roll featuring high-durability metrics tools." },
  { id: "p5", name: "BOXO USA UTV Tool Roll 66-Piece Tool Kit", brand: "Boxo", category: "Tools", price: 385.00, desc: "Heavy-duty off-road tools specifically sized for side-by-side trail adjustments." },
  { id: "p6", name: "BOXO USA Heavy Duty Off-Road Tool Bag Roll", brand: "Boxo", category: "Tools", price: 550.00, desc: "80-Piece comprehensive tool set stored in a rugged canvas roll-up bag." }
];

export default function NewRange() {
  const [cart, setCart] = useState<Array<{ id: string; name: string; price: number; qty: number }>>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleAddToCart = (product: typeof productsData[0]) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(cart.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }]);
    }
    toast.success("Added to cart!", {
      description: `${product.brand} - ${product.name.slice(0, 30)}... added successfully.`,
    });
  };

  const handleQtyChange = (id: string, dir: "inc" | "dec") => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const qty = dir === "inc" ? item.qty + 1 : item.qty - 1;
            return { ...item, qty };
          }
          return item;
        })
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const totalItems = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
  const totalPrice = useMemo(() => cart.reduce((acc, item) => acc + item.qty * item.price, 0), [cart]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    toast.success("Subscribed to newsletter!", {
      description: `Updates will be sent to ${newsletterEmail}. Thank you!`,
    });
    setNewsletterEmail("");
  };

  const handleCheckout = () => {
    toast.success("Checkout Successful!", {
      description: `Your order of ${totalItems} items ($${totalPrice.toFixed(2)}) has been processed.`,
    });
    setCart([]);
    setCartOpen(false);
  };

  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
        const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="bg-[#131117] min-h-screen text-white font-sans selection:bg-[#DD1A3F] selection:text-white pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#131117] border-b border-white/10 py-4 shadow-md">
        <div className="container max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" className="text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer p-0 h-auto">
                <ArrowLeft className="w-4.5 h-4.5" /> Back
              </Button>
            </Link>
            <div className="w-px h-6 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 h-10">
              <img src={newrangeLogoImg} alt="New Range LLC Logo" className="h-8 object-contain" />
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-md hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search truck upgrades, suspension, electronics..."
              className="pl-9 bg-[#1b1921] border-white/10 text-xs text-white placeholder:text-neutral-500 rounded-lg focus-visible:ring-[#DD1A3F]"
            />
          </div>

          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 bg-[#1b1921] hover:bg-neutral-800 rounded-full border border-white/10 transition-colors cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#DD1A3F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 relative bg-gradient-to-b from-[#1b1921] to-[#131117]">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <span className="text-[#DD1A3F] text-xs font-bold uppercase tracking-widest mb-4 block">Established 2024</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">Expanding Possibilities</h1>
          <p className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Your go-to source for high-quality aftermarket car & truck parts, performance upgrades, off-road accessories and outdoor gear. Based in Utah, built for the trail.
          </p>
        </div>
      </section>

      {/* Catalog & Filter Grid */}
      <section className="py-8">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
            {/* Category Selectors */}
            <div className="flex gap-2 flex-wrap">
              {["All", "Suspension", "Electronics", "Tools"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#DD1A3F] border-[#DD1A3F] text-white"
                      : "border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-neutral-400 text-xs">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#1b1921] border border-white/10 text-xs p-2.5 rounded-lg text-white focus:outline-none focus:border-[#DD1A3F]"
              >
                <option value="default">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-[#1b1921] border border-white/10 rounded-xl p-6 flex flex-col justify-between hover:border-[#DD1A3F]/50 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#DD1A3F] text-[10px] font-mono font-bold uppercase">{p.brand}</span>
                    <span className="text-[#DD1A3F] font-bold text-sm font-mono">${p.price.toFixed(2)}</span>
                  </div>
                  <h3 className="font-bold text-base text-white mb-2 leading-tight">{p.name}</h3>
                  <p className="text-neutral-400 text-xs leading-relaxed mb-6">{p.desc}</p>
                </div>
                <Button
                  onClick={() => handleAddToCart(p)}
                  className="w-full bg-white text-[#131117] hover:bg-[#DD1A3F] hover:text-white rounded-lg py-2.5 text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Newsletter */}
      <section className="py-20 bg-[#1b1921] border-y border-white/5">
        <div className="container max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[#DD1A3F]" /> Our Mission
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Based in Utah and founded in 2024, our mission is simple: help you find the best parts, at the best prices, with the best service. Whether you're upgrading your ride, gearing up for your next outdoor adventure, or looking for top-quality bike, ATV, or UTV accessories, we've got you covered!
            </p>
            <div className="text-neutral-500 text-xs font-bold uppercase">
              Team NEW RANGE LLC
            </div>
          </div>

          <div className="bg-[#131117] border border-white/10 p-8 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#DD1A3F]" /> Newsletter Updates
            </h3>
            <p className="text-neutral-400 text-xs mb-6">
              Subscribe to receive emails on new product arrivals &amp; special offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email address"
                className="bg-[#1b1921] border-white/10 text-xs"
              />
              <Button type="submit" className="bg-[#DD1A3F] hover:bg-[#d81c22] text-white rounded-lg text-xs font-bold uppercase tracking-wider px-5">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[#DD1A3F] text-xs font-bold uppercase tracking-widest mb-2 block">Verified Reviews</span>
            <h2 className="text-3xl font-bold text-white">Finally found a store I can trust</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Michael R.", review: "I've ordered truck accessories from a lot of places, but NewRangeOnline has been the most reliable by far. The product quality is solid, prices are fair, and shipping was faster than expected." },
              { name: "Daniel K.", review: "I bought a few outdoor accessories, and they arrived right when the tracking said they would. The packaging was careful, and the products feel durable. I'll definitely shop again." }
            ].map((t, idx) => (
              <div key={idx} className="bg-[#1b1921] border border-white/10 p-6 rounded-xl relative">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6">"{t.review}"</p>
                <div className="font-bold text-xs text-white">{t.name}</div>
                <div className="text-neutral-500 text-[10px] uppercase font-bold mt-0.5">Verified Buyer</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Cart Slider Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="bg-[#1b1921] border-l border-white/10 w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl"
            >
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-6">
                  <h3 className="font-bold text-lg text-white">Your Cart ({totalItems})</h3>
                  <button onClick={() => setCartOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer text-sm font-bold">
                    Close
                  </button>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center gap-4 p-4 border border-white/5 bg-[#131117] rounded-lg">
                        <div>
                          <h4 className="font-bold text-xs leading-tight text-white mb-1">{item.name}</h4>
                          <span className="font-mono text-xs text-[#DD1A3F] font-bold">${item.price.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex border border-white/10 p-0.5 items-center">
                            <button onClick={() => handleQtyChange(item.id, "dec")} className="p-1 hover:text-white text-neutral-400">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono text-xs">{item.qty}</span>
                            <button onClick={() => handleQtyChange(item.id, "inc")} className="p-1 hover:text-white text-neutral-400">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => handleRemoveFromCart(item.id)} className="text-neutral-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-neutral-500 text-sm">
                      Your shopping cart is empty.
                    </div>
                  )}
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-white/10 pt-6 space-y-4">
                  <div className="flex justify-between font-mono text-sm font-bold text-white">
                    <span>Subtotal:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Button onClick={handleCheckout} className="w-full bg-[#DD1A3F] hover:bg-[#d81c22] text-white rounded-lg h-12 text-xs font-bold uppercase tracking-widest">
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
