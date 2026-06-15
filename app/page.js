'use client';
import { useState, useEffect } from 'react';

const DATASET = [
{ id: 1, title: "Automated Roof Damage Analysis & Drone Inspection Engine", category: "Property AI", curator: "RoofAI Labs", rating: "5.0", reviews: 1420, price: "$49/mo", badge: "Best Seller", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60", section: "vision", simulationResponse: "Roof drone flight path verified. Analyzing high-resolution thermal images for structural fracture points... 0 defects found.", specs: { latency: "185ms", uptime: "99.98%", models: "ViT-H/14 Transformer", tokens: "$0.002 / img" } },
{ id: 2, title: "Context-Aware Neural Code Autocomplete & Repository Refactoring", category: "Development", curator: "CursorForge", rating: "4.9", reviews: 3102, price: "$20/mo", badge: "Trending", img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60", section: "text", simulationResponse: "Refactoring targets identified. Suggesting optimized async stack: \njavascript\nconst data = await cluster.fetch();\n", specs: { latency: "42ms", uptime: "99.99%", models: "Forge-Coder-32B", tokens: "$0.0015 / 1k tokens" } },
{ id: 3, title: "Multi-Source Lead Enrichment Matrix & B2B Pipeline Scraper", category: "Lead Gen", curator: "ClayScale", rating: "5.0", reviews: 984, price: "$149/mo", badge: "Top Rated", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60", section: "data", simulationResponse: "Scraping target domains initialized. Compiling phone numbers, LinkedIn URLs, and technology stack matrices into CSV format.", specs: { latency: "890ms", uptime: "99.4%", models: "PuppeteerCluster v4", tokens: "$0.01 / profile row" } },
{ id: 4, title: "Autonomous Real Estate Assessment & Commercial Property Valuation", category: "Property AI", curator: "SiteInspect", rating: "4.8", reviews: 755, price: "$89/mo", badge: "New", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60", section: "vision", simulationResponse: "Commercial zoning data aggregated. Estimating cash-on-cash return curves based on regional market pricing indexes.", specs: { latency: "310ms", uptime: "99.9%", models: "PropRegress-v2", tokens: "$0.05 / query" } },
{ id: 5, title: "Zero-Cost Next.js React Element Engine & Tailwind Builder", category: "Development", curator: "v0 OpenLabs", rating: "4.9", reviews: 843, price: "FREE TIER", badge: "Popular", img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60", section: "automation", simulationResponse: "Tailwind interface configuration mapped. Component boilerplate generated successfully for active view viewport canvas.", specs: { latency: "95ms", uptime: "100.0%", models: "v0-Element-LLM", tokens: "Unmetered / Free" } },
{ id: 6, title: "Open-Source Relational Postgres Storage System & Edge Sync", category: "Database", curator: "SupaBase OSS", rating: "4.8", reviews: 612, price: "FREE TIER", badge: "Verified", img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60", section: "data", simulationResponse: "PostgreSQL transaction pool synchronized. Row-level security checks verified against schema specifications.", specs: { latency: "14ms", uptime: "99.999%", models: "Postgres 16.2 Edge", tokens: "Free up to 500MB" } },
{ id: 7, title: "No-Code Workflow Node Integration & API Webhook Proxy", category: "Automation", curator: "MakeFree", rating: "4.7", reviews: 219, price: "FREE TIER", badge: "Starter", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60", section: "automation", simulationResponse: "Webhook listener triggered. Forwarding multi-payload JSON objects to connected webhook destination endpoints.", specs: { latency: "88ms", uptime: "99.9%", models: "WebhookProxy-Go", tokens: "Free" } },
{ id: 8, title: "Full Scale Outbound Engine (Clay Matrix + Make Workflows + Phantom Scraping)", category: "Bundles", curator: "EnterpriseOps", rating: "5.0", reviews: 112, price: "$199/mo", badge: "Value Bundle", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60", section: "bundle", simulationResponse: "Full Outbound sequence active: Scraping arrays -> Parsing lead names -> Triggering secondary sequences inside active workflows.", specs: { latency: "1.2s", uptime: "99.5%", models: "Combined Multi-Agent Stack", tokens: "$199 flat fee" } },
{ id: 9, title: "Complete Dev Environment (Cursor Subsystem + Supabase Cluster + v0 Engine)", category: "Bundles", curator: "DevStack Corp", rating: "4.9", reviews: 94, price: "$35/mo", badge: "Hot Pack", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60", section: "bundle", simulationResponse: "Dev Stack combined initialization: Syncing Next.js frontend rendering engine directly with continuous Postgres storage.", specs: { latency: "150ms", uptime: "99.99%", models: "Core Web Dev Stack", tokens: "$35 flat fee" } },
];

export default function Home() {
const [search, setSearch] = useState('');
const [currentView, setCurrentView] = useState('all');
const [ownedModelIds, setOwnedModelIds] = useState([1, 2, 5]);
const [selectedDashboardModelId, setSelectedDashboardModelId] = useState(1);
const [showModelSwitcher, setShowModelSwitcher] = useState(false);
const [isGroupChat, setIsGroupChat] = useState(true);

const [activeModal, setActiveModal] = useState(null);
const [selectedDetailProduct, setSelectedDetailProduct] = useState(null);

const [userSession, setUserSession] = useState(null);
const [authEmail, setAuthEmail] = useState('');
const [authPassword, setAuthPassword] = useState('');
const [authName, setAuthName] = useState('');

const [discussionMessages, setDiscussionMessages] = useState([
{ sender: "System", text: "Welcome to your centralized operational dashboard. Type a message below to coordinate your active AI assets.", type: "system" }
]);
const [chatInput, setChatInput] = useState('');
const [isProcessing, setIsProcessing] = useState(false);

useEffect(() => {
const savedIds = localStorage.getItem('stackerr_owned_nodes');
const savedUser = localStorage.getItem('stackerr_session');
if (savedIds) setOwnedModelIds(JSON.parse(savedIds));
if (savedUser) setUserSession(savedUser);
}, []);

const saveNodesToDisk = (updatedList) => {
setOwnedModelIds(updatedList);
localStorage.setItem('stackerr_owned_nodes', JSON.stringify(updatedList));
};

const filteredData = DATASET.filter(item => {
const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());
if (!matchesSearch) return false;
if (currentView === 'all') return true;
return item.section === currentView;
});

const acquireModel = (id) => {
if (!ownedModelIds.includes(id)) {
const nextList = [...ownedModelIds, id];
saveNodesToDisk(nextList);
} else {
setCurrentView('dashboard');
}
};

const removeModelFromWorkspace = (id, e) => {
e.stopPropagation();
const remaining = ownedModelIds.filter(item => item !== id);
saveNodesToDisk(remaining);
if (selectedDashboardModelId === id && remaining.length > 0) {
setSelectedDashboardModelId(remaining[0]);
}
setShowModelSwitcher(false);
};

const handleSendMessage = (e) => {
e.preventDefault();
if (!chatInput.trim()) return;

const userMsg = chatInput;
setDiscussionMessages(prev => [...prev, { sender: "You", text: userMsg, type: "user" }]);
setChatInput('');
setIsProcessing(true);

setTimeout(() => {
  if (isGroupChat) {
    const activeModels = DATASET.filter(m => ownedModelIds.includes(m.id));
    const responses = activeModels.map(m => ({
      sender: m.curator,
      text: m.simulationResponse || `Parameters ingested. Staging runtime logs successfully.`,
      type: "agent"
    }));
    setDiscussionMessages(prev => [...prev, ...responses]);
  } else {
    const currentModel = DATASET.find(m => m.id === selectedDashboardModelId);
    setDiscussionMessages(prev => [...prev, {
      sender: currentModel ? currentModel.curator : "AI Engine",
      text: currentModel ? currentModel.simulationResponse : `Workflow endpoint connection pipeline active.`,
      type: "agent"
    }]);
  }
  setIsProcessing(false);
}, 650);


};

const handleAuthSubmit = (e) => {
e.preventDefault();
localStorage.setItem('stackerr_session', authEmail);
setUserSession(authEmail);
setActiveModal(null);
};

const handleSignOut = () => {
localStorage.removeItem('stackerr_session');
setUserSession(null);
};

return (


  <nav className="bg-[#111215] border-b border-white/[0.05] h-16 flex items-center justify-between px-6 shrink-0 z-20">
    <div className="flex items-center">
      <span className="text-2xl font-black text-white tracking-tight cursor-pointer select-none" onClick={() => setCurrentView('all')}>
        stackerr<span className="text-[#1dbf73]">.</span>
      </span>
    </div>

    <div className="flex items-center gap-4">
      <button 
        onClick={() => setCurrentView('dashboard')}
        className={`text-xs font-bold px-4 py-2 rounded-full transition-all flex items-center gap-2 ${currentView === 'dashboard' ? 'bg-[#1dbf73] text-white' : 'bg-[#222327] text-neutral-300 hover:text-white hover:bg-[#2d2e34]'}`}
      >
        My Workspace ({ownedModelIds.length})
      </button>
      
      <button onClick={() => setActiveModal('creator')} className="border border-[#1dbf73] text-[#1dbf73] hover:bg-[#1dbf73] hover:text-white font-bold text-xs px-4 py-2 rounded-lg transition-all">
        Join as Creator
      </button>

      <div className="h-4 w-px bg-white/[0.1] mx-1"></div>

      {userSession ? (
        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 font-medium hidden sm:inline">Signed in as <strong className="text-white">{userSession}</strong></span>
          <button onClick={handleSignOut} className="text-[10px] uppercase tracking-wider font-bold bg-[#222327] px-3 py-1.5 rounded-md hover:bg-neutral-800 transition-colors">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <button onClick={() => setActiveModal('signin')} className="text-xs font-semibold text-neutral-400 hover:text-white px-2 py-1 transition-colors">
            Sign In
          </button>
          <button onClick={() => setActiveModal('signup')} className="bg-[#1dbf73] text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#19a763] transition-all">
            Sign Up
          </button>
        </div>
      )}
    </div>
  </nav>

  <div className="flex flex-1 overflow-hidden w-full">
    
    <aside className="w-56 bg-[#111215] border-r border-white/[0.02] p-3 flex flex-col justify-between shrink-0 select-none z-10">
      <div className="flex flex-col gap-1 overflow-y-auto max-h-full pr-1 scrollbar-none">
        
        <button 
          onClick={() => setCurrentView('dashboard')} 
          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all mb-3 flex items-center justify-between ${currentView === 'dashboard' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' : 'bg-[#1e2025] text-emerald-400 hover:bg-[#25282e] border border-emerald-500/[0.15]'}`}
        >
          <span>Active Console</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>

        <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-4 mt-2 mb-1 block">Discover Stacks</span>
        
        <button onClick={() => setCurrentView('all')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'all' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          All Systems Overview
        </button>
        <button onClick={() => setCurrentView('bundle')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'bundle' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          Integrated Bundles
        </button>

        <div className="h-px bg-white/[0.05] my-2 mx-2"></div>
        
        <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-4 mt-1 mb-1 block">AI Engine Modules</span>

        <button onClick={() => setCurrentView('text')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'text' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          Language Models
        </button>
        <button onClick={() => setCurrentView('vision')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'vision' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          Vision Systems
        </button>
        <button onClick={() => setCurrentView('data')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'data' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          Data Matrices
        </button>
        <button onClick={() => setCurrentView('automation')} className={`w-full text-left px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${currentView === 'automation' ? 'bg-[#222327] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'}`}>
          Automation Webhooks
        </button>
      </div>

      <div className="p-3 bg-[#17181c] rounded-xl border border-white/[0.03] text-center shrink-0 mt-2">
        <p className="text-[10px] text-neutral-500 font-bold tracking-wider uppercase">Cluster Status</p>
        <span className="text-xs font-semibold text-emerald-400 block mt-0.5">Live Connection Active</span>
      </div>
    </aside>

    <main className="flex-1 h-full overflow-hidden bg-[#0d0e10] w-full">
      
      {currentView !== 'dashboard' ? (
        <div className="h-full overflow-y-auto p-6 md:p-8 flex flex-col gap-8 w-full">
          
          <div className="bg-gradient-to-r from-[#1dbf73]/20 to-[#111215] border border-white/[0.04] rounded-2xl p-6 relative overflow-hidden shrink-0 w-full">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">Deploy Specialized AI Endpoints Instantly.</h1>
            <p className="text-xs text-neutral-400 mt-1 max-w-2xl">Click any card to view engine latency parameters and live runtime credentials before initializing nodes.</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.04] pb-4 w-full">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight capitalize">Explore {currentView} Services</h2>
              <p className="text-xs text-neutral-500 mt-0.5">Proven models curated by elite operational developers. Click any card to provision.</p>
            </div>

            <div className="flex items-center w-full md:w-[380px] shrink-0">
              <input
                type="text"
                placeholder="Search specialized models in this view..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#17181c] text-xs text-white placeholder-neutral-500 rounded-l-lg px-4 py-2 focus:outline-none border border-white/[0.04] focus:border-neutral-600 shadow-md"
              />
              <button className="bg-[#222327] border border-l-0 border-white/[0.04] text-neutral-300 px-4 py-2 rounded-r-lg text-xs font-semibold hover:bg-neutral-700 transition-colors shrink-0">
                Filter
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-12">
            {filteredData.map((item) => (
              <div 
                key={item.id} 
                onClick={() => setSelectedDetailProduct(item)} 
                className="bg-[#17181c] border border-white/[0.03] hover:border-white/[0.1] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:scale-[1.02] cursor-pointer shadow-md"
              >
                <div className="w-full aspect-[16/10] relative overflow-hidden bg-neutral-900 border-b border-white/[0.02]">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-[#1dbf73] uppercase tracking-wide">{item.category}</span>
                    <h3 className="text-xs text-white font-bold leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-neutral-400 font-medium mt-1">Curated by {item.curator}</span>
                  </div>

                  <div className="border-t border-white/[0.04] pt-3 mt-1 flex items-center justify-between text-xs">
                    <button 
                      className={`text-[11px] font-bold px-3.5 py-2 rounded-lg transition-all ${ownedModelIds.includes(item.id) ? "bg-[#1dbf73] text-black" : "bg-[#222327] text-white hover:bg-neutral-700"}`}
                    >
                      {ownedModelIds.includes(item.id) ? "Open Console" : "Add to Cluster"}
                    </button>
                    <span className="text-white font-extrabold text-xs">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        <div className="h-full flex flex-col justify-between relative max-w-5xl mx-auto px-6 w-full">
          
          <div className="pt-6 pb-3 border-b border-white/[0.05] bg-[#0d0e10] z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Unified Engine Operations Panel</h2>
              <p className="text-xs text-neutral-500">Coordinate and cross-talk active AI assets tied to your profile subscription parameters.</p>
            </div>

            {ownedModelIds.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="bg-[#17181c] border border-white/[0.05] p-0.5 rounded-lg flex">
                  <button onClick={() => setIsGroupChat(true)} className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all ${isGroupChat ? 'bg-[#2d2e34] text-white' : 'text-neutral-400'}`}>
                    Cross-Channel
                  </button>
                  <button onClick={() => setIsGroupChat(false)} className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all ${!isGroupChat ? 'bg-[#2d2e34] text-white' : 'text-neutral-400'}`}>
                    Isolated Link
                  </button>
                </div>

                {!isGroupChat && (
                  <div className="relative">
                    <button onClick={() => setShowModelSwitcher(!showModelSwitcher)} className="bg-[#17181c] border border-white/[0.05] rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 flex items-center gap-2">
                      <span>{DATASET.find(m => m.id === selectedDashboardModelId)?.curator || "Select Agent"}</span>
                      <span className="text-neutral-500 text-[10px]">▼</span>
                    </button>
                    {showModelSwitcher && (
                      <div className="absolute right-0 top-full mt-1 w-64 bg-[#17181c] border border-white/[0.08] rounded-xl shadow-2xl z-30 p-1 flex flex-col gap-0.5">
                        {DATASET.filter(m => ownedModelIds.includes(m.id)).map(model => (
                          <div key={model.id} onClick={() => { setSelectedDashboardModelId(model.id); setShowModelSwitcher(false); }} className="p-2 text-xs cursor-pointer text-neutral-300 hover:bg-[#2d2e34] rounded-lg flex items-center justify-between group/item">
                            <span>{model.curator} Node</span>
                            <button onClick={(e) => removeModelFromWorkspace(model.id, e)} className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded opacity-0 group-hover/item:opacity-100 transition-all">
                              Revoke
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4 pr-2 scrollbar-none">
            {ownedModelIds.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/[0.05] rounded-2xl bg-[#17181c]/10 my-auto">
                <h4 className="text-sm font-bold text-white">Your System Cluster is Empty</h4>
                <p className="text-xs text-neutral-500 max-w-xs mt-1 mb-4">You have revoked access to all specialized endpoints.</p>
                <button onClick={() => setCurrentView('all')} className="bg-[#1dbf73] text-black text-xs font-bold px-4 py-2 rounded-lg">
                  Browse Marketplace Systems
                </button>
              </div>
            ) : (
              discussionMessages.map((msg, idx) => (
                <div key={idx} className="max-w-4xl flex flex-col gap-1 bg-[#17181c]/40 border border-white/[0.02] p-4 rounded-xl whitespace-pre-wrap">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${msg.type === 'user' ? 'text-blue-400' : msg.type === 'system' ? 'text-purple-400' : 'text-[#1dbf73]'}`}>
                    {msg.sender}
                  </span>
                  <p className="text-sm text-neutral-200 mt-0.5">{msg.text}</p>
                </div>
              ))
            )}
            {isProcessing && <div className="text-xs text-neutral-400 font-bold animate-pulse px-4">Processing token metrics...</div>}
          </div>

          {ownedModelIds.length > 0 && (
            <div className="pb-8 pt-2 bg-[#0d0e10]">
              <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto flex items-center bg-[#17181c] rounded-full border border-white/[0.04]">
                <input 
                  type="text" 
                  placeholder={isGroupChat ? "Broadcast system directive to all active workspace layers..." : `Direct prompt pipeline to ${DATASET.find(m => m.id === selectedDashboardModelId)?.curator}...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-neutral-500 px-6 py-4 focus:outline-none"
                />
                <button type="submit" className="absolute right-3 bg-[#1dbf73] text-black text-xs font-extrabold px-5 py-2 rounded-full">
                  Broadcast
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </main>
  </div>

  {selectedDetailProduct && (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#17181c] border border-white/[0.08] rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
        <button onClick={() => setSelectedDetailProduct(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white text-xs">✕ Close</button>
        
        <span className="text-[10px] bg-[#1dbf73]/10 text-[#1dbf73] border border-[#1dbf73]/20 font-black tracking-widest uppercase px-2 py-0.5 rounded">
          {selectedDetailProduct.category} Node
        </span>
        <h3 className="text-base font-bold text-white mt-2 leading-snug">{selectedDetailProduct.title}</h3>
        <p className="text-xs text-neutral-400 mt-1">Maintained by {selectedDetailProduct.curator}</p>

        <div className="bg-[#0d0e10] rounded-xl p-4 my-4 border border-white/[0.04] flex flex-col gap-2.5">
          <div className="flex justify-between text-xs border-b border-white/[0.03] pb-2">
            <span className="text-neutral-500 font-semibold">Core Model Runtime</span>
            <span className="text-neutral-200 font-mono font-bold">{selectedDetailProduct.specs.models}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-white/[0.03] pb-2">
            <span className="text-neutral-500 font-semibold">Endpoint Latency Metrics</span>
            <span className="text-emerald-400 font-mono font-bold">{selectedDetailProduct.specs.latency}</span>
          </div>
          <div className="flex justify-between text-xs border-b border-white/[0.03] pb-2">
            <span className="text-neutral-500 font-semibold">System Server Uptime</span>
            <span className="text-neutral-200 font-mono font-bold">{selectedDetailProduct.specs.uptime}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500 font-semibold">Token Pricing Ratio</span>
            <span className="text-[#ffb33e] font-mono font-bold">{selectedDetailProduct.specs.tokens}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-2">
          <button 
            onClick={() => { acquireModel(selectedDetailProduct.id); setSelectedDetailProduct(null); }}
            className="flex-1 bg-[#1dbf73] text-black font-extrabold text-xs py-3 rounded-xl hover:bg-[#19a763] transition-all"
          >
            {ownedModelIds.includes(selectedDetailProduct.id) ? "Initialize Active Console" : "Provision & Mount Endpoint"}
          </button>
        </div>
      </div>
    </div>
  )}

  {activeModal && (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#17181c] border border-white/[0.08] rounded-2xl max-w-sm w-full p-8 relative shadow-2xl">
        <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-neutral-500 hover:text-white text-xs">✕ Close</button>
        
        {activeModal === 'creator' && (
          <div>
            <h3 className="text-xl font-black text-white mt-3 mb-1">Join as a Seller</h3>
            <p className="text-xs text-neutral-400 mb-6">List custom API endpoints and software nodes to over 100k subscribers.</p>
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <input type="text" required placeholder="Choose a public workspace name" className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <input type="url" required placeholder="API Base Link (https://api.brand.com)" className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Initialize Storefront</button>
            </form>
          </div>
        )}

        {activeModal === 'signin' && (
          <div>
            <h3 className="text-xl font-black text-white mb-1">Sign In to Stackerr</h3>
            <p className="text-xs text-neutral-400 mb-6">Welcome back! Access your active nodes and orchestration layouts.</p>
            
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <input type="email" required placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <input type="password" required placeholder="Enter your secret key" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Continue</button>
            </form>
            <p className="text-center text-xs text-neutral-500 mt-6">
              Not a member yet? <span onClick={() => { setActiveModal('signup'); }} className="text-[#1dbf73] cursor-pointer hover:underline">Join now</span>
            </p>
          </div>
        )}

        {activeModal === 'signup' && (
          <div>
            <h3 className="text-xl font-black text-white mb-1">Create a new account</h3>
            <p className="text-xs text-neutral-400 mb-6">Join our decentralized ecosystem to provision specialized model layers instantly.</p>
            
            <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
              <input type="text" required placeholder="Choose a username" value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <input type="email" required placeholder="name@example.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <input type="password" required placeholder="Create strong security phrase" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full bg-[#0d0e10] border border-white/[0.05] p-3 rounded-xl text-xs text-white focus:outline-none" />
              <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Create Account</button>
            </form>
            <p className="text-center text-xs text-neutral-500 mt-6">
              Already have an account? <span onClick={() => { setActiveModal('signin'); }} className="text-[#1dbf73] cursor-pointer hover:underline">Sign In</span>
            </p>
          </div>
        )}

      </div>
    </div>
  )}

</div>


);
}
