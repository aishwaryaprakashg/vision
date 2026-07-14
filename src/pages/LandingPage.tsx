import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CloudOff,
  Cpu,
  Eye,
  FileText,
  Gauge,
  Layers,
  Lock,
  Palette,
  ScanEye,
  ShieldCheck,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BadgeRow, PrivacyCards } from "@/components/StatusCards";
import { Wordmark } from "@/components/Logo";
import { useState } from "react";

const features = [
  {
    icon: ScanEye,
    title: "On-Device Image Classification",
    desc: "MobileNet v2 runs in your browser via TensorFlow.js. Identify 1,000+ object categories with zero network calls.",
  },
  {
    icon: FileText,
    title: "In-Browser OCR",
    desc: "Tesseract.js extracts text straight from your images — receipts, screenshots, documents — without uploading anything.",
  },
  {
    icon: Palette,
    title: "Visual Intelligence",
    desc: "Dominant color palette extraction, image metadata, and a full analysis report you can download in one click.",
  },
  {
    icon: Lock,
    title: "Privacy-First by Design",
    desc: "Your images never leave your device. No accounts, no servers, no telemetry. 100% local processing.",
  },
  {
    icon: Gauge,
    title: "GPU-Accelerated",
    desc: "TensorFlow.js uses WebGL to run inference on your GPU for fast, responsive results.",
  },
  {
    icon: Layers,
    title: "Local History",
    desc: "Past analyses are saved in LocalStorage so you can revisit results without re-processing.",
  },
];

const steps = [
  {
    n: "01",
    title: "Upload an image",
    desc: "Drag & drop or pick a PNG, JPG, JPEG, or WEBP file. It stays in your browser.",
    icon: Eye,
  },
  {
    n: "02",
    title: "AI runs locally",
    desc: "MobileNet + Tesseract.js classify the image and extract text entirely on-device.",
    icon: Brain,
  },
  {
    n: "03",
    title: "Get your report",
    desc: "View predictions, OCR text, palette, and metadata — then download a full report.",
    icon: FileText,
  },
];

