"use client";

export default function Marquee({ children, speed = 30, reverse = false }) {
  return (
    <div className="marquee-wrapper" aria-hidden="true">
      <div
        className="marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <span className="marquee-content">{children}</span>
        <span className="marquee-content">{children}</span>
        <span className="marquee-content">{children}</span>
      </div>
    </div>
  );
}
