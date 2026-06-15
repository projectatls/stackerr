'use client';
import { useState } from 'react';

const DATASET = [
  { id: 1, title: "I will deploy advanced Make.com automated workflows for outbound nodes", category: "Automation", curator: "WorkflowMaster", rating: "5.0", reviews: 48, price: "Free Trial", badge: "Vetted Pro", imgGradient: "from-blue-600 to-indigo-900", featured: true },
  { id: 2, title: "I will generate pristine React and Tailwind code modules instantly using v0", category: "Development", curator: "VercelDev", rating: "4.9", reviews: 132, price: "Freemium", badge: "Top Rated", imgGradient: "from-purple-900 to-neutral-900", featured: false },
  { id: 3, title: "I will enrich outbound pipeline targets using multi-provider Clay matrices", category: "Lead Gen", curator: "GrowthHacker", rating: "5.0", reviews: 29, price: "$29/mo", badge: "Vetted Pro", imgGradient: "from-emerald-800 to-teal-950", featured: true },
  { id: 4, title: "I will configure low-latency postgres clusters with automated Supabase sync", category: "Database", curator: "DB_Architect", rating: "4.8", reviews: 64, price: "Free Tier", badge: "Level 2", imgGradient: "from-cyan-950 to-slate-900", featured: false },
  { id: 5, title: "I will engineer complex codebases inside context-aware Cursor AI spaces", category: "Development", curator: "CodeAgent", rating: "5.0", reviews: 215, price: "$20/mo", badge: "Top Rated", imgGradient: "from-orange-700 to-red-950", featured: false },
  { id: 6, title: "I will scrape custom target demographics using automated Phantom agents", category: "Lead Gen", curator: "PhantomScrape", rating: "4.7", reviews: 19, price: "Free Trial", badge: "Level 1", imgGradient: "from-fuchsia-900 to-pink-950", featured: false },
];

const CATEGORIES = ["All Services", "Automation", "Development", "Lead Gen", "Database"];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Services');

  const filteredData = DATASET.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All Services' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0a0b10] text-[#e4e6eb] font-sans antialiased flex flex-col">
      
      {/* FIVERR-INSPIRED DARK TOP NAVIGATION HEADER */}
      <nav className="sticky top-0 z-50 bg-[#0a0b10] border-b border-neutral-800/80 h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <span className="text-xl font-black tracking-tight text-white select-none">
            stackerr<span className="text-emerald-500">.</span>
          </span>
          {/* Sub-menu text options from image_aefe44.jpg perspective */}
          <span className="text-xs text-neutral-400 font-medium hidden xl:inline-block border-l border-neutral-800 pl-6">
            Explore AI Core Matrix
          </span>
        </div>

        {/* FIVERR VERBATIM SEARCH INPUT BAR PLACEHOLDER */}
        <div className="flex flex-1 max-w-xl mx-8">
          <div className="flex w-full bg-[#141622] border border-neutral-800 rounded px-4 py-2 focus-within:border-emerald-500 transition-all">
            <input
              type="text"
              placeholder="What service or stack are you looking for today?..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold text-neutral-400 hover:text-white cursor-pointer transition-colors hidden md:inline-block">
            Become a Seller
          </span>
          <button 
            onClick={() => alert('Launching Stripe Checkout Subsystem...')}
            className="border border-emerald-500 hover:bg-emerald-500 hover:text-black text-emerald-400 font-bold text-xs px-4 py-2 rounded transition-all active:scale-95"
          >
            Join / Post Gig ($15)
          </button>
        </div>
      </nav>

      {/* HORIZONTAL FIVERR-STYLE SUB-NAV SUB-CATEGORIES BAR */}
      <div className="bg-[#0e1017] border-b border-neutral-900 px-6 py-2.5 flex gap-6 overflow-x-auto text-xs text-neutral-400 font-medium scrollbar-none select-none">
        {CATEGORIES.map((cat) => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer whitespace-nowrap transition-colors pb-0.5 ${
              activeCategory === cat ? 'text-emerald-400 border-b-2 border-emerald-400 font-bold' : 'hover:text-white'
            }`}
          >
            {cat}
          </span>
        ))}
      </div>

      {/* DASHBOARD HERO LAYOUT SECTION */}
      <main className="max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Pick up where you left off
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Hand-vetted automation nodes and structural engineering blueprints for creators.
          </p>
        </div>

        {/* FIVERR-FORMATTED FLEX GIG GRID MATRIX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
          {filteredData.map((item) => (
            <div 
              key={item.id} 
              className="group bg-[#121420] border border-neutral-900 hover:border-neutral-800 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-200"
            >
              
              {/* CARD MEDIA DISPLAY THUMBNAIL */}
              <div className="w-full aspect-[16/10] relative overflow-hidden bg-neutral-900 shrink-0">
                <div className={`w-full h-full bg-gradient-to-tr ${item.imgGradient} opacity-60 group-hover:opacity-80 transition-opacity flex items-center justify-center p-4`}>
                  <span className="text-white font-mono text-[10px] tracking-widest uppercase bg-black/40 px-2 py-1 rounded border border-white/5">
                    {item.category}
                  </span>
                </div>
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-emerald-500 text-black font-black text-[9px] tracking-wider uppercase px-2 py-0.5 rounded shadow">
                    PRO CHOICE
                  </span>
                )}
              </div>

              {/* CARD CORE BODY DATA */}
              <div className="p-3 flex flex-col gap-2 flex-1 justify-between">
                
                {/* SELLER METADATA CONTAINER */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300">
                    {item.curator.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white leading-none hover:underline cursor-pointer">{item.curator}</span>
                    <span className="text-[10px] text-neutral-500 font-medium mt-0.5">{item.badge}</span>
                  </div>
                </div>

                {/* ACTIONABLE SERVICE GIG TITLE */}
                <p className="text-xs text-neutral-300 font-normal leading-normal line-clamp-2 group-hover:text-emerald-400 transition-colors cursor-pointer">
                  {item.title}
                </p>

                {/* TRUST STAR RATINGS AND REVIEW COUNTS */}
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                  <span>★</span>
                  <span>{item.rating}</span>
                  <span className="text-neutral-500 font-normal text-[11px]">({item.reviews})</span>
                </div>

                {/* FOOTER CONTAINER: PRICING METRIC */}
                <div className="border-t border-neutral-900 mt-2 pt-2.5 flex items-center justify-between font-mono text-[11px]">
                  <span className="text-neutral-500 uppercase tracking-widest text-[9px]">PLAN</span>
                  <div className="text-right">
                    <span className="text-neutral-500 text-[10px] block font-sans font-medium leading-none">From</span>
                    <span className="text-white font-bold text-xs block mt-0.5">{item.price}</span>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