const faqs = [
  {
    q: "Does VisionAI Studio send my images to the cloud?",
    a: "No. All image processing — classification and OCR — happens entirely inside your browser using TensorFlow.js and Tesseract.js. No image data is ever uploaded to any server.",
  },
  {
    q: "Which AI model is used for classification?",
    a: "We use MobileNet v2, a lightweight convolutional neural network pre-trained on ImageNet, loaded via @tensorflow-models/mobilenet. It recognizes 1,000+ object categories.",
  },
  {
    q: "Does it work offline?",
    a: "After the initial load (which downloads the model and OCR language data from a CDN), analysis runs fully offline. Once cached by the browser, the app works without any connection.",
  },
  {
    q: "Do I need to create an account?",
    a: "No accounts, no sign-in. Your analysis history is stored locally in your browser's LocalStorage and never sent anywhere.",
  },
  {
    q: "What image formats are supported?",
    a: "PNG, JPG, JPEG, and WEBP. Large images are automatically handled by the in-browser model.",
  },
  {
    q: "Is my data really private?",
    a: "Yes — privacy is the core architecture. There is no backend. Open your browser's network tab during analysis and you'll see zero inference requests leave your device.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Nav />
      <Hero />
      <Features />
      <HowItWorks />
      <WhyVisionAI />
      <WhyOnDevice />
      <Architecture />
      <DemoPreview />
      <PrivacySection />
      <Faq />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-ink-950/60 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Wordmark />
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#how" className="hover:text-white transition-colors">How it works</a>
          <a href="#architecture" className="hover:text-white transition-colors">Architecture</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <Link to="/app" className="btn-primary">
          Launch Studio <ArrowRight size={15} />
        </Link>
      </div>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-20 sm:pt-28 pb-24 text-center">
        <Reveal>
          <span className="chip mb-6">
            <Sparkles size={13} className="text-brand-300" />
            On-Device AI Hackathon · Privacy-First
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white max-w-4xl mx-auto leading-[1.05]">
            Visual intelligence,
            <br />
            <span className="text-gradient">100% on your device.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
            Upload an image and let in-browser AI classify it, extract text, and
            build a full visual report — with zero cloud calls and zero data
            leaving your browser.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/app" className="btn-primary text-base px-6 py-3">
              Launch the Studio <ArrowRight size={16} />
            </Link>
            <a href="#how" className="btn-ghost text-base px-6 py-3">
              See how it works
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10">
            <BadgeRow />
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-16">
          <HeroMockup />
        </Reveal>
      </div>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="absolute -inset-4 bg-gradient-to-r from-brand-500/20 via-accent-500/10 to-brand-500/20 blur-3xl rounded-full" />
      <GlassCard strong bordered className="relative p-3 sm:p-4">
        <div className="rounded-xl bg-ink-900/80 border border-white/5 overflow-hidden">
          <div className="h-9 border-b border-white/5 flex items-center gap-2 px-4">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
            <span className="ml-3 text-xs text-slate-500 font-mono">visionai.studio / app</span>
          </div>
          <div className="grid grid-cols-12 gap-3 p-4">
            <div className="col-span-3 hidden sm:block space-y-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-8 rounded-lg bg-white/5" />
              ))}
            </div>
            <div className="col-span-12 sm:col-span-9 grid grid-cols-2 gap-3">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/10 border border-white/5 flex items-center justify-center">
                <Eye size={40} className="text-brand-300/70" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-3/4 rounded bg-white/10" />
                <div className="h-2 w-full rounded bg-white/5" />
                <div className="h-2 w-5/6 rounded bg-white/5" />
                <div className="h-2 w-2/3 rounded bg-white/5" />
                <div className="h-10 rounded-lg bg-gradient-to-r from-brand-500/30 to-accent-500/20" />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Everything you need to understand an image"
          subtitle="A complete visual intelligence toolkit — classification, OCR, palette, metadata — running entirely in your browser."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <GlassCard className="p-6 h-full group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <f.icon size={20} className="text-brand-200" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps. Zero servers."
          subtitle="From upload to full report in seconds — all on your device."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <GlassCard className="p-7 h-full relative overflow-hidden">
                <div className="absolute -right-4 -top-6 text-7xl font-display font-extrabold text-white/[0.04] select-none">
                  {s.n}
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  <s.icon size={22} className="text-accent-400" />
                </div>
                <div className="text-xs font-mono text-brand-300 mb-2">STEP {s.n}</div>
                <h3 className="font-display font-semibold text-white text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyVisionAI() {
  const cards = [
    {
      icon: Lock,
      title: "Private by Design",
      desc: "Your images never leave your browser. No accounts, no servers, no telemetry.",
    },
    {
      icon: WifiOff,
      title: "Runs Completely Offline",
      desc: "Once cached, the app works with the network cable unplugged.",
    },
    {
      icon: Cpu,
      title: "Powered by TensorFlow.js",
      desc: "Industry-grade ML running natively in the browser via WebGL.",
    },
    {
      icon: Eye,
      title: "Browser-based AI",
      desc: "No installs, no plugins. Just open a tab and analyze.",
    },
    {
      icon: CloudOff,
      title: "No Cloud Processing",
      desc: "Zero inference requests to OpenAI, Gemini, or any external API.",
    },
    {
      icon: Zap,
      title: "Fast Local Inference",
      desc: "GPU-accelerated classification in under a second — no round-trips.",
    },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why VisionAI?"
          title="Built for the privacy-first era of AI"
          subtitle="Six reasons VisionAI Studio is the trustworthy way to analyze images."
        />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <GlassCard className="p-6 h-full group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <c.icon size={20} className="text-brand-200" />
                </div>
                <h3 className="font-display font-semibold text-white text-lg">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{c.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyOnDevice() {
  const points = [
    {
      icon: WifiOff,
      title: "Truly offline",
      desc: "Once the model is cached, VisionAI works with the network cable unplugged.",
    },
    {
      icon: ShieldCheck,
      title: "Private by architecture",
      desc: "There is no backend to breach. Your images exist only in memory and LocalStorage.",
    },
    {
      icon: Zap,
      title: "Low latency",
      desc: "No round-trip to a cloud API. Inference starts the instant you drop an image.",
    },
    {
      icon: Cpu,
      title: "Your hardware, your speed",
      desc: "TensorFlow.js taps your GPU via WebGL for hardware-accelerated inference.",
    },
  ];
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why on-device AI"
              title="Privacy isn't a setting. It's the architecture."
              subtitle="Most 'AI' apps ship your data to a cloud model. VisionAI flips the model: the AI comes to your data."
            />
            <div className="mt-8 space-y-4">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <p.icon size={18} className="text-brand-300" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{p.title}</div>
                      <div className="text-sm text-slate-400 mt-0.5">{p.desc}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1}>
            <GlassCard strong bordered className="p-8">
              <div className="text-center">
                <div className="text-6xl font-display font-extrabold text-gradient">100%</div>
                <div className="mt-2 text-slate-400">Privacy Score</div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  { v: "0", l: "Cloud calls" },
                  { v: "0", l: "Uploads" },
                  { v: "100%", l: "On-device" },
                ].map((s) => (
                  <div key={s.l} className="glass p-3">
                    <div className="text-xl font-display font-bold text-white">{s.v}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Architecture() {
  const flow = [
    { label: "User", icon: Eye },
    { label: "Browser", icon: Cpu },
    { label: "TensorFlow.js", icon: Brain },
    { label: "MobileNet v2", icon: Layers },
    { label: "Results", icon: ScanEye },
    { label: "LocalStorage", icon: Lock },
  ];
  return (
    <section id="architecture" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Architecture"
          title="A pipeline that never leaves your device"
          subtitle="Every stage runs locally — from the moment you drop an image to the moment the report is saved."
        />
        <Reveal delay={0.1}>
          <GlassCard strong className="p-8 mt-12 overflow-hidden">
            <div className="flex flex-col items-center gap-3">
              {flow.map((node, i) => (
                <div key={node.label} className="flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 glass-strong px-5 py-3 min-w-[220px]"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500/30 to-accent-500/20 border border-white/10 flex items-center justify-center">
                      <node.icon size={16} className="text-brand-200" />
                    </div>
                    <span className="font-medium text-white">{node.label}</span>
                  </motion.div>
                  {i < flow.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.05 }}
                      className="h-7 w-px bg-gradient-to-b from-brand-400/60 to-accent-400/40 origin-top"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <BadgeRow />
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function DemoPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Demo preview"
          title="See the studio in action"
          subtitle="A glimpse of the dashboard — upload, analyze, and explore results."
        />
        <Reveal delay={0.1}>
          <div className="relative mt-12">
            <div className="absolute -inset-6 bg-gradient-to-r from-brand-500/15 to-accent-500/15 blur-3xl rounded-full" />
            <GlassCard strong bordered className="relative p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 aspect-[16/10] rounded-xl bg-gradient-to-br from-ink-800 to-ink-900 border border-white/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid-glow opacity-60" />
                  <div className="relative text-center">
                    <ScanEye size={56} className="text-brand-300/80 mx-auto animate-floaty" />
                    <div className="mt-3 text-slate-400 text-sm">Drop an image to analyze</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="glass p-4">
                    <div className="text-xs text-slate-500 mb-1">Top prediction</div>
                    <div className="text-white font-semibold">Golden retriever</div>
                    <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full w-[88%] bg-gradient-to-r from-brand-500 to-accent-400" />
                    </div>
                    <div className="mt-1 text-xs text-slate-400 font-mono">88.4%</div>
                  </div>
                  <div className="glass p-4">
                    <div className="text-xs text-slate-500 mb-1">Extracted text</div>
                    <div className="text-sm text-slate-300 font-mono">“PET FOOD · 2 KG”</div>
                  </div>
                  <div className="glass p-4">
                    <div className="text-xs text-slate-500 mb-2">Color palette</div>
                    <div className="flex gap-1.5">
                      {["#d4a373", "#a67c52", "#5b4636", "#2a1f17", "#f5e6d3"].map((c) => (
                        <div
                          key={c}
                          className="w-7 h-7 rounded-md border border-white/10"
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Privacy panel"
          title="Proof, not promises"
          subtitle="Open your browser's DevTools → Network tab during analysis. You'll see zero inference requests leave your device."
        />
        <div className="mt-12">
          <PrivacyCards />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="glass overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-medium text-white">{f.q}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    className="text-brand-300 text-2xl leading-none shrink-0"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: open === i ? "auto" : 0,
                    opacity: open === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Wordmark />
          <div className="text-xs text-slate-500">
            Built for the On-Device AI Hackathon · 100% local · MIT License
          </div>
        </div>
      </div>
    </footer>
  );
}
