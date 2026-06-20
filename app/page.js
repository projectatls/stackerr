'use client';
import { useState, useEffect, useRef } from 'react';

const DATASET = [
  {
    id: 1,
    title: "Automated Roof Damage Analysis & Drone Inspection Engine",
    category: "Property AI",
    curator: "RoofAI Labs",
    rating: "5.0",
    reviews: 1420,
    price: "$49/mo",
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop&q=60",
    section: "vision",
    simulationResponse: "Roof drone flight path verified. Analyzing high-resolution thermal images for structural fracture points... 0 defects found.",
    specs: { latency: "185ms", uptime: "99.98%", models: "ViT-H/14 Transformer", tokens: "$0.002 / img" }
  },
  {
    id: 2,
    title: "Context-Aware Neural Code Autocomplete & Repository Refactoring",
    category: "Development",
    curator: "CursorForge",
    rating: "4.9",
    reviews: 3102,
    price: "$20/mo",
    badge: "Trending",
    img: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60",
    section: "text",
    simulationResponse: "Refactoring targets identified. Suggesting optimized async stack: \n```javascript\nconst data = await cluster.fetch();\n```",
    specs: { latency: "42ms", uptime: "99.99%", models: "Forge-Coder-32B", tokens: "$0.0015 / 1k tokens" }
  },
  {
    id: 3,
    title: "Multi-Source Lead Enrichment Matrix & B2B Pipeline Scraper",
    category: "Lead Gen",
    curator: "ClayScale",
    rating: "5.0",
    reviews: 984,
    price: "$149/mo",
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
    section: "data",
    simulationResponse: "Scraping target domains initialized. Compiling phone numbers, LinkedIn URLs, and technology stack matrices into CSV format.",
    specs: { latency: "890ms", uptime: "99.4%", models: "PuppeteerCluster v4", tokens: "$0.01 / profile row" }
  },
  {
    id: 4,
    title: "Autonomous Real Estate Assessment & Commercial Property Valuation",
    category: "Property AI",
    curator: "SiteInspect",
    rating: "4.8",
    reviews: 755,
    price: "$89/mo",
    badge: "New",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&auto=format&fit=crop&q=60",
    section: "vision",
    simulationResponse: "Commercial zoning data aggregated. Estimating cash-on-cash return curves based on regional market pricing indexes.",
    specs: { latency: "310ms", uptime: "99.9%", models: "PropRegress-v2", tokens: "$0.05 / query" }
  },
  {
    id: 5,
    title: "Zero-Cost Next.js React Element Engine & Tailwind Builder",
    category: "Development",
    curator: "v0 OpenLabs",
    rating: "4.9",
    reviews: 843,
    price: "FREE TIER",
    badge: "Popular",
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=500&auto=format&fit=crop&q=60",
    section: "automation",
    simulationResponse: "Tailwind interface configuration mapped. Component boilerplate generated successfully for active view viewport canvas.",
    specs: { latency: "95ms", uptime: "100.0%", models: "v0-Element-LLM", tokens: "Unmetered / Free" }
  },
  {
    id: 6,
    title: "Open-Source Relational Postgres Storage System & Edge Sync",
    category: "Database",
    curator: "SupaBase OSS",
    rating: "4.8",
    reviews: 612,
    price: "FREE TIER",
    badge: "Verified",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=500&auto=format&fit=crop&q=60",
    section: "data",
    simulationResponse: "PostgreSQL transaction pool synchronized. Row-level security checks verified against schema specifications.",
    specs: { latency: "14ms", uptime: "99.999%", models: "Postgres 16.2 Edge", tokens: "Free up to 500MB" }
  },
  {
    id: 7,
    title: "No-Code Workflow Node Integration & API Webhook Proxy",
    category: "Automation",
    curator: "MakeFree",
    rating: "4.7",
    reviews: 219,
    price: "FREE TIER",
    badge: "Starter",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60",
    section: "automation",
    simulationResponse: "Webhook listener triggered. Forwarding multi-payload JSON objects to connected webhook destination endpoints.",
    specs: { latency: "88ms", uptime: "99.9%", models: "WebhookProxy-Go", tokens: "Free" }
  },
  {
    id: 8,
    title: "Full Scale Outbound Engine (Clay Matrix + Make Workflows + Phantom Scraping)",
    category: "Bundles",
    curator: "EnterpriseOps",
    rating: "5.0",
    reviews: 112,
    price: "$199/mo",
    badge: "Value Bundle",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
    section: "bundle",
    simulationResponse: "Full Outbound sequence active: Scraping arrays -> Parsing lead names -> Triggering secondary sequences inside active workflows.",
    specs: { latency: "1.2s", uptime: "99.5%", models: "Combined Multi-Agent Stack", tokens: "$199 flat fee" }
  },
  {
    id: 9,
    title: "Complete Dev Environment (Cursor Subsystem + Supabase Cluster + v0 Engine)",
    category: "Bundles",
    curator: "DevStack Corp",
    rating: "4.9",
    reviews: 94,
    price: "$35/mo",
    badge: "Hot Pack",
    img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=500&auto=format&fit=crop&q=60",
    section: "bundle",
    simulationResponse: "Dev Stack combined initialization: Syncing Next.js frontend rendering engine directly with continuous Postgres storage.",
    specs: { latency: "150ms", uptime: "99.99%", models: "Core Web Dev Stack", tokens: "$35 flat fee" }
  },
];

