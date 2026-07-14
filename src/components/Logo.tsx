import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function Logo({ size = 36 }: { size?: number }) {
  return (
    <motion.div
      className="relative flex items-center justify-center rounded-xl"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.06, rotate: 2 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-500 to-accent-500 opacity-90" />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-brand-400 to-accent-400 blur-md opacity-60" />
      <Eye size={size * 0.5} className="relative text-white" strokeWidth={2.2} />
    </motion.div>
  );
}

export function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <Logo size={34} />
      <div className="leading-none">
        <div className="font-display font-bold text-white text-[15px] tracking-tight">
          VisionAI <span className="text-gradient">Studio</span>
        </div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
          Offline Visual Intelligence
        </div>
      </div>
    </div>
  );
}
