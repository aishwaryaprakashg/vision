import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Cpu,
  FileClock,
  Image as ImageIcon,
  LayoutDashboard,
  Menu,
  Moon,
  Network,
  Settings as SettingsIcon,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { useTheme } from "@/hooks/useTheme";

const nav = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/history", label: "History", icon: FileClock },
  { to: "/app/architecture", label: "Architecture", icon: Network },
  { to: "/app/settings", label: "Settings", icon: SettingsIcon },
];

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-white/5 bg-ink-950/40 backdrop-blur-xl sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-ink-950 border-r border-white/10 lg:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <TopNav
          onMenu={() => setMobileOpen(true)}
          theme={theme}
          toggleTheme={toggle}
          path={location.pathname}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex flex-col h-full p-5">
      <Link to="/" className="flex items-center gap-2.5 mb-8">
        <Logo size={32} />
        <div className="leading-none">
          <div className="font-display font-bold text-white text-sm tracking-tight">
            VisionAI <span className="text-gradient">Studio</span>
          </div>
          <div className="text-[9px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
            Offline Intelligence
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1" aria-label="Dashboard navigation">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={onNavigate}
            aria-label={n.label}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-400 ${
                isActive
                  ? "bg-gradient-to-r from-brand-500/20 to-accent-500/10 text-white border border-white/10"
                  : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`
            }
          >
            <n.icon size={17} aria-hidden="true" />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto">
        <div className="glass p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseGlow" />
            100% On-Device
          </div>
          <div className="text-[11px] text-slate-500 leading-relaxed">
            No cloud. No uploads. Your images stay private.
          </div>
        </div>
      </div>
    </div>
  );
}

function TopNav({
  onMenu,
  theme,
  toggleTheme,
  path,
}: {
  onMenu: () => void;
  theme: string;
  toggleTheme: () => void;
  path: string;
}) {
  const title = path.includes("history")
    ? "History"
    : path.includes("architecture")
    ? "Architecture"
    : path.includes("settings")
    ? "Settings"
    : "Dashboard";
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-white/5 bg-ink-950/60 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 gap-3">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="lg:hidden text-slate-300 hover:text-white p-1.5"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <ImageIcon size={16} className="text-brand-300" />
          <h1 className="font-display font-semibold text-white">{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline-flex chip">
          <Cpu size={12} className="text-emerald-400" />
          Local AI
        </span>
        <button onClick={toggleTheme} className="btn-ghost px-2.5" aria-label="Toggle theme">
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <Link to="/" className="btn-ghost px-2.5" aria-label="Back to home">
          <ArrowLeft size={16} />
        </Link>
      </div>
    </header>
  );
}
