import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Eye,
  Github,
  Info,
  Moon,
  Shield,
  Sun,
  Trash2,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { useTheme } from "@/hooks/useTheme";
import { useHistory } from "@/hooks/useHistory";

export default function SettingsPage() {
  const { theme, toggle } = useTheme();
  const { items, clear } = useHistory();

  return (
    <div className="space-y-8 max-w-3xl">
      <SectionHeading
        align="left"
        eyebrow="Settings"
        title="Preferences"
        subtitle="Customize VisionAI Studio. Everything is stored locally in your browser."
      />

      {/* Theme */}
      <Reveal>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                {theme === "dark" ? <Moon size={18} className="text-brand-300" /> : <Sun size={18} className="text-amber-400" />}
              </div>
              <div>
                <div className="font-semibold text-white">Theme</div>
                <div className="text-sm text-slate-400">Switch between dark and light appearance.</div>
              </div>
            </div>
            <button onClick={toggle} className="btn-ghost text-sm">
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </GlassCard>
      </Reveal>

      {/* Clear history */}
      <Reveal delay={0.05}>
        <GlassCard className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Trash2 size={18} className="text-red-300" />
              </div>
              <div>
                <div className="font-semibold text-white">Clear history</div>
                <div className="text-sm text-slate-400">
                  {items.length} {items.length === 1 ? "item" : "items"} stored locally. This cannot be undone.
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm("Clear all saved analyses? This cannot be undone.")) clear();
              }}
              className="btn-ghost text-sm text-red-300 hover:text-red-200"
              disabled={items.length === 0}
            >
              Clear
            </button>
          </div>
        </GlassCard>
      </Reveal>

      {/* About */}
      <Reveal delay={0.1}>
        <GlassCard strong bordered className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info size={16} className="text-brand-300" />
            <h3 className="font-display font-semibold text-white">About VisionAI Studio</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            VisionAI Studio is a privacy-first, on-device visual intelligence app
            built for the On-Device AI Hackathon. It uses TensorFlow.js with the
            MobileNet v2 model for image classification and Tesseract.js for OCR —
            both running entirely in your browser with zero cloud calls.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
            {[
              { icon: Cpu, label: "Engine", value: "TensorFlow.js" },
              { icon: Brain, label: "Model", value: "MobileNet v2" },
              { icon: Eye, label: "OCR", value: "Tesseract.js" },
              { icon: Shield, label: "Privacy", value: "100% local" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass p-3 text-center"
              >
                <s.icon size={15} className="mx-auto text-brand-300 mb-1" />
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">{s.label}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{s.value}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-slate-500">
            <Github size={13} />
            v1.0.0 · MIT License · Built for the On-Device AI Hackathon
          </div>
        </GlassCard>
      </Reveal>
    </div>
  );
}
