"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function VinylBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(169,112,255,0.20),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(103,232,214,0.14),transparent_45%),linear-gradient(180deg,#0E0B12,#14101C_45%,#0C0A11)]" />
      <div className="absolute inset-0 opacity-[0.09] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22 viewBox=%220 0 4 4%22%3E%3Cpath fill=%22%23ffffff%22 fill-opacity=%220.7%22 d=%22M1 1h1v1H1z%22/%3E%3C/svg%3E')]" />

      <motion.div
        animate={reduced ? undefined : { rotate: 360 }}
        transition={reduced ? undefined : { repeat: Infinity, duration: 24, ease: "linear" }}
        className="absolute -left-36 top-28 h-[460px] w-[460px] rounded-full border border-white/15 bg-[radial-gradient(circle_at_center,#111_0_22%,#1f1629_22_32%,#0f0b14_32_42%,#1f1629_42_52%,#0f0b14_52_100%)] opacity-55 shadow-[0_0_60px_rgba(0,0,0,0.55)]"
      >
        <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-200/80" />
      </motion.div>

      <motion.div
        animate={reduced ? undefined : { rotate: -360 }}
        transition={reduced ? undefined : { repeat: Infinity, duration: 34, ease: "linear" }}
        className="absolute -right-52 bottom-[-120px] h-[620px] w-[620px] rounded-full border border-white/10 bg-[radial-gradient(circle_at_center,#0e0c13_0_24%,#241935_24_34%,#100c17_34_44%,#241935_44_54%,#100c17_54_100%)] opacity-35"
      >
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-300/60" />
      </motion.div>
    </div>
  );
}
