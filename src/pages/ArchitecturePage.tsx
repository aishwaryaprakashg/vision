import { motion } from "framer-motion";
import {
  Brain,
  Cpu,
  Eye,
  FileText,
  Layers,
  Lock,
  Palette,
  ScanEye,
  Shield,
  Upload,
  WifiOff,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const flow = [
  {
    icon: Eye,
    label: "User",
    desc: "Opens VisionAI Studio and selects an image. No account, no upload to any server.",
  },
  {
    icon: Upload,
    label: "Upload Image",
    desc: "FileReader reads the file into a data URL and renders it to an <img> element — entirely in the browser.",
  },
  {
    icon: Cpu,
    label: "TensorFlow.js",
    desc: "Loads the MobileNet model and runs inference on the GPU via the WebGL backend when available.",
  },
  {
    icon: Brain,
    label: "MobileNet v2",
    desc: "A pre-trained CNN classifies the image into 1,000+ ImageNet categories with a confidence score.",
  },
  {
    icon: ScanEye,
    label: "Prediction",
    desc: "The top-5 predictions, category, and confidence are rendered in the dashboard.",
  },
  {
    icon: FileText,
    label: "OCR (Optional)",
    desc: "In parallel, Tesseract.js extracts any text directly from the image buffer — skipped if none is found.",
  },
  {
    icon: Palette,
    label: "Report",
    desc: "Predictions, OCR text, palette, metadata, and performance are assembled into a downloadable report.",
  },
  {
    icon: Lock,
    label: "LocalStorage",
    desc: "The analysis is saved locally so you can revisit it later without re-processing the image.",
  },
];

const badges = [
  { icon: Cpu, label: "On Device AI" },
  { icon: WifiOff, label: "Offline" },
  { icon: Shield, label: "Private" },
  { icon: Layers, label: "No Cloud" },
  { icon: Zap, label: "Browser AI" },
];

export default function ArchitecturePage() {
  return (
    <div className="space-y-10">
      <SectionHeading
        eyebrow="Architecture"
        title="The on-device AI pipeline"
        subtitle="Every stage runs inside your browser. Nothing is sent to a server — there is no server."
      />

      <Reveal>
        <GlassCard strong bordered className="p-8 sm:p-10">
          <div className="flex flex-col items-center gap-2">
            {flow.map((node, i) => (
              <div key={node.label} className="flex flex-col items-center w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  className="glass-strong w-full max-w-xl px-5 py-4 flex items-center gap-4 group hover:border-brand-400/30 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <node.icon size={18} className="text-brand-200" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-semibold text-white">{node.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{node.desc}</div>
                  </div>
                  <span className="ml-auto text-xs font-mono text-slate-600 hidden sm:block">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
                {i < flow.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileInView={{ scaleY: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.04 }}
                    className="h-8 w-px bg-gradient-to-b from-brand-400/60 to-accent-400/40 origin-top"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {badges.map((b, i) => (
                <motion.span
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="chip px-4 py-1.5"
                >
                  <b.icon size={13} className="text-emerald-400" />
                  {b.label}
                </motion.span>
              ))}
            </div>
          </div>
        </GlassCard>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: Cpu,
            title: "WebGL acceleration",
            desc: "TensorFlow.js selects the WebGL backend when available, running inference on your GPU for sub-second classification.",
          },
          {
            icon: Layers,
            title: "Model: MobileNet v2",
            desc: "A lightweight, ImageNet-pretrained convolutional network. Loaded once, then reused for every analysis.",
          },
          {
            icon: Lock,
            title: "No backend",
            desc: "The app is a static SPA. There is no server to deploy, no API keys to manage, and no data ever leaves the device.",
          },
        ].map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <GlassCard className="p-6 h-full">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <c.icon size={20} className="text-brand-300" />
              </div>
              <h3 className="font-display font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{c.desc}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
