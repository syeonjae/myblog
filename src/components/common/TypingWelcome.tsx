"use client";

import { useEffect, useState } from "react";

const MESSAGE = "연재로그에 오신 걸 환영해요";

export default function TypingWelcome() {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setText(MESSAGE.slice(0, index));

      if (index >= MESSAGE.length) {
        clearInterval(timer);
      }
    }, 95);

    return () => clearInterval(timer);
  }, []);

  return (
    <h2 className="mt-3 text-2xl font-bold text-zinc-100 sm:text-3xl">
      {text}
      <span className="ml-0.5 inline-block text-zinc-400 animate-pulse ">
        |
      </span>
    </h2>
  );
}
