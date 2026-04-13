import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import Inspector from './components/Inspector';
import Profiler from './components/Profiler';
import Differ from './components/Differ';
import Fork from './components/Fork';

const navLinks = [
  { path: '/inspect', label: 'Inspect', icon: '🔍' },
  { path: '/profile', label: 'Profile', icon: '📊' },
  { path: '/diff', label: 'Diff', icon: '🔀' },
  { path: '/fork', label: 'Fork', icon: '🍴' },
];

function Navigation() {
  const location = useLocation();
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="glass rounded-2xl px-6 py-4 border border-app-border shadow-floating flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl">⭐</span>
          <span className="font-display font-bold text-xl tracking-tight text-text-main group-hover:text-accent-indigo transition-colors duration-300">
            Stell<span className="text-accent-indigo">Kit</span>
          </span>
        </Link>
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-accent-indigo text-white shadow-premium'
                    : 'text-text-dim hover:text-accent-indigo hover:bg-app-hover'
                }`}
              >
                <span className="hidden sm:inline">{link.icon} </span>{link.label}
              </Link>
            );
          })}
          <a
            href="https://github.com/Marvy247/StellKit"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-4 py-2 rounded-xl text-sm font-medium border border-app-border text-text-dim hover:text-accent-indigo hover:border-accent-indigo/40 transition-all duration-200"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="pt-40 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">{children}</div>
    </motion.div>
  );
}

function LandingPage() {
  const tools = [
    {
      path: '/inspect',
      icon: '🔍',
      name: 'Inspect',
      color: 'indigo',
      desc: 'Decode any deployed contract\'s ABI, function signatures, and storage layout from its on-chain WASM.',
    },
    {
      path: '/profile',
      icon: '📊',
      name: 'Profile',
      color: 'emerald',
      desc: 'Simulate a transaction and get a full CPU, memory, and ledger resource breakdown before you deploy.',
    },
    {
      path: '/diff',
      icon: '🔀',
      name: 'Diff',
      color: 'gold',
      desc: 'Compare two contract versions side-by-side — see exactly what functions and storage changed.',
    },
    {
      path: '/fork',
      icon: '🍴',
      name: 'Fork',
      color: 'indigo',
      desc: 'Spin up a local Stellar network snapshot at any ledger for safe, isolated testing.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Hero */}
      <div className="pt-36 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-accent-indigo text-sm font-medium mb-8">
              ⭐ Built for Soroban on Stellar
            </div>
            <h1 className="font-serif font-bold text-6xl md:text-8xl tracking-tighter text-text-main mb-6 leading-none">
              The missing<br />
              <span className="italic text-accent-indigo">developer kit</span><br />
              for Soroban.
            </h1>
            <p className="text-xl text-text-dim max-w-2xl mx-auto mb-10 leading-relaxed">
              StellKit fills the critical gaps in the Soroban developer experience —
              inspect, profile, diff, and fork Stellar smart contracts from one unified toolbox.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/inspect" className="btn-primary">
                Try Inspector →
              </Link>
              <a
                href="https://github.com/Marvy247/StellKit"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>

          {/* Install snippet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-14 inline-block"
          >
            <div className="glass rounded-2xl px-6 py-4 border border-app-border font-mono text-sm text-text-dim text-left">
              <span className="text-text-pale select-none">$ </span>
              <span className="text-accent-indigo">cargo install</span>
              <span className="text-text-main"> --path cli</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tools grid */}
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
              >
                <Link to={tool.path} className="block card-premium group h-full">
                  <div className="text-4xl mb-5">{tool.icon}</div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-display font-bold text-xl text-text-main">{tool.name}</h3>
                    <span className="text-xs font-mono px-2 py-1 rounded-lg bg-app-hover text-text-pale border border-app-border">
                      sdk {tool.name.toLowerCase()}
                    </span>
                  </div>
                  <p className="text-text-dim leading-relaxed">{tool.desc}</p>
                  <div className="mt-6 text-accent-indigo text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    Open tool →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave badge */}
      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-10 border border-app-border text-center">
            <div className="text-5xl mb-4">🌊</div>
            <h2 className="font-serif font-bold text-3xl mb-3">Stellar Wave 3</h2>
            <p className="text-text-dim max-w-xl mx-auto mb-6">
              StellKit participates in the Stellar Wave on Drips. Pick up bounty-eligible issues and earn rewards for contributing.
            </p>
            <a
              href="https://drips.network/wave/stellar"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              View open issues →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/inspect" element={<PageWrapper><Inspector /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profiler /></PageWrapper>} />
        <Route path="/diff" element={<PageWrapper><Differ /></PageWrapper>} />
        <Route path="/fork" element={<PageWrapper><Fork /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'Outfit, sans-serif' } }} />
      <div className="min-h-screen bg-app-bg grid-subtle selection:bg-accent-indigo/10 selection:text-accent-indigo">
        <Navigation />
        <main className="relative">
          <AnimatedRoutes />
        </main>
        <footer className="border-t border-app-border py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⭐</span>
              <span className="font-display font-bold text-lg tracking-tight text-text-main">
                Stell<span className="text-accent-indigo">Kit</span>
              </span>
              <span className="text-text-pale text-sm ml-2">— Soroban Developer Toolbox</span>
            </div>
            <p className="text-xs text-text-pale uppercase tracking-widest font-medium">
              MIT License · Built for Stellar Wave 3
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
