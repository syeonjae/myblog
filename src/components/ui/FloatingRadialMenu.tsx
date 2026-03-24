"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MusicPanel from "@/components/blog/MusicPanel";

const RADIUS = 75;

export default function FloatingRadialMenu() {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      <motion.div
        className="absolute bottom-[6px] right-[6px]"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: open ? 1 : 0 }
            : {
                opacity: open ? 1 : 0,
                scale: open ? 1 : 0.6,
                x: open ? -RADIUS : 0,
                y: 0,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <MusicPanel
          buttonLabel="♪"
          buttonClassName="flex h-11 w-11 items-center justify-center rounded-full border border-fuchsia-300/40 bg-[#1a1322]/95 text-base text-fuchsia-100 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur hover:bg-[#241935]"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-[6px] right-[6px]"
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        initial={false}
        animate={
          reducedMotion
            ? { opacity: open ? 1 : 0 }
            : {
                opacity: open ? 1 : 0,
                scale: open ? 1 : 0.6,
                x: 0,
                y: open ? -RADIUS : 0,
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.06 }}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            setOpen(false);
          }}
          aria-label="맨 위로 이동"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-fuchsia-300/40 bg-[#1a1322]/95 text-base text-fuchsia-100 shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur hover:bg-[#241935]"
        >
          ↑
        </button>
      </motion.div>

      <button
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        onClick={() => setOpen((prev) => !prev)}
        className="absolute bottom-0 right-0 h-14 w-14 rounded-full border border-fuchsia-300/50 bg-black/60 text-xl text-fuchsia-200 shadow-[0_12px_32px_rgba(0,0,0,0.45)] backdrop-blur transition hover:bg-black/75"
        aria-label="Open quick menu"
      >
        {open ? "×" : "+"}
      </button>
    </div>
  );
}
