"use client";

import { useEffect, useState } from "react";

const MESSAGE = "일상, 취미를 차분하게 기록합니다.";

export default function TypingParagraph() {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    const delay = setTimeout(() => {
      timer = setInterval(() => {
        index += 1;
        setText(MESSAGE.slice(0, index));

        if (index >= MESSAGE.length && timer) {
          clearInterval(timer);
        }
      }, 100);
    }, 1900);

    return () => {
      clearTimeout(delay);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <p className="mx-auto mt-3 max-w-2xl text-sm text-zinc-300 sm:text-base">
      {text}
    </p>
  );
}
