import { motion } from "framer-motion";
import { Check, CloudOff, Cpu, Shield, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatusCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  hint: string;
  good?: boolean;
  delay?: number;
}

export function StatusCard({
  icon: Icon,
  label,
  value,
  hint,
  good = true,
  delay = 0,
}: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3 }}
      className="glass p-5 relative overflow-hidden group"
    >
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-brand-500/10 blur-2xl group-hover:bg-brand-500/20 transition-colors" />
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
          <Icon size={18} className={good ? "text-emerald-400" : "text-slate-300"} />
        </div>
        <span
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
            good
              ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
              : "text-slate-300 bg-white/5 border border-white/10"
          }`}
        >
          {good ? "Secure" : "Info"}
        </span>
      </div>
      <div className="text-2xl font-display font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{label}</div>
      <div className="text-[11px] text-slate-500 mt-2 leading-relaxed">{hint}</div>
    </motion.div>
  );
}

export function PrivacyCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatusCard
        icon={Wifi}
        label="Internet Usage"
        value="OFFLINE"
        hint="No network requests are made during analysis."
        delay={0}
      />
      <StatusCard
        icon={CloudOff}
        label="Cloud AI Calls"
        value="0"
        hint="Zero calls to OpenAI, Gemini, or any external inference API."
        delay={0.06}
      />
      <StatusCard
        icon={Cpu}
        label="Processing"
        value="100% Local"
        hint="Inference runs on your device via TensorFlow.js + WebGL."
        delay={0.12}
      />
      <StatusCard
        icon={Shield}
        label="Privacy Score"
        value="100%"
        hint="Your images never leave your browser."
        delay={0.18}
      />
    </div>
  );
}

export function BadgeRow() {
  const badges = [
    { label: "Offline", icon: Wifi },
    { label: "Fast", icon: Check },
    { label: "Private", icon: Shield },
    { label: "On Device AI", icon: Cpu },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5">
      {badges.map((b, i) => (
        <motion.span
          key={b.label}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
          className="chip"
        >
          <b.icon size={13} className="text-emerald-400" />
          {b.label}
        </motion.span>
      ))}
    </div>
  );
}