// Sidebar "Top Categories" — mirrors the reference screenshot's category list.
// Mapped onto the closest existing section/category in DATASET so every
// item is genuinely filterable. A few (Video, Voice, Research) have no
// matching tools yet, so they render a real empty state instead of fake data.
const CATEGORY_FILTERS = [
  { key: "chatbots", label: "Chatbots", icon: "chat", test: (i) => i.section === "text" },
  { key: "coding", label: "Coding", icon: "code", test: (i) => i.category === "Development" },
  { key: "images", label: "Images", icon: "image", test: (i) => i.section === "vision" },
  { key: "video", label: "Video", icon: "video", test: () => false },
  { key: "voice", label: "Voice", icon: "mic", test: () => false },
  { key: "agents", label: "Agents", icon: "bot", test: (i) => i.section === "automation" },
  { key: "marketing", label: "Marketing", icon: "megaphone", test: (i) => i.category === "Lead Gen" },
  { key: "research", label: "Research", icon: "search", test: () => false },
  { key: "automation", label: "Automation", icon: "zap", test: (i) => i.category === "Automation" },
  { key: "productivity", label: "Productivity", icon: "grid", test: (i) => i.section === "data" },
];

const COLLECTIONS = [
  { id: "developers", title: "Best AI Tools for Developers", icon: "code", accent: "bg-neutral-800 text-white", test: (i) => i.category === "Development" },
  { id: "free", title: "Free AI Tools That Actually Work", icon: "gift", accent: "bg-emerald-500 text-black", test: (i) => i.price === "FREE TIER" },
  { id: "bundles", title: "Best Value Bundles", icon: "layers", accent: "bg-violet-600 text-white", test: (i) => i.section === "bundle" },
  { id: "toprated", title: "Top Rated by the Community", icon: "star", accent: "bg-amber-500 text-black", test: (i) => parseFloat(i.rating) >= 4.9 },
];

const STACKS = [
  { id: "dev-creator", title: "Full Dev Creator Stack", members: [2, 5, 6], blurb: "Code, prototype UI, and store data without leaving one workflow." },
  { id: "outbound-growth", title: "Outbound Growth Stack", members: [3, 7], blurb: "Scrape and enrich leads, then push them straight into automated outreach." },
  { id: "property-ops", title: "Property Ops Stack", members: [1, 4], blurb: "Inspect roofs by drone and value the property in the same pass." },
];

const NEWS_FEED = [
  { date: "Jun 18, 2026", text: "ClayScale shipped a v4 scraper cluster — lead enrichment latency dropped ~30%." },
  { date: "Jun 12, 2026", text: "SupaBase OSS now offers free-tier projects up to 500MB out of the box." },
  { date: "Jun 04, 2026", text: "Two new bundles joined Stackerr: Full Scale Outbound and Complete Dev Environment." },
  { date: "May 28, 2026", text: "RoofAI Labs crossed 1,400 verified reviews and kept its 5.0 average." },
];

const POPULAR_SEARCHES = ["logo generator", "coding assistant", "youtube editor", "website builder", "research tool"];

const GRADIENTS = [
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-sky-600",
];

function gradientFor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

function ratingOutOfTen(rating) {
  return (parseFloat(rating) * 2).toFixed(1);
}

