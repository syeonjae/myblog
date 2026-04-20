"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

type Track = { id: string; tag: string; title: string; src: string };

const TRACKS: Track[] = [
  {
    id: "vinyl-night",
    tag: "chet baker",
    title: "My Funny Valentine",
    src: "/music/My_Funny_Valentine.mp3",
  },
];

type MusicPanelProps = {
  buttonClassName?: string;
  buttonLabel?: string;
};

export default function MusicPanel({
  buttonClassName,
  buttonLabel = "Music",
}: MusicPanelProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(TRACKS[0].id);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.1);
  const [mobileHelpOpen, setMobileHelpOpen] = useState(false);
  const mounted = typeof window !== "undefined";

  const currentTrack = useMemo(
    () => TRACKS.find((t) => t.id === currentTrackId) ?? TRACKS[0],
    [currentTrackId],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onEnded = () => setPlaying(false);
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        audio.pause();
      } else {
        await audio.play();
      }
    } catch {
      setIsOpen(true);
    }
  };

  const selectTrack = async (trackId: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = playing;
    setCurrentTrackId(trackId);
    audio.src = TRACKS.find((t) => t.id === trackId)?.src ?? "";
    audio.load();

    if (wasPlaying) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    }
  };

  const modalNode = (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/50"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="fixed left-1/2 top-1/2 z-[60] w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#171220]/95 p-5 shadow-2xl backdrop-blur"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-zinc-100">MUSIC</h3>

                <div className="group relative">
                  <button
                    type="button"
                    onClick={() => setMobileHelpOpen((prev) => !prev)}
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-white/30 text-[11px] text-zinc-300"
                  >
                    ?
                  </button>

                  <div className="pointer-events-none absolute left-1/2 top-7 hidden w-64 -translate-x-1/2 rounded-lg border border-white/20 bg-black/85 p-2 text-[11px] leading-relaxed text-zinc-200 group-hover:block md:block md:opacity-0 md:group-hover:opacity-100 md:transition-opacity">
                    모바일 브라우저 정책상 재생 버튼을 눌러야 음악이 시작됩니다.
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/20 px-2 py-1 text-xs text-zinc-300 hover:bg-white/10"
              >
                닫기
              </button>
            </div>

            {mobileHelpOpen && (
              <div className="mb-4 rounded-lg border border-white/20 bg-black/50 p-2 text-xs text-zinc-300 md:hidden">
                모바일 브라우저 정책상 재생 버튼을 눌러야 음악이 시작됩니다.
              </div>
            )}

            <div className="space-y-2">
              {TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track.id)}
                  className={`w-full rounded-xl border px-3 py-2 text-left text-sm transition ${
                    track.id === currentTrackId
                      ? "border-fuchsia-300/60 bg-fuchsia-300/10 text-fuchsia-100"
                      : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  {track.title}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs text-zinc-400">볼륨</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-fuchsia-300"
              />
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={togglePlay}
                className="flex-1 rounded-xl bg-fuchsia-400/90 px-4 py-2 text-sm font-medium text-black transition hover:bg-fuchsia-300"
              >
                {playing ? "일시정지" : "재생"}
              </button>
              <button
                onClick={() => {
                  const audio = audioRef.current;
                  if (!audio) return;
                  audio.pause();
                  audio.currentTime = 0;
                  setPlaying(false);
                }}
                className="rounded-xl border border-white/15 px-4 py-2 text-sm text-zinc-200 hover:bg-white/10"
              >
                정지
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <audio ref={audioRef} src={currentTrack.src} loop preload="none" />

      <button
        onClick={() => setIsOpen(true)}
        aria-label="음악 설정 열기"
        className={
          buttonClassName ??
          "rounded-full border border-fuchsia-300/40 bg-black/40 px-4 py-2 text-sm text-fuchsia-200 backdrop-blur transition hover:bg-black/60"
        }
      >
        {buttonLabel}
      </button>

      {mounted ? createPortal(modalNode, document.body) : null}
    </>
  );
}
