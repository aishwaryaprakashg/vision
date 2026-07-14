import { motion, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  strong?: boolean;
  bordered?: boolean;
  className?: string;
}

export function GlassCard({
  children,
  strong,
  bordered,
  className = "",
  ...rest
}: GlassCardProps) {
  const base = strong ? "glass-strong" : "glass";
  const border = bordered ? "gradient-border" : "";
  return (
    <motion.div
      className={`${base} ${border} ${className} shadow-float`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
