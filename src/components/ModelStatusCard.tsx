import { motion } from "framer-motion";
import { Brain, CheckCircle2, Cpu, MemoryStick, Zap } from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { getBackend, MODEL_SIZE_MB } from "@/services/mobilenetService";

export function ModelStatusCard() {
  const backend = getBackend() || "webgl";
  const isWebGL = backend.toLowerCase().includes("webgl");
  return (
    <GlassCard strong bordered className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Cpu size={16} className="text-brand-300" />
        <h3 className="font-display font-semibold text-white text-sm">Model Status</h3>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulseGlow" />
          Loaded
        </span>
      </div>
      <div className="space-y-2.5">
        <ModelRow icon={Brain} label="Model" value="MobileNet v2" />
        <ModelRow icon={CheckCircle2} label="Status" value="Loaded" good />
        <ModelRow icon={Zap} label="Inference" value="On Device" />
        <ModelRow
          icon={Cpu}
          label="GPU"
          value={isWebGL ? "WebGL" : "CPU"}
          good={isWebGL}
        />
        <ModelRow icon={MemoryStick} label="Memory" value={`~${MODEL_SIZE_MB} MB`} />
      </div>
      <div className="mt-4 text-[11px] text-slate-500 leading-relaxed">
        The model is loaded into your browser's memory and reused for every
        analysis. Inference runs on your GPU when WebGL is available.
      </div>
    </GlassCard>
  );
}

function ModelRow({
  icon: Icon,
  label,
  value,
  good,
}: {
  icon: typeof Cpu;
  label: string;
  value: string;
  good?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-between text-sm"
    >
      <span className="flex items-center gap-2 text-slate-400">
        <Icon size={13} className="text-slate-500" />
        {label}
      </span>
      <span className={`font-medium font-mono text-xs ${good ? "text-emerald-300" : "text-white"}`}>
        {value}
      </span>
    </motion.div>
  );
}