// Small hand-rolled line-icon set so the redesign needs zero new dependencies.
function Icon({ name, className = "w-4 h-4" }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", className };
  switch (name) {
    case "search": return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case "compare": return <svg {...common}><path d="M7 3v14M17 7v14" /><path d="M3 7h8M13 17h8" /><path d="M3 7l2-3 2 3M13 17l2 3 2-3" /></svg>;
    case "bookmark": return <svg {...common}><path d="M6 3h12v18l-6-4-6 4V3z" /></svg>;
    case "grid": return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "tag": return <svg {...common}><path d="M20 12l-8 8-9-9V3h8l9 9z" /><circle cx="7.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" /></svg>;
    case "megaphone": return <svg {...common}><path d="M3 11v2a2 2 0 002 2h1l3 5V4l-3 5H5a2 2 0 00-2 2z" /><path d="M14 8a4 4 0 010 8" /><path d="M18 5a8 8 0 010 14" /></svg>;
    case "layout": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
    case "code": return <svg {...common}><path d="M9 18l-6-6 6-6M15 6l6 6-6 6" /></svg>;
    case "image": return <svg {...common}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5-7 7" /></svg>;
    case "video": return <svg {...common}><rect x="2" y="5" width="14" height="14" rx="2" /><path d="M16 9l6-3v12l-6-3" /></svg>;
    case "mic": return <svg {...common}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v3" /></svg>;
    case "bot": return <svg {...common}><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M12 8V4M8 14v0M16 14v0" /><circle cx="8" cy="14" r="0.6" fill="currentColor" stroke="none" /><circle cx="16" cy="14" r="0.6" fill="currentColor" stroke="none" /></svg>;
    case "zap": return <svg {...common}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>;
    case "chat": return <svg {...common}><path d="M21 11.5a8.4 8.4 0 01-1.2 4.3L21 20l-4.3-1.1A8.5 8.5 0 113 11.5 8.5 8.5 0 0121 11.5z" /></svg>;
    case "star": return <svg {...common} fill="currentColor" stroke="none"><path d="M12 2l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 18l-6.4 3.6 1.4-7.1-5.3-5 7.2-.9L12 2z" /></svg>;
    case "gift": return <svg {...common}><rect x="3" y="9" width="18" height="11" rx="1.5" /><path d="M3 13h18M12 9v11" /><path d="M8 9c-1.5 0-2.5-1-2.5-2.3C5.5 5.3 6.7 4 8 4c1.8 0 3 2.5 4 5M16 9c1.5 0 2.5-1 2.5-2.3C18.5 5.3 17.3 4 16 4c-1.8 0-3 2.5-4 5" /></svg>;
    case "layers": return <svg {...common}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5M3 8.5v9M21 8.5v9" /></svg>;
    case "close": return <svg {...common}><path d="M18 6L6 18M6 6l12 12" /></svg>;
    case "chevron": return <svg {...common}><path d="M6 9l6 6 6-6" /></svg>;
    case "arrowRight": return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    default: return null;
  }
}

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

  // --- new state for the redesigned IA (Compare / Collections / More categories) ---
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
  const [compareIdA, setCompareIdA] = useState(1);
  const [compareIdB, setCompareIdB] = useState(2);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const savedIds = localStorage.getItem('stackerr_owned_nodes');
    const savedUser = localStorage.getItem('stackerr_session');
    if (savedIds) setOwnedModelIds(JSON.parse(savedIds));
    if (savedUser) setUserSession(savedUser);
  }, []);

  // Cmd/Ctrl+K focuses the discover search bar, like the reference design implies.
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCurrentView('all');
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const saveNodesToDisk = (updatedList) => {
    setOwnedModelIds(updatedList);
    localStorage.setItem('stackerr_owned_nodes', JSON.stringify(updatedList));
  };

  const matchesSearch = (item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase());

  // Resolves whichever "browse" view is active (a top category key, deals, etc.) into a predicate.
  const activeCategory = CATEGORY_FILTERS.find((c) => c.key === currentView);
  const activeCollection = COLLECTIONS.find((c) => c.id === selectedCollectionId);

  const dealsTest = (i) => i.price === "FREE TIER" || i.badge === "Value Bundle" || i.badge === "Hot Pack";

  let viewPredicate = () => true;
  if (activeCategory) viewPredicate = activeCategory.test;
  else if (currentView === "deals") viewPredicate = dealsTest;
  else if (currentView === "collections" && activeCollection) viewPredicate = activeCollection.test;

  const filteredData = DATASET.filter((item) => matchesSearch(item) && viewPredicate(item));

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

  const goToView = (key) => {
    setShowMoreCategories(false);
    setSelectedCollectionId(null);
    setCurrentView(key);
  };

  const sidebarPrimaryNav = [
    { key: 'all', label: 'Discover', icon: 'search' },
    { key: 'dashboard', label: `My Workspace`, icon: 'layout', badge: ownedModelIds.length },
    { key: 'compare', label: 'Compare', icon: 'compare' },
    { key: 'collections', label: 'Collections', icon: 'bookmark' },
    { key: 'categories', label: 'Categories', icon: 'grid' },
    { key: 'deals', label: 'Deals', icon: 'tag', tag: 'New' },
    { key: 'news', label: 'News & Updates', icon: 'megaphone' },
  ];

  const visibleCategoryPills = CATEGORY_FILTERS.slice(0, 9);
  const overflowCategoryPills = CATEGORY_FILTERS.slice(9);

  const compareA = DATASET.find(d => d.id === compareIdA);
  const compareB = DATASET.find(d => d.id === compareIdB);

  return (
    <div className="min-h-screen bg-black text-[#f4f5f7] font-sans antialiased flex flex-col h-screen overflow-hidden relative">

      {/* TOP NAV — kept minimal to mirror the reference: logo, submit, auth */}
      <nav className="bg-black border-b border-white/[0.06] h-16 flex items-center justify-between px-6 shrink-0 z-20">
        <span className="text-2xl font-black text-white tracking-tight cursor-pointer select-none" onClick={() => goToView('all')}>
          stackerr<span className="text-[#1dbf73]">.</span>
        </span>

        <div className="flex items-center gap-3">
          <button onClick={() => setActiveModal('creator')} className="flex items-center gap-1.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs px-4 py-2 rounded-lg transition-all">
            Submit Tool <span className="text-sm leading-none">+</span>
          </button>

          <div className="h-4 w-px bg-white/[0.1] mx-1"></div>

          {userSession ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-400 font-medium hidden sm:inline">Signed in as <strong className="text-white">{userSession}</strong></span>
              <button onClick={handleSignOut} className="text-[10px] uppercase tracking-wider font-bold bg-[#1a1a1a] px-3 py-1.5 rounded-md hover:bg-neutral-800 transition-colors">
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

        {/* SIDEBAR */}
        <aside className="w-60 bg-black border-r border-white/[0.06] p-3 flex flex-col justify-between shrink-0 select-none z-10">
          <div className="flex flex-col gap-0.5 overflow-y-auto max-h-full pr-1 scrollbar-none">
            {sidebarPrimaryNav.map((navItem) => (
              <button
                key={navItem.key}
                onClick={() => goToView(navItem.key)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-colors flex items-center justify-between gap-2 ${currentView === navItem.key ? 'bg-[#1a1a1a] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'}`}
              >
                <span className="flex items-center gap-2.5">
                  <Icon name={navItem.icon} className={`w-4 h-4 ${currentView === navItem.key ? 'text-[#1dbf73]' : ''}`} />
                  {navItem.label}
                </span>
                {navItem.tag && <span className="text-[9px] bg-[#1dbf73] text-black font-black uppercase px-1.5 py-0.5 rounded">{navItem.tag}</span>}
                {typeof navItem.badge === 'number' && navItem.badge > 0 && (
                  <span className="text-[10px] bg-white/[0.08] text-neutral-300 font-bold px-1.5 py-0.5 rounded-full">{navItem.badge}</span>
                )}
              </button>
            ))}

            <div className="h-px bg-white/[0.06] my-3 mx-2"></div>
            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase px-3 mb-1 block">Top Categories</span>

            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.key}
                onClick={() => goToView(cat.key)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors flex items-center gap-2.5 ${currentView === cat.key ? 'bg-[#1a1a1a] text-white' : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'}`}
              >
                <Icon name={cat.icon} className="w-4 h-4" />
                {cat.label}
              </button>
            ))}
          </div>

          <div className="shrink-0 mt-3">
            {!userSession ? (
              <div className="p-4 bg-[#101010] rounded-xl border border-white/[0.06]">
                <p className="text-sm font-bold text-white">Join Stackerr</p>
                <p className="text-xs text-neutral-500 mt-1 mb-3">Save, compare and organize your favorite AI tools.</p>
                <button onClick={() => setActiveModal('signup')} className="w-full bg-[#1dbf73] text-black text-xs font-bold py-2.5 rounded-lg hover:bg-[#19a763] transition-all">
                  Create Free Account
                </button>
              </div>
            ) : (
              <div className="p-3 bg-[#101010] rounded-xl border border-white/[0.06] text-center">
                <p className="text-[10px] text-neutral-500 font-bold tracking-wider uppercase">Cluster Status</p>
                <span className="text-xs font-semibold text-emerald-400 block mt-0.5">Live Connection Active</span>
              </div>
            )}
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 h-full overflow-hidden bg-black w-full">

          {currentView === 'dashboard' ? (
            /* ---------------- CONSOLE / WORKSPACE MODE (unchanged behavior) ---------------- */
            <div className="h-full flex flex-col justify-between relative max-w-5xl mx-auto px-6 w-full">
              <div className="pt-6 pb-3 border-b border-white/[0.06] bg-black z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white tracking-tight">Unified Engine Operations Panel</h2>
                  <p className="text-xs text-neutral-500">Coordinate and cross-talk active AI assets tied to your profile subscription parameters.</p>
                </div>

                {ownedModelIds.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="bg-[#101010] border border-white/[0.06] p-0.5 rounded-lg flex">
                      <button onClick={() => setIsGroupChat(true)} className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all ${isGroupChat ? 'bg-[#2d2e34] text-white' : 'text-neutral-400'}`}>
                        Cross-Channel
                      </button>
                      <button onClick={() => setIsGroupChat(false)} className={`text-[10px] font-bold px-3 py-1.5 rounded-md transition-all ${!isGroupChat ? 'bg-[#2d2e34] text-white' : 'text-neutral-400'}`}>
                        Isolated Link
                      </button>
                    </div>

                    {!isGroupChat && (
                      <div className="relative">
                        <button onClick={() => setShowModelSwitcher(!showModelSwitcher)} className="bg-[#101010] border border-white/[0.06] rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-300 flex items-center gap-2">
                          <span>{DATASET.find(m => m.id === selectedDashboardModelId)?.curator || "Select Agent"}</span>
                          <Icon name="chevron" className="w-3 h-3 text-neutral-500" />
                        </button>
                        {showModelSwitcher && (
                          <div className="absolute right-0 top-full mt-1 w-64 bg-[#101010] border border-white/[0.1] rounded-xl shadow-2xl z-30 p-1 flex flex-col gap-0.5">
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
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border border-dashed border-white/[0.08] rounded-2xl bg-white/[0.01] my-auto">
                    <h4 className="text-sm font-bold text-white">Your System Cluster is Empty</h4>
                    <p className="text-xs text-neutral-500 max-w-xs mt-1 mb-4">You have revoked access to all specialized endpoints.</p>
                    <button onClick={() => goToView('all')} className="bg-[#1dbf73] text-black text-xs font-bold px-4 py-2 rounded-lg">
                      Browse Marketplace Systems
                    </button>
                  </div>
                ) : (
                  discussionMessages.map((msg, idx) => (
                    <div key={idx} className="max-w-4xl flex flex-col gap-1 bg-white/[0.02] border border-white/[0.04] p-4 rounded-xl whitespace-pre-wrap">
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
                <div className="pb-8 pt-2 bg-black">
                  <form onSubmit={handleSendMessage} className="relative max-w-4xl mx-auto flex items-center bg-[#101010] rounded-full border border-white/[0.06]">
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

          ) : currentView === 'compare' ? (
            /* ---------------- COMPARE ---------------- */
            <div className="h-full overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto w-full">
              <h2 className="text-lg font-bold text-white">Compare AI tools</h2>
              <p className="text-xs text-neutral-500 mt-1 mb-6">Pick any two tools to line their specs up side by side.</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[{ value: compareIdA, set: setCompareIdA }, { value: compareIdB, set: setCompareIdB }].map((slot, idx) => (
                  <select
                    key={idx}
                    value={slot.value}
                    onChange={(e) => slot.set(Number(e.target.value))}
                    className="bg-[#101010] border border-white/[0.08] rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    {DATASET.map((d) => <option key={d.id} value={d.id}>{d.curator} — {d.title}</option>)}
                  </select>
                ))}
              </div>

              {compareA && compareB && (
                <div className="bg-[#101010] border border-white/[0.08] rounded-xl overflow-hidden">
                  <div className="grid grid-cols-3 text-xs">
                    <div className="p-4 text-neutral-500 font-semibold border-b border-white/[0.06]"> </div>
                    <div className="p-4 font-bold text-white border-b border-l border-white/[0.06]">{compareA.curator}</div>
                    <div className="p-4 font-bold text-white border-b border-l border-white/[0.06]">{compareB.curator}</div>

                    {[
                      ['Category', d => d.category],
                      ['Rating', d => `${ratingOutOfTen(d.rating)} / 10 (${d.reviews} reviews)`],
                      ['Price', d => d.price],
                      ['Model', d => d.specs.models],
                      ['Latency', d => d.specs.latency],
                      ['Uptime', d => d.specs.uptime],
                      ['Token cost', d => d.specs.tokens],
                    ].map(([label, get]) => (
                      <div key={label} className="contents">
                        <div className="p-4 text-neutral-500 font-semibold border-b border-white/[0.06]">{label}</div>
                        <div className="p-4 text-neutral-200 border-b border-l border-white/[0.06]">{get(compareA)}</div>
                        <div className="p-4 text-neutral-200 border-b border-l border-white/[0.06]">{get(compareB)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          ) : currentView === 'categories' ? (
            /* ---------------- CATEGORIES OVERVIEW ---------------- */
            <div className="h-full overflow-y-auto p-6 md:p-10 w-full">
              <h2 className="text-lg font-bold text-white">Browse by category</h2>
              <p className="text-xs text-neutral-500 mt-1 mb-6">Jump straight into a category of tools.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {CATEGORY_FILTERS.map((cat) => {
                  const count = DATASET.filter(cat.test).length;
                  return (
                    <button key={cat.key} onClick={() => goToView(cat.key)} className="bg-[#101010] border border-white/[0.06] hover:border-[#1dbf73]/30 rounded-xl p-4 text-left transition-colors">
                      <Icon name={cat.icon} className="w-5 h-5 text-[#1dbf73] mb-3" />
                      <p className="text-sm font-bold text-white">{cat.label}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{count} {count === 1 ? 'tool' : 'tools'}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          ) : currentView === 'news' ? (
            /* ---------------- NEWS & UPDATES ---------------- */
            <div className="h-full overflow-y-auto p-6 md:p-10 max-w-2xl mx-auto w-full">
              <h2 className="text-lg font-bold text-white">News & updates</h2>
              <p className="text-xs text-neutral-500 mt-1 mb-6">What's new across the Stackerr catalog.</p>
              <div className="flex flex-col gap-3">
                {NEWS_FEED.map((n, i) => (
                  <div key={i} className="bg-[#101010] border border-white/[0.06] rounded-xl p-4">
                    <p className="text-[11px] font-bold text-[#1dbf73] uppercase tracking-wide">{n.date}</p>
                    <p className="text-sm text-neutral-200 mt-1">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

          ) : currentView === 'collections' && !activeCollection ? (
            /* ---------------- COLLECTIONS OVERVIEW ---------------- */
            <div className="h-full overflow-y-auto p-6 md:p-10 w-full">
              <h2 className="text-lg font-bold text-white">Popular collections</h2>
              <p className="text-xs text-neutral-500 mt-1 mb-6">Hand-picked groups of tools for common needs.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COLLECTIONS.map((c) => {
                  const count = DATASET.filter(c.test).length;
                  return (
                    <button key={c.id} onClick={() => setSelectedCollectionId(c.id)} className="bg-[#101010] border border-white/[0.06] hover:border-[#1dbf73]/30 rounded-xl p-5 text-left transition-colors">
                      <div className={`w-10 h-10 rounded-lg ${c.accent} flex items-center justify-center mb-4`}>
                        <Icon name={c.icon} className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-bold text-white leading-snug">{c.title}</p>
                      <p className="text-xs text-neutral-500 mt-1">{count} {count === 1 ? 'tool' : 'tools'}</p>
                    </button>
                  );
                })}
              </div>
            </div>

          ) : (
            /* ---------------- DISCOVER (default catalog / search / category / deals / collection-detail) ---------------- */
            <div className="h-full overflow-y-auto p-6 md:p-8 flex flex-col gap-8 w-full">

              {currentView === 'all' && (
                <div className="relative bg-black border border-white/[0.06] rounded-2xl p-8 md:p-10 overflow-hidden shrink-0 w-full">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(124,58,237,0.18),transparent_60%)]" />
                  <div className="relative grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">
                    <div>
                      <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                        Find the perfect AI tool<br />for <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent">any task.</span>
                      </h1>
                      <p className="text-sm text-neutral-400 mt-3 max-w-lg">
                        Discover, compare and pick from a growing catalog of AI tools, agents, models and automations — all in one dashboard.
                      </p>

                      <div className="flex items-center w-full mt-6 max-w-lg">
                        <div className="relative w-full">
                          <Icon name="search" className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search for AI tools..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-[#101010] text-sm text-white placeholder-neutral-500 rounded-xl pl-10 pr-12 py-3 focus:outline-none border border-white/[0.08] focus:border-[#1dbf73]/50"
                          />
                          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-500 border border-white/[0.1] rounded px-1.5 py-0.5">⌘K</kbd>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 flex-wrap">
                        <span className="text-[11px] text-neutral-500">Popular searches:</span>
                        {POPULAR_SEARCHES.map((term) => (
                          <button key={term} onClick={() => setSearch(term)} className="text-[11px] text-neutral-300 hover:text-white hover:underline">
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* decorative hero graphic — original shapes, no third-party logos */}
                    <div className="relative h-48 hidden md:block">
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.25),transparent_70%)]" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-2xl bg-[#101010] border border-white/[0.1] flex items-center justify-center shadow-xl">
                        <Icon name="bot" className="w-9 h-9 text-[#1dbf73]" />
                      </div>
                      <div className="absolute left-2 top-2 w-14 h-14 rounded-xl bg-violet-600/90 flex items-center justify-center shadow-lg rotate-[-6deg]">
                        <Icon name="image" className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute right-2 top-6 w-14 h-14 rounded-xl bg-blue-600/90 flex items-center justify-center shadow-lg rotate-[8deg]">
                        <Icon name="code" className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute left-6 bottom-2 w-14 h-14 rounded-xl bg-pink-600/90 flex items-center justify-center shadow-lg rotate-[10deg]">
                        <Icon name="mic" className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute right-6 bottom-0 w-14 h-14 rounded-xl bg-amber-500/90 flex items-center justify-center shadow-lg rotate-[-8deg]">
                        <Icon name="video" className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* category pill row — only on the main discover view */}
              {currentView === 'all' && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
                  <button onClick={() => goToView('all')} className="text-xs font-bold px-4 py-1.5 rounded-full bg-white text-black shrink-0">All</button>
                  {visibleCategoryPills.map((cat) => (
                    <button key={cat.key} onClick={() => goToView(cat.key)} className="text-xs font-semibold px-4 py-1.5 rounded-full bg-[#101010] border border-white/[0.06] text-neutral-300 hover:text-white hover:border-white/[0.15] shrink-0">
                      {cat.label}
                    </button>
                  ))}
                  <div className="relative shrink-0">
                    <button onClick={() => setShowMoreCategories(!showMoreCategories)} className="text-xs font-semibold px-4 py-1.5 rounded-full bg-[#101010] border border-white/[0.06] text-neutral-300 hover:text-white flex items-center gap-1">
                      More <Icon name="chevron" className="w-3 h-3" />
                    </button>
                    {showMoreCategories && (
                      <div className="absolute left-0 top-full mt-1 w-44 bg-[#101010] border border-white/[0.1] rounded-xl shadow-2xl z-30 p-1">
                        {overflowCategoryPills.map((cat) => (
                          <button key={cat.key} onClick={() => goToView(cat.key)} className="w-full text-left px-3 py-2 text-xs text-neutral-300 hover:bg-[#1a1a1a] rounded-lg">
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* header for non-'all' discover sub-views (category / deals / collection detail / search) */}
              {currentView !== 'all' && (
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-4 w-full shrink-0">
                  <div>
                    {activeCollection && (
                      <button onClick={() => setSelectedCollectionId(null)} className="text-[11px] text-neutral-500 hover:text-white mb-1">← Back to collections</button>
                    )}
                    <h2 className="text-base font-bold text-white tracking-tight">
                      {activeCollection ? activeCollection.title : activeCategory ? activeCategory.label : currentView === 'deals' ? '🔥 Deals' : 'Results'}
                    </h2>
                    <p className="text-xs text-neutral-500 mt-0.5">{filteredData.length} {filteredData.length === 1 ? 'tool' : 'tools'} found</p>
                  </div>
                  <div className="flex items-center w-full md:w-[320px] shrink-0">
                    <input
                      type="text"
                      placeholder="Refine search within this view..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-[#101010] text-xs text-white placeholder-neutral-500 rounded-lg px-4 py-2.5 focus:outline-none border border-white/[0.06] focus:border-neutral-600"
                    />
                  </div>
                </div>
              )}

              {/* TRENDING / RESULTS GRID */}
              <div className="shrink-0">
                {currentView === 'all' && (
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-white">Trending Now</h2>
                    <button onClick={() => setSearch('')} className="text-xs text-neutral-400 hover:text-white">View All</button>
                  </div>
                )}

                {filteredData.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-2xl">
                    <p className="text-sm font-bold text-white">No tools here yet</p>
                    <p className="text-xs text-neutral-500 mt-1 mb-4">Nobody has listed a tool in this category — be the first.</p>
                    <button onClick={() => setActiveModal('creator')} className="bg-[#1dbf73] text-black text-xs font-bold px-4 py-2 rounded-lg">Submit a tool</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredData.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedDetailProduct(item)}
                        className="group bg-[#101010] border border-white/[0.06] hover:border-[#1dbf73]/40 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradientFor(item.curator)} flex items-center justify-center text-white font-black text-sm shrink-0`}>
                          {item.curator.charAt(0)}
                        </div>
                        <p className="text-xs font-bold text-white mt-3 leading-snug line-clamp-2">{item.curator}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{item.category}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.05]">
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            {ratingOutOfTen(item.rating)}
                          </span>
                          <span className="text-[11px] font-bold text-neutral-300">{item.price}</span>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); acquireModel(item.id); }}
                          className={`w-full mt-3 text-[11px] font-bold py-2 rounded-lg transition-all ${ownedModelIds.includes(item.id) ? "bg-[#1dbf73] text-black" : "bg-white/[0.06] text-white hover:bg-white/[0.12]"}`}
                        >
                          {ownedModelIds.includes(item.id) ? "Open Console" : "Add to Cluster"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* POPULAR COLLECTIONS — preview strip, only on the main discover view */}
              {currentView === 'all' && (
                <div className="shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-sm font-bold text-white">Popular Collections</h2>
                    <button onClick={() => goToView('collections')} className="text-xs text-neutral-400 hover:text-white">View All</button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COLLECTIONS.map((c) => {
                      const count = DATASET.filter(c.test).length;
                      return (
                        <button key={c.id} onClick={() => { goToView('collections'); setSelectedCollectionId(c.id); }} className="bg-[#101010] border border-white/[0.06] hover:border-[#1dbf73]/30 rounded-xl p-5 text-left transition-colors">
                          <div className={`w-10 h-10 rounded-lg ${c.accent} flex items-center justify-center mb-4`}>
                            <Icon name={c.icon} className="w-5 h-5" />
                          </div>
                          <p className="text-sm font-bold text-white leading-snug">{c.title}</p>
                          <p className="text-xs text-neutral-500 mt-1">{count} {count === 1 ? 'tool' : 'tools'}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STATS STRIP — platform-wide marketing numbers, only on the main discover view */}
              {currentView === 'all' && (
                <div className="bg-[#101010] border border-white/[0.06] rounded-2xl p-5 grid grid-cols-2 sm:grid-cols-5 divide-x divide-white/[0.06] shrink-0">
                  {[
                    ['20,000+', 'AI Tools'],
                    ['500+', 'New Tools Weekly'],
                    ['50+', 'Categories'],
                    ['2M+', 'Monthly Users'],
                    ['4.8/5', 'User Rating'],
                  ].map(([value, label], i) => (
                    <div key={i} className="text-center px-2">
                      <p className="text-base font-black text-white">{value}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{label}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="h-4 shrink-0" />
            </div>
          )}
        </main>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedDetailProduct && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101010] border border-white/[0.1] rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button onClick={() => setSelectedDetailProduct(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <Icon name="close" className="w-4 h-4" />
            </button>

            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFor(selectedDetailProduct.curator)} flex items-center justify-center text-white font-black mb-3`}>
              {selectedDetailProduct.curator.charAt(0)}
            </div>

            <span className="text-[10px] bg-[#1dbf73]/10 text-[#1dbf73] border border-[#1dbf73]/20 font-black tracking-widest uppercase px-2 py-0.5 rounded">
              {selectedDetailProduct.category}
            </span>
            <h3 className="text-base font-bold text-white mt-2 leading-snug">{selectedDetailProduct.title}</h3>
            <p className="text-xs text-neutral-400 mt-1">Curated by {selectedDetailProduct.curator}</p>

            <div className="bg-black rounded-xl p-4 my-4 border border-white/[0.06] flex flex-col gap-2.5">
              <div className="flex justify-between text-xs border-b border-white/[0.04] pb-2">
                <span className="text-neutral-500 font-semibold">Core Model Runtime</span>
                <span className="text-neutral-200 font-mono font-bold">{selectedDetailProduct.specs.models}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/[0.04] pb-2">
                <span className="text-neutral-500 font-semibold">Endpoint Latency</span>
                <span className="text-emerald-400 font-mono font-bold">{selectedDetailProduct.specs.latency}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-white/[0.04] pb-2">
                <span className="text-neutral-500 font-semibold">Server Uptime</span>
                <span className="text-neutral-200 font-mono font-bold">{selectedDetailProduct.specs.uptime}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500 font-semibold">Token Pricing</span>
                <span className="text-[#ffb33e] font-mono font-bold">{selectedDetailProduct.specs.tokens}</span>
              </div>
            </div>

            <button
              onClick={() => { acquireModel(selectedDetailProduct.id); setSelectedDetailProduct(null); }}
              className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3 rounded-xl hover:bg-[#19a763] transition-all"
            >
              {ownedModelIds.includes(selectedDetailProduct.id) ? "Initialize Active Console" : "Provision & Mount Endpoint"}
            </button>
          </div>
        </div>
      )}

      {/* AUTH / CREATOR MODALS */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#101010] border border-white/[0.1] rounded-2xl max-w-sm w-full p-8 relative shadow-2xl">
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 text-neutral-500 hover:text-white">
              <Icon name="close" className="w-4 h-4" />
            </button>

            {activeModal === 'creator' && (
              <div>
                <h3 className="text-xl font-black text-white mt-3 mb-1">Submit your tool</h3>
                <p className="text-xs text-neutral-400 mb-6">List your AI tool or API endpoint to thousands of subscribers.</p>
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
                  <input type="text" required placeholder="Tool / workspace name" className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <input type="url" required placeholder="API base URL (https://api.brand.com)" className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Submit for Review</button>
                </form>
              </div>
            )}

            {activeModal === 'signin' && (
              <div>
                <h3 className="text-xl font-black text-white mb-1">Sign in to Stackerr</h3>
                <p className="text-xs text-neutral-400 mb-6">Welcome back — access your saved tools and workspace.</p>
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
                  <input type="email" required placeholder="name@domain.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <input type="password" required placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Continue</button>
                </form>
                <p className="text-center text-xs text-neutral-500 mt-6">
                  Not a member yet? <span onClick={() => setActiveModal('signup')} className="text-[#1dbf73] cursor-pointer hover:underline">Join now</span>
                </p>
              </div>
            )}

            {activeModal === 'signup' && (
              <div>
                <h3 className="text-xl font-black text-white mb-1">Create your account</h3>
                <p className="text-xs text-neutral-400 mb-6">Save, compare and organize your favorite AI tools.</p>
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3">
                  <input type="text" required placeholder="Username" value={authName} onChange={(e) => setAuthName(e.target.value)} className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <input type="email" required placeholder="name@example.com" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <input type="password" required placeholder="Create a password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} className="w-full bg-black border border-white/[0.08] p-3 rounded-xl text-xs text-white focus:outline-none" />
                  <button type="submit" className="w-full bg-[#1dbf73] text-black font-extrabold text-xs py-3.5 rounded-xl mt-2">Create Account</button>
                </form>
                <p className="text-center text-xs text-neutral-500 mt-6">
                  Already have an account? <span onClick={() => setActiveModal('signin')} className="text-[#1dbf73] cursor-pointer hover:underline">Sign In</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
