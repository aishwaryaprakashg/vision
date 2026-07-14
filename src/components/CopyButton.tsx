import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1400);
        });
      }}
      className="btn-ghost text-xs"
      aria-label="Copy to clipboard"
    >
      <motion.span
        key={copied ? "c" : "n"}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-1.5"
      >
        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
        {copied ? "Copied" : label}
      </motion.span>
    </button>
  );
}
