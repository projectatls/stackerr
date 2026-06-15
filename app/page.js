'use client';
import { useState } from 'react';

const DATASET = [
  // SECTION 1: MOST VISITED AI MODELS
  { id: 1, title: "Automated Roof Damage Analysis & Drone Inspection Engine", category: "Property AI", curator: "RoofAI Labs", rating: "5.0", reviews: 1420, price: "$49/mo", badge: "Most Visited", img: "https://images.unsplash.com/photo-1631651412411-9252329fb44b?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 2, title: "Context-Aware Neural Code Autocomplete & Repository Refactoring", category: "Development", curator: "CursorForge", rating: "4.9", reviews: 3102, price: "$20/mo", badge: "Trending", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 3, title: "Multi-Source Lead Enrichment Matrix & B2B Pipeline Scraper", category: "Lead Gen", curator: "ClayScale", rating: "5.0", reviews: 984, price: "$149/mo", badge: "Top Rated", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 4, title: "Autonomous Real Estate Assessment & Commercial Property Valuation", category: "Property AI", curator: "SiteInspect", rating: "4.8", reviews: 755, price: "$89/mo", badge: "Most Visited", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60", section: "visited" },

  // SECTION 2: FREE AI ASSETS
  { id: 5, title: "Zero-Cost Next.js React Element Engine & Tailwind Builder", category: "Development", curator: "v0 OpenLabs", rating: "4.9", reviews: 843, price: "FREE", badge: "Free Tier", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60", section: "free" },
  { id: 6, title: "Open-Source Relational Postgres Storage System & Edge Sync", category: "Database", curator: "SupaBase OSS", rating: "4.8", reviews: 612, price: "FREE", badge: "Free Tier", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60", section: "free" },
  { id: 7, title: "No-Code Workflow Node Integration & API Webhook Proxy", category: "Automation", curator: "MakeFree", rating: "4.7", reviews: 219, price: "FREE", badge: "Free Tier", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60", section: "free" },

  // SECTION 3: BUNDLED STACK PLANS
  { id: 8, title: "Full Scale Outbound Engine (Clay Matrix + Make Workflows + Phantom Scraping)", category: "Bundles", curator: "EnterpriseOps", rating: "5.0", reviews: 112, price: "$199/mo", badge: "Stack Bundle", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60", section: "bundle" },
  { id: 9, title: "Complete Dev Environment (Cursor Subsystem + Supabase Cluster + v0 Engine)", category: "Bundles", curator: "DevStack Corp", rating: "4.9", reviews: 94, price: "$35/mo", badge: "Stack Bundle", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60", section: "bundle" },
];

const CATEGORIES = ["All Systems", "Property AI", "Development", "Lead Gen", "Database", "Automation", "Bundles"];

export default function Home() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Systems');
  const [funnelStep, setFunnelStep] = useState('closed');
  const [selectedPromo, setSelectedPromo] = useState('standard');

  const filteredData = DATASET.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All Systems' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c10] via-[#060709] to-[#020203] text-[#e4e6eb] font-sans antialiased flex flex-col pb-24">
      
      {/* PREMIUM CONSUMER NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#0b0c10]/90 backdrop-blur-lg border-b border-white/[0.04] h-16 flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black tracking-tight text-white select-none cursor-pointer" onClick={() => setActiveCategory('All Systems')}>
            stackerr<span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">.</span>
          </span>
          <span className="text-xs text-neutral-400 font-semibold hidden lg:inline-block border-l border-white/[0.08] pl-6 tracking-wide">
            Marketplace for Autonomous AI Models
          </span>
        </div>

        {/* MODERN USER-FRIENDLY SEARCH MATRIX */}
        <div className="flex flex-1 max-w-xl mx-8">
          <div className="flex w-full bg-[#161823] border border-white/[0.06] rounded-full px-5 py-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/10 transition-all shadow-md">
            <input
              type="text"
              placeholder="Search specialized models, architecture bundles, or niches..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span 
            onClick={() => setFunnelStep('login')}
            className="text-xs font-bold text-neutral-400 hover:text-white cursor-pointer transition-colors hidden md:inline-block"
          >
            Sign In
          </span>
          <button 
            onClick={() => setFunnelStep('login')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_14px_rgba(16,185,129,0.2)]"
          >
            + List Your AI ($15)
          </button>
        </div>
      </nav>

      {/* CATEGORY CONTAINER CAPSULES */}
      <div className="bg-[#060709]/60 backdrop-blur-md border-b border-white/[0.02] px-6 py-3 flex gap-3 overflow-x-auto select-none scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all ${
              activeCategory === cat 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black shadow-md' 
                : 'bg-[#12141c] text-neutral-400 hover:text-white hover:bg-[#1a1d29]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MODAL USER INTAKE FLOW */}
      {funnelStep !== 'closed' && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f111a] border border-white/[0.06] rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button 
              onClick={() => setFunnelStep('closed')}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white text-base transition-colors"
            >
              ✕
            </button>

            {funnelStep === 'login' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-extrabold text-white tracking-tight">Create your Stackerr Account</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Join thousands of engineers and indexing operations scaling distribution pipelines globally.</p>
                <div className="flex flex-col gap-2.5 mt-2">
                  <input type="email" placeholder="Developer Email Address" className="bg-[#171a26] border border-white/[0.05] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors" defaultValue="founder@domain.ai" />
                  <input type="password" placeholder="Access Password" className="bg-[#171a26] border border-white/[0.05] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors" defaultValue="••••••••••••" />
                </div>
                <button 
                  onClick={() => setFunnelStep('promote')}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs py-3 rounded-xl mt-2 transition-all shadow-lg shadow-emerald-500/10"
                >
                  Continue to Listing Options ➔
                </button>
              </div>
            )}

            {funnelStep === 'promote' && (
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-extrabold text-white tracking-tight">Select Promotion Package</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">Elevate your product's daily visibility tier inside the main discovery matrices.</p>
                
                <div className="flex flex-col gap-2.5 mt-1">
                  <div 
                    onClick={() => setSelectedPromo('standard')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedPromo === 'standard' ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.05)]' : 'bg-[#171a26] border-white/[0.04]'}`}
                  >
                    <div className="flex justify-between font-bold text-xs text-white">
                      <span>Standard Listing</span>
                      <span className="text-emerald-400 font-extrabold">$15 Fix</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">Permanently indexed under chosen category architecture.</p>
                  </div>

                  <div 
                    onClick={() => setSelectedPromo('premium')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${selectedPromo === 'premium' ? 'bg-purple-500/10 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.05)]' : 'bg-[#171a26] border-white/[0.04]'}`}
                  >
                    <div className="flex justify-between font-bold text-xs text-white">
                      <span>Most Visited Priority Boost</span>
                      <span className="text-purple-400 font-extrabold">$39 / mo</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">Pins your application configuration straight to the main hero grids.</p>
                  </div>
                </div>

                <button 
                  onClick={() => { alert('Routing securely to billing dashboard node...'); setFunnelStep('closed'); }}
                  className="bg-white text-black font-bold text-xs py-3 rounded-xl mt-2 transition-all hover:bg-neutral-200"
                >
                  Proceed to Secure Checkout ↗
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CONTENT AREA GRID ARRAY */}
      <div className="max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-14">
        
        {/* SECTION 1: MOST VISITED AI MODELS */}
        { (activeCategory === 'All Systems' || activeCategory === 'Property AI' || activeCategory === 'Development' || activeCategory === 'Lead Gen') && (
          <section className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></span>
                Most Visited AI Implementations
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5 font-medium">The high-efficiency tools generating the most activity across the network this week.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.filter(i => i.section === 'visited').map((item) => (
                <RenderCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: FREE AI ASSETS */}
        { (activeCategory === 'All Systems' || activeCategory === 'Development' || activeCategory === 'Database' || activeCategory === 'Automation') && (
          <section className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                Open Access & Free Tier Hubs
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5 font-medium">Zero cost configurations ready to drop straight into operational systems.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.filter(i => i.section === 'free').map((item) => (
                <RenderCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: BUNDLED STACK PLANS */}
        { (activeCategory === 'All Systems' || activeCategory === 'Bundles') && (
          <section className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-extrabold tracking-tight text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]"></span>
                Pre-Configured Architecture Bundles
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5 font-medium">Curated multi-tool tech pipelines designed to operate effortlessly out of the box.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData.filter(i => i.section === 'bundle').map((item) => (
                <div key={item.id} className="group bg-[#0e1017] border border-white/[0.04] hover:border-purple-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg">
                  <div className="w-full aspect-video relative overflow-hidden bg-neutral-900">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-black/20 to-transparent"></div>
                    <span className="absolute bottom-3 left-3 bg-purple-600/90 backdrop-blur-md text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-white/10">
                      System Bundle
                    </span>
                  </div>
                  <div className="p-4 flex flex-col gap-4 justify-between flex-1">
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors leading-snug cursor-pointer">{item.title}</h3>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.03] text-xs">
                      <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Engine by {item.curator}</span>
                      <div className="text-right">
                        <span className="text-white font-extrabold text-sm">{item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

// PREMIUM REUSABLE MARKET CARD
function RenderCard({ item }) {
  return (
    <div className="group bg-[#0e1017] border border-white/[0.04] hover:border-white/[0.12] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
      
      {/* PERFECTLY PROPORTIONED IMAGE FIELD */}
      <div className="w-full aspect-[16/10] relative overflow-hidden bg-neutral-900 shrink-0">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <span className="absolute bottom-2.5 left-2.5 bg-black/70 backdrop-blur-md text-neutral-200 text-[9px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full border border-white/[0.06]">
          {item.category}
        </span>
      </div>

      {/* INSIGHTFUL CONTENT METADATA CONTAINER */}
      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        
        {/* PLATFORM ARCHITECT METRICS */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-[11px] font-black text-black shadow-inner">
            {item.curator.charAt(0)}
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xs font-bold text-white hover:underline cursor-pointer">{item.curator}</span>
            <span className="text-[10px] text-neutral-500 font-medium mt-0.5 tracking-wide">{item.badge}</span>
          </div>
        </div>

        {/* RESTRUCTURED SYSTEM OBJECTIVES */}
        <p className="text-xs text-neutral-200 font-semibold leading-relaxed line-clamp-2 group-hover:text-emerald-400 transition-colors cursor-pointer">
          {item.title}
        </p>

        {/* SATURATED RATING COMPONENT */}
        <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
          <span>★</span>
          <span>{item.rating}</span>
          <span className="text-neutral-500 font-medium text-[11px]">({item.reviews})</span>
        </div>

        {/* CRISP FOOTER VALUATION MATRICES */}
        <div className="border-t border-white/[0.03] mt-1 pt-3 flex items-center justify-between text-xs">
          <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-wider">Access</span>
          <div className="text-right">
            <span className="text-emerald-400 font-extrabold text-sm">{item.price}</span>
          </div>
        </div>

      </div>

    </div>
  );
}
