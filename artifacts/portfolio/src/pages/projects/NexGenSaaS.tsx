import { useState, useMemo } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Filter, RefreshCw, Layers, TrendingUp } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Mock database metrics data for different ranges
const metricsData = {
  "7D": [
    { name: "Mon", Users: 800, Revenue: 2100 },
    { name: "Tue", Users: 950, Revenue: 2400 },
    { name: "Wed", Users: 900, Revenue: 2200 },
    { name: "Thu", Users: 1100, Revenue: 2800 },
    { name: "Fri", Users: 1200, Revenue: 3100 },
    { name: "Sat", Users: 1050, Revenue: 2700 },
    { name: "Sun", Users: 1150, Revenue: 3000 },
  ],
  "30D": [
    { name: "Week 1", Users: 3200, Revenue: 9500 },
    { name: "Week 2", Users: 4100, Revenue: 11200 },
    { name: "Week 3", Users: 3800, Revenue: 10800 },
    { name: "Week 4", Users: 5200, Revenue: 14800 },
  ],
  "90D": [
    { name: "Month 1", Users: 14000, Revenue: 38000 },
    { name: "Month 2", Users: 18500, Revenue: 51000 },
    { name: "Month 3", Users: 23000, Revenue: 67000 },
  ],
};

const mockTransactions = [
  { id: "TX-1001", client: "Acme Corp", email: "billing@acme.com", status: "Paid", amount: "$1,200", date: "Aug 08, 2026" },
  { id: "TX-1002", client: "Delta LLC", email: "accounting@delta.io", status: "Paid", amount: "$850", date: "Aug 07, 2026" },
  { id: "TX-1003", client: "Vortex Inc", email: "finance@vortex.com", status: "Pending", amount: "$2,100", date: "Aug 06, 2026" },
  { id: "TX-1004", client: "Sphere Agency", email: "hello@sphere.design", status: "Paid", amount: "$150", date: "Aug 05, 2026" },
  { id: "TX-1005", client: "Pinnacle Co", email: "pinnacle@billing.net", status: "Failed", amount: "$620", date: "Aug 03, 2026" },
];

export default function NexGenSaaS() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D">("7D");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter transactions based on search query
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(
      (tx) =>
        tx.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard metrics refreshed!");
    }, 1000);
  };

  const processPayout = (id: string) => {
    toast.success(`Processing action for transaction ${id}`);
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
          <span className="font-serif text-lg tracking-wider text-primary">NexGen SaaS App</span>
        </div>
      </header>

      {/* Hero Intro */}
      <section className="pt-32 pb-12 relative">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl relative z-10">
          <span className="text-primary text-xs font-bold tracking-widest uppercase mb-4 block">Web App UI Showcase</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">NexGen SaaS Dashboard</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            An interactive UI design built for a B2B analytics platform. This mockup demonstrates responsive layouts, data grids, real-time charts, and customizable date ranges.
          </p>
        </div>
      </section>

      {/* Main Dashboard Sandbox */}
      <section className="py-8">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Dashboard Control Bar */}
          <div className="bg-neutral-950 border border-white/5 p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg">Interactive Analytics Portal</h2>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap">
              {/* Timeframe selector */}
              <div className="flex bg-neutral-900 border border-white/10 p-1">
                {(["7D", "30D", "90D"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 text-xs font-bold uppercase transition-all cursor-pointer ${
                      timeRange === range
                        ? "bg-primary text-primary-foreground"
                        : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {/* Refresh button */}
              <Button
                variant="outline"
                size="sm"
                onClick={refreshData}
                disabled={loading}
                className="h-8 border-white/10 text-xs gap-1.5 uppercase font-bold rounded-none hover:bg-white/5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
              </Button>
            </div>
          </div>

          {/* Metric Stats Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-neutral-900/50 p-6 border border-white/5 hover:border-primary/20 transition-colors">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-2 block">Monthly Active Users</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold">14,230</span>
                <span className="text-xs text-green-500 flex items-center font-bold font-mono">
                  <TrendingUp className="w-3.5 h-3.5 inline mr-0.5" /> +8.4%
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/50 p-6 border border-white/5 hover:border-primary/20 transition-colors">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-2 block">Recurring Revenue</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold">$12,400</span>
                <span className="text-xs text-green-500 flex items-center font-bold font-mono">
                  <TrendingUp className="w-3.5 h-3.5 inline mr-0.5" /> +12.3%
                </span>
              </div>
            </div>

            <div className="bg-neutral-900/50 p-6 border border-white/5 hover:border-primary/20 transition-colors">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-2 block">Customer LTV</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold">$4,850</span>
                <span className="text-xs text-neutral-500 font-mono font-bold">Flat</span>
              </div>
            </div>

            <div className="bg-neutral-900/50 p-6 border border-white/5 hover:border-primary/20 transition-colors">
              <span className="text-xs text-neutral-400 uppercase tracking-wider mb-2 block">Demo Convert Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-serif font-bold">3.42%</span>
                <span className="text-xs text-green-500 flex items-center font-bold font-mono">
                  <TrendingUp className="w-3.5 h-3.5 inline mr-0.5" /> +1.8%
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Recharts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Chart 1: Active User Trends */}
            <div className="bg-neutral-900/50 p-6 border border-white/5">
              <h3 className="text-base font-bold mb-6 text-neutral-300 uppercase tracking-wider">
                User Acquisition ({timeRange})
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={metricsData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="userGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fae0b2" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#fae0b2" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#555" tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }} />
                    <Area type="monotone" dataKey="Users" stroke="#fae0b2" strokeWidth={2} fillOpacity={1} fill="url(#userGlow)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Revenue Influx */}
            <div className="bg-neutral-900/50 p-6 border border-white/5">
              <h3 className="text-base font-bold mb-6 text-neutral-300 uppercase tracking-wider">
                Revenue Influx ({timeRange})
              </h3>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metricsData[timeRange]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#555" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#555" tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid #333", color: "#fff" }} />
                    <Bar dataKey="Revenue" fill="#94732b" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Interactive Transaction Grid Table */}
          <div className="bg-neutral-900/50 border border-white/5 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-base font-bold uppercase tracking-wider">Recent Transactions</h3>
              
              {/* Search Bar */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search client/email..."
                  className="pl-9 bg-black/50 border-white/10 text-sm h-9 rounded-none focus-visible:ring-primary focus-visible:border-primary text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400">
                    <th className="py-3 px-4 font-medium uppercase text-xs">ID</th>
                    <th className="py-3 px-4 font-medium uppercase text-xs">Client</th>
                    <th className="py-3 px-4 font-medium uppercase text-xs">Email</th>
                    <th className="py-3 px-4 font-medium uppercase text-xs">Status</th>
                    <th className="py-3 px-4 font-medium uppercase text-xs text-right">Amount</th>
                    <th className="py-3 px-4 font-medium uppercase text-xs text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-4 font-mono text-xs">{tx.id}</td>
                        <td className="py-4 px-4 font-bold">{tx.client}</td>
                        <td className="py-4 px-4 text-neutral-400">{tx.email}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                              tx.status === "Paid"
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : tx.status === "Pending"
                                ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-white">{tx.amount}</td>
                        <td className="py-4 px-4 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => processPayout(tx.id)}
                            className="h-7 text-xs px-3 rounded-none uppercase font-bold text-neutral-400 hover:text-white hover:bg-white/5"
                          >
                            Process
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-8 px-4 text-center text-neutral-500">
                        No transactions match search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
