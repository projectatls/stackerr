'use client';
import { useState } from 'react';

const DATASET = [
  { id: 1, title: "Automated Roof Damage Analysis & Drone Inspection Engine", category: "Property AI", curator: "RoofAI Labs", rating: "5.0", reviews: 1420, price: "$49/mo", badge: "Ready to Run", img: "https://images.unsplash.com/photo-1631651412411-9252329fb44b?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 2, title: "Context-Aware Neural Code Autocomplete & Repository Refactoring", category: "Development", curator: "CursorForge", rating: "4.9", reviews: 3102, price: "$20/mo", badge: "Live Model", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 3, title: "Multi-Source Lead Enrichment Matrix & B2B Pipeline Scraper", category: "Lead Gen", curator: "ClayScale", rating: "5.0", reviews: 984, price: "$149/mo", badge: "Ready to Run", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 4, title: "Autonomous Real Estate Assessment & Commercial Property Valuation", category: "Property AI", curator: "SiteInspect", rating: "4.8", reviews: 755, price: "$89/mo", badge: "Live Model", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60", section: "visited" },
  { id: 5, title: "Zero-Cost Next.js React Element Engine & Tailwind Builder", category: "Development", curator: "v0 OpenLabs", rating: "4.9", reviews: 843, price: "LAUNCH FREE", badge: "Sandbox Active", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60", section: "free" },
  { id: 6, title: "Open-Source Relational Postgres Storage System & Edge Sync", category: "Database", curator: "SupaBase OSS", rating: "4.8", reviews: 612, price: "LAUNCH FREE", badge: "Sandbox Active", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60", section: "free" },
  { id: 7, title: "No-Code Workflow Node Integration & API Webhook Proxy", category: "Automation", curator: "MakeFree", rating: "4.7", reviews: 219, price: "LAUNCH FREE", badge: "Sandbox Active", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60", section: "free" },
  { id: 8, title: "Full Scale Outbound Engine (Clay Matrix + Make Workflows + Phantom Scraping)", category: "Bundles", curator: "EnterpriseOps", rating: "5.0", reviews: 112, price: "$199/mo bundle", badge: "Deploy Stack", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60", section: "bundle" },
  { id: 9, title: "Complete Dev Environment (Cursor Subsystem + Supabase Cluster + v0 Engine)", category: "Bundles", curator: "DevStack Corp", rating: "4.9", reviews: 94, price: "$35/mo bundle", badge: "Deploy Stack", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60", section: "bundle" },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [currentView, setCurrentView] = useState('all'); // all, visited, free, bundle, dashboard
  const [funnelStep, setFunnelStep] = useState('closed');
  
  // LIVE OWNED INVENTORY TRACKING SYSTEM STATE
  const [ownedModelIds, setOwnedModelIds] = useState([1, 2, 5]); // Default models tied to mock user profile
  const [selectedDashboardModelId, setSelectedDashboardModelId] = useState(1);
  const [showModelSwitcher, setShowModelSwitcher] = useState(false);
  
  // MULTI-AGENT DISCUSSION BLUEPRINT LOGS
  const [discussionMessages, setDiscussionMessages] = useState([
    { sender: "System Node", text: "Multi-Agent Broadcast Sandbox fully operational. Send a prompt to trigger a synchronized cluster response.", type: "system" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isCrosstalking, setIsCrosstalking] = useState(false);

  const filteredData = DATASET.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
    if (!matchesSearch) return false;
    if (currentView === 'all') return true;
    return item.section === currentView;
  });

  const acquireModel = (id) => {
    if (!ownedModelIds.includes(id)) {
      setOwnedModelIds(prev => [...prev, id]);
      alert("Model successfully initialized and tied to your Stackerr Core Account! Check your Dashboard Workspace.");
    } else {
      alert("This instance node is already running inside your dashboard network.");
    }
  };

  const handleGroupDiscussion = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: "You (Admin)", text: chatInput, type: "user" };
    setDiscussionMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsCrosstalking(true);

    // Simulate multi-agent processing response loop
    setTimeout(() => {
      const activeModels = DATASET.filter(m => ownedModelIds.includes(m.id));
      const newLogs = activeModels.map((m, idx) => ({
        sender: m.curator,
        text: `[Node Response to Prompt]: Analyzing parameters using localized matrix filters. Vector alignment clear.`,
        type: "agent"
      }));

      setDiscussionMessages(prev => [...prev, ...newLogs]);
      setIsCrosstalking(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0c10] via-[#050608] to-[#010102] text-[#e4e6eb] font-sans antialiased flex flex-col h-screen overflow-hidden">
      
      {/* BRAND HEADER MATRIX */}
      <nav className="bg-[#0b0c10] border-b border-white/[0.04] h-16 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black tracking-tight text-white select-none cursor-pointer" onClick={() => setCurrentView('all')}>
            stackerr<span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">.</span>
          </span>
          <span className="text-xs text-neutral-400 font-semibold hidden lg:inline-block border-l border-white/[0.08] pl-6 tracking-wide">
            Unified Agent Orchestration Interface
          </span>
        </div>

        {/* SEARCH DESCRIPTOR BAR */}
        <div className="flex flex-1 max-w-xl mx-8">
          <div className="flex w-full bg-[#151722] border border-white/[0.05] rounded-full px-5 py-2 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-400/10 transition-all">
            <input
              type="text"
              placeholder="Query localized configurations or specific application arrays..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-xs text-white placeholder-neutral-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${currentView === 'dashboard' ? 'bg-purple-600 text-white' : 'bg-white/5 text-purple-400 border border-purple-500/20 hover:bg-white/10'}`}
          >
            💻 Dashboard Workspace ({ownedModelIds.length})
          </button>
          <button 
            onClick={() => setFunnelStep('login')}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs px-5 py-2.5 rounded-full hover:brightness-110 transition-all"
          >
            + List Your AI ($15)
          </button>
        </div>
      </nav>

      {/* CORE WORKSPACE VIEW SPLIT SCREEN */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* STRUCTURAL LEFT SIDEBAR (No more blank space!) */}
        <aside className="w-64 bg-[#07080c] border-r border-white/[0.03] p-4 flex flex-col justify-between shrink-0 select-none">
          <div className="flex flex-col gap-1.5">
            <div className="text-neutral-500 font-bold text-[10px] uppercase tracking-wider px-3 mb-2">Discovery Hub</div>
            
            <button onClick={() => setCurrentView('all')} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === 'all' ? 'bg-white/5 text-emerald-400 border border-white/5' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
              🌐 All Running Systems
            </button>
            <button onClick={() => setCurrentView('visited')} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === 'visited' ? 'bg-white/5 text-emerald-400 border border-white/5' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
              🔥 Most Visited Engines
            </button>
            <button onClick={() => setCurrentView('free')} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === 'free' ? 'bg-white/5 text-emerald-400 border border-white/5' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
              🟢 Free Tier Sandboxes
            </button>
            <button onClick={() => setCurrentView('bundle')} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === 'bundle' ? 'bg-white/5 text-emerald-400 border border-white/5' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
              📦 Orchestrated Bundles
            </button>

            <div className="text-neutral-500 font-bold text-[10px] uppercase tracking-wider px-3 mt-6 mb-2">Private Instance Layer</div>
            <button onClick={() => setCurrentView('dashboard')} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === 'dashboard' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
              🧠 Active Workbench Workspace
            </button>
          </div>

          {/* SIDEBAR MOCK ACCOUNT INDICATOR */}
          <div className="p-3 bg-[#11131c]/50 border border-white/[0.03] rounded-xl flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-black font-black flex items-center justify-center text-xs">U</div>
            <div className="min-w-0">
              <span className="text-xs font-bold text-white block truncate">Admin Profile Node</span>
              <span className="text-[10px] text-neutral-500 block">Tier-1 Token Active</span>
            </div>
          </div>
        </aside>

        {/* MAIN DISPLAY CONTAINER */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-b from-[#090a0f] to-[#010102]">
          
          {currentView !== 'dashboard' ? (
            /* MARKETPLACE VIEW MODE */
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-xl font-black text-white tracking-tight capitalize">{currentView} Systems Marketplace</h1>
                <p className="text-xs text-neutral-400 mt-1">Initialize and deploy secure operational sandboxes straight to your centralized account dashboard profile block.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredData.map((item) => (
                  <div key={item.id} className="group bg-[#0e1017] border border-white/[0.04] hover:border-white/[0.12] rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl">
                    <div className="w-full aspect-[16/10] relative overflow-hidden bg-neutral-900">
                      <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute bottom-2.5 left-2.5 bg-black/80 backdrop-blur-sm text-neutral-200 text-[9px] font-bold tracking-wide uppercase px-2.5 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white leading-none">{item.curator}</span>
                        <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wider">{item.badge}</span>
                      </div>
                      <h3 className="text-xs text-neutral-200 font-semibold leading-relaxed line-clamp-2">{item.title}</h3>
                      
                      <div className="border-t border-white/[0.03] mt-1 pt-3 flex items-center justify-between text-xs">
                        <button 
                          onClick={() => acquireModel(item.id)}
                          className="bg-[#161823] hover:bg-emerald-500 hover:text-black text-neutral-300 font-bold text-[10px] uppercase px-3 py-1.5 rounded-lg border border-white/[0.04] transition-all"
                        >
                          {ownedModelIds.includes(item.id) ? "✓ Running In Dashboard" : "⚡ Initialize Node"}
                        </button>
                        <span className="text-emerald-400 font-extrabold text-xs">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* HYPER-INTEGRATED INTERACTIVE DASHBOARD VIEW MODE */
            <div className="flex flex-col gap-6 h-full max-w-5xl mx-auto">
              <div>
                <h1 className="text-xl font-black text-white tracking-tight">Centralized Dashboard Workspace</h1>
                <p className="text-xs text-neutral-400 mt-1">Running orchestration over your dynamic account array. Switch models seamlessly or deploy group communication loops.</p>
              </div>

              {/* DYNAMIC INTERFACE SPLIT CONTROLS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 items-start">
                
                {/* INTERACTIVE MODEL SANDBOX SELECTOR PANEL */}
                <div className="bg-[#0e1017] border border-white/[0.05] rounded-2xl p-4 flex flex-col gap-4 relative">
                  <div>
                    <label className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold block mb-1">Select Single Execution Container</label>
                    
                    {/* CUSTOM SWITCHER DROP-UP/DROP-DOWN SELECTION CONTROLLER */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowModelSwitcher(!showModelSwitcher)}
                        className="w-full bg-[#161823] border border-white/[0.06] rounded-xl p-3 text-xs font-bold text-white flex items-center justify-between hover:border-purple-500 transition-colors"
                      >
                        <span className="truncate">
                          {DATASET.find(m => m.id === selectedDashboardModelId)?.title.split('&')[0]}
                        </span>
                        <span className="text-purple-400 font-bold transition-transform duration-200">{showModelSwitcher ? '▲' : '▼'}</span>
                      </button>

                      {showModelSwitcher && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#161823] border border-white/[0.08] rounded-xl shadow-2xl z-20 overflow-hidden max-h-48 overflow-y-auto">
                          {DATASET.filter(m => ownedModelIds.includes(m.id)).map(model => (
                            <div 
                              key={model.id}
                              onClick={() => { setSelectedDashboardModelId(model.id); setShowModelSwitcher(false); }}
                              className={`p-3 text-xs cursor-pointer transition-colors hover:bg-white/5 truncate font-medium ${selectedDashboardModelId === model.id ? 'text-purple-400 bg-white/[0.02]' : 'text-neutral-300'}`}
                            >
                              ⚙️ {model.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ISOLATED ACTIVE APP RENDERING NODE WINDOW */}
                  <div className="bg-black/40 border border-white/[0.03] rounded-xl p-4 min-h-[160px] flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold uppercase tracking-widest px-2 py-0.5 rounded border border-purple-500/30">
                        {DATASET.find(m => m.id === selectedDashboardModelId)?.category} Node Stable
                      </span>
                      <h4 className="text-sm font-bold text-white mt-2 leading-snug">
                        {DATASET.find(m => m.id === selectedDashboardModelId)?.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1">Managed directly via Stackerr Proxy API tunnels.</p>
                    </div>

                    <button 
                      onClick={() => alert(`Sending execution burst signal direct to ${DATASET.find(m => m.id === selectedDashboardModelId)?.curator}...`)}
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs py-2 rounded-lg transition-colors mt-4"
                    >
                      Trigger Direct App Protocol ⚡
                    </button>
                  </div>
                </div>

                {/* ADVANCED MULTI-AGENT GROUP DISCUSSION INTERACTION LAYER */}
                <div className="lg:col-span-2 bg-[#0e1017] border border-white/[0.05] rounded-2xl p-4 flex flex-col h-[350px] justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Synchronized Cluster Discussion Arena
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5">Your input maps concurrently across all ({ownedModelIds.length}) running instances inside your stack network profile.</p>
                  </div>

                  {/* CONVERSATION BOARD AREA */}
                  <div className="flex-1 my-3 bg-black/40 rounded-xl p-3 overflow-y-auto flex flex-col gap-2.5 max-h-[220px] scrollbar-none border border-white/[0.02]">
                    {discussionMessages.map((msg, idx) => (
                      <div key={idx} className="text-xs leading-relaxed flex flex-col gap-0.5">
                        <span className={`font-black tracking-wide text-[10px] ${msg.type === 'user' ? 'text-blue-400' : msg.type === 'system' ? 'text-purple-400' : 'text-emerald-400'}`}>
                          ◈ {msg.sender}:
                        </span>
                        <p className="text-neutral-300 font-medium pl-3 bg-white/[0.01] py-1 rounded border-l border-white/5">{msg.text}</p>
                      </div>
                    ))}
                    {isCrosstalking && (
                      <div className="text-[11px] text-neutral-500 font-medium animate-pulse">
                        ⌛ Processing joint cross-channel intelligence telemetry...
                      </div>
                    )}
                  </div>

                  {/* DISCUSSION FIELD FOOTER SUBMIT FORM */}
                  <form onSubmit={handleGroupDiscussion} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Issue high-level directive statement to all running assets..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-[#161823] border border-white/[0.06] rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                    <button 
                      type="submit" 
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs px-4 py-2 rounded-xl"
                    >
                      Broadcast ↗
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* POPUP SUB-MODAL WINDOW ARCHITECTURE */}
      {funnelStep !== 'closed' && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f111a] border border-white/[0.06] rounded-2xl max-w-md w-full p-6 relative">
            <button onClick={() => setFunnelStep('closed')} className="absolute top-4 right-4 text-neutral-400 hover:text-white">✕</button>
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-extrabold text-white tracking-tight">Index Custom App Configuration</h3>
              <p className="text-xs text-neutral-400">Map endpoint vectors directly to the Stackerr operational database layout.</p>
              <input type="text" placeholder="Instance Name Architecture" className="bg-[#171a26] border border-white/[0.05] rounded-xl p-3 text-xs text-white" defaultValue="Custom Agent Node v1" />
              <button onClick={() => setFunnelStep('closed')} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs py-3 rounded-xl">
                Deploy Registration Pipeline ($15)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
