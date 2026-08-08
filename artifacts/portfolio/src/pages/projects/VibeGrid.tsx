import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Heart, MessageCircle, Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Preset feed grid cards
const initialPosts = [
  { id: 1, title: "CYBERPUNK HOODIE", caption: "Heavyweight terry cotton oversize hoodie. Drop 01 available midnight.", likes: 840, comments: ["Insane quality!", "Need this in black ASAP", "Price?"], gradient: "from-[#ff2c2c] to-[#4f1a12]" },
  { id: 2, title: "LUNAR CAP", caption: "Structured 6-panel cap with reflective embroidery accents.", likes: 420, comments: ["Copped!", "Reflective details are nice"], gradient: "from-[#94732b] to-neutral-900" },
  { id: 3, title: "CARGO OVERPANTS", caption: "Water-resistant techwear cargos featuring utility buckles.", likes: 1102, comments: ["Fit is perfect", "Is it true to size?"], gradient: "from-[#6191cc] to-[#4f1a12]" },
  { id: 4, title: "SAGE TEE", caption: "Organic heavy cotton drop shoulder tee. Earth tones only.", likes: 630, comments: ["Clean colorway", "Earth tones are life"], gradient: "from-[#636329] to-neutral-950" },
  { id: 5, title: "VIBE BELT", caption: "Industrial magnetic buckle webbed belt.", likes: 310, comments: ["Buckle detail is crazy"], gradient: "from-neutral-800 to-black" },
  { id: 6, title: "KINETIC TOTE", caption: "Durable ripstop nylon shoulder bag with modular attachment points.", likes: 580, comments: ["Utility focus is great"], gradient: "from-[#c2380d] to-[#241f21]" },
];

const gridThemes = [
  { name: "Cyberpunk Red", key: "cyber", desc: "Aggressive red & dark grey highlight tones" },
  { name: "Brand Oasis", key: "oasis", desc: "Warm gold & pale yellow premium earth theme" },
  { name: "Monochrome", key: "mono", desc: "Charcoal, black, and slate grey minimalist theme" },
];

