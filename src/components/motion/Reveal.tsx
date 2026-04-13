"use client";

import { motion, type MotionProps } from "framer-motion";

type Props = MotionProps & {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
};

export function Reveal({ children, className, as = "div", ...rest }: Props) {
  const Comp: any = as === "section" ? motion.section : motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

