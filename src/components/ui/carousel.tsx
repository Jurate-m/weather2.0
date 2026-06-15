"use client";

import { useRef } from "react";

type CarouselType = {
  children: React.ReactNode;
  className?: string;
};

export default function Carousel({ children, className }: CarouselType) {
  const carousel = useRef<HTMLDivElement>(null);
  const position = useRef({
    pressed: false,
    moving: false,
    pressX: 0, // Pointer press X coord
    elX: 0, // Elements X position
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    const el = carousel.current;

    if (!el) return;

    position.current = {
      ...position.current,
      pressed: true,
      pressX: e.pageX,
      elX: el.scrollLeft,
    };
  };

  const handlePointerLeave = (e: React.PointerEvent) => {
    if (!position.current.pressed) return;

    position.current = {
      ...position.current,
      pressed: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = carousel.current;

    if (!el || !position.current.pressed) return;

    const dx = e.pageX - position.current.pressX;

    el.scrollLeft = position.current.elX - dx;
  };

  return (
    <div
      ref={carousel}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerLeave}
      onPointerMove={handlePointerMove}
      className={["scrollbar overflow-auto", className].join(" ")}
    >
      {children}
    </div>
  );
}