export default function VibeGrid() {
  const [posts, setPosts] = useState(initialPosts);
  const [activeTheme, setActiveTheme] = useState<"cyber" | "oasis" | "mono">("cyber");
  const [selectedPost, setSelectedPost] = useState<typeof initialPosts[0] | null>(null);
  const [newComment, setNewComment] = useState("");
  
  // States for simulate new post
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostCaption, setNewPostCaption] = useState("");

  // Select gradient based on active grid theme
  const getGradient = (post: typeof initialPosts[0]) => {
    if (activeTheme === "mono") {
      return "from-neutral-700 to-neutral-950";
    }
    if (activeTheme === "oasis") {
      return "from-[#94732b] to-[#fae0b2]";
    }
    return post.gradient;
  };

  const handleLike = (id: number) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
    if (selectedPost && selectedPost.id === id) {
      setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
    }
    toast.success("Post liked!");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !selectedPost) return;

    const updatedPosts = posts.map((p) => {
      if (p.id === selectedPost.id) {
        const comments = [...p.comments, newComment.trim()];
        return { ...p, comments };
      }
      return p;
    });

    setPosts(updatedPosts);
    setSelectedPost({
      ...selectedPost,
      comments: [...selectedPost.comments, newComment.trim()],
    });
    setNewComment("");
    toast.success("Comment added!");
  };

  const handleSimulatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostCaption.trim()) {
      toast.error("Please fill in both fields to simulate a post.");
      return;
    }

    const newPost = {
      id: Date.now(),
      title: newPostTitle.trim().toUpperCase(),
      caption: newPostCaption.trim(),
      likes: 0,
      comments: [],
      gradient: "from-[#fae0b2] to-[#241f21]",
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostCaption("");
    toast.success("New mock post prepended to the grid!");
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans pb-24 relative">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 z-50">
        <div className="container h-full mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="text-neutral-400 hover:text-white flex items-center gap-2 cursor-pointer">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Button>
          </Link>
          <span className="font-serif text-lg tracking-wider text-primary">Vibe Culture Grid</span>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Social Layout Showcase</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Instagram Planner Grid</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            An interactive social feed design system for streetwear branding. Switch layout grid themes, simulate writing comments, and add custom mock posts to see how the overall feed flow updates.
          </p>
        </div>
      </section>

      {/* Control Board & Sandbox Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Left Column: Customization Sidebar */}
            <div className="space-y-8">
              {/* Theme Selector */}
              <div className="bg-neutral-900/50 p-6 border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Grid Theme Selection</h3>
                <div className="flex flex-col gap-3">
                  {gridThemes.map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => setActiveTheme(theme.key as any)}
                      className={`w-full text-left p-4 border transition-all cursor-pointer rounded-none ${
                        activeTheme === theme.key
                          ? "border-primary bg-primary/10"
                          : "border-white/10 hover:border-white/20 bg-black/30"
                      }`}
                    >
                      <h4 className="font-bold text-sm text-white mb-1">{theme.name}</h4>
                      <p className="text-neutral-500 text-xs">{theme.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Mock Post simulator */}
              <div className="bg-neutral-900/50 p-6 border border-white/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Simulate New Post</h3>
                <form onSubmit={handleSimulatePost} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">Product / Title</label>
                    <Input
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      placeholder="e.g. Core Cap"
                      className="bg-black/50 border-white/10 h-10 text-sm rounded-none focus-visible:ring-primary focus-visible:border-primary text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-neutral-500 text-[10px] uppercase font-bold tracking-wider">Feed Caption</label>
                    <Input
                      value={newPostCaption}
                      onChange={(e) => setNewPostCaption(e.target.value)}
                      placeholder="e.g. Heavy cotton cap..."
                      className="bg-black/50 border-white/10 h-10 text-sm rounded-none focus-visible:ring-primary focus-visible:border-primary text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-white text-black hover:bg-primary hover:text-primary-foreground h-11 text-xs font-bold uppercase rounded-none transition-colors">
                    <Plus className="w-4 h-4 mr-1.5" /> Prepend to Grid
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column: Dynamic Feed Grid */}
            <div className="lg:col-span-2 bg-neutral-950 border border-white/5 p-6">
              <div className="mb-6 flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-neutral-400 text-xs font-mono">@vibe.culture.archive</span>
                <span className="text-neutral-500 text-xs font-mono">{posts.length} Posts</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    layoutId={`post-card-${post.id}`}
                    onClick={() => setSelectedPost(post)}
                    className="relative aspect-square border border-white/5 overflow-hidden group cursor-pointer"
                  >
                    {/* Visual gradient mockup */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(post)}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:10px_10px]" />
                    
                    {/* Hover detail overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-xs font-bold font-mono">
                      <span className="text-white text-[10px] tracking-widest">{post.title}</span>
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-current" /> {post.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {post.comments.length}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Detail slide-over / Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              layoutId={`post-card-${selectedPost.id}`}
              className="bg-neutral-900 border border-white/10 w-full max-w-2xl overflow-hidden rounded-none flex flex-col md:flex-row aspect-auto"
            >
              {/* Left Side: Gradient Image Area */}
              <div className={`w-full md:w-1/2 aspect-square relative bg-gradient-to-br ${getGradient(selectedPost)}`}>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:15px_15px]" />
                <div className="absolute bottom-6 left-6 font-serif font-bold text-2xl tracking-wide">{selectedPost.title}</div>
              </div>

              {/* Right Side: Comments and Interactions Panel */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between max-h-[400px] md:max-h-none">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-bold tracking-widest text-primary font-mono uppercase">Feed Details</span>
                    <button onClick={() => setSelectedPost(null)} className="text-neutral-500 hover:text-white cursor-pointer">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Caption */}
                  <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-mono">
                    {selectedPost.caption}
                  </p>

                  <hr className="border-white/5 mb-6" />

                  {/* Likes and likes counter */}
                  <div className="flex items-center gap-4 mb-6">
                    <button
                      onClick={() => handleLike(selectedPost.id)}
                      className="flex items-center gap-1.5 text-xs font-bold font-mono text-neutral-400 hover:text-primary transition-colors cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-primary text-primary" /> {selectedPost.likes} Likes
                    </button>
                    <span className="text-xs font-mono text-neutral-500">
                      {selectedPost.comments.length} Comments
                    </span>
                  </div>

                  {/* Comments list area */}
                  <div className="space-y-3 max-h-36 overflow-y-auto mb-6 pr-2">
                    {selectedPost.comments.map((comment, index) => (
                      <div key={index} className="text-xs leading-relaxed font-mono">
                        <span className="text-primary mr-1.5 font-bold">@visitor:</span>
                        <span className="text-neutral-300">{comment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comment input form */}
                <form onSubmit={handleAddComment} className="flex gap-2 border-t border-white/5 pt-4">
                  <Input
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="bg-black/50 border-white/10 text-xs h-9 rounded-none focus-visible:ring-primary focus-visible:border-primary text-white"
                  />
                  <Button type="submit" size="icon" className="w-9 h-9 bg-white text-black hover:bg-primary hover:text-primary-foreground rounded-none shrink-0 transition-colors">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
