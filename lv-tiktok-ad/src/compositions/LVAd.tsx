import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

// ── Scene 1: Produktaufnahme (0–3s = frame 0–89) ──────────────────────────────
const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 30], [1.08, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "#1a1208", alignItems: "center", justifyContent: "center" }}>
      {/* Bag silhouette */}
      <div style={{ opacity, transform: `scale(${scale})`, position: "relative" }}>
        <BagSVG />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(181,153,89,0.25) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />
      </div>

      {/* Brand label */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: "clamp" }),
          fontFamily: "'Georgia', serif",
          fontSize: 22,
          letterSpacing: 10,
          color: "#b59959",
          textTransform: "uppercase",
        }}
      >
        Louis Vuitton
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: Zoom auf Details (3–7s = frame 90–209) ───────────────────────────
const Scene2: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 120], [1, 1.55], { extrapolateRight: "clamp" });
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  // Camera pan: moves right then down
  const translateX = interpolate(frame, [0, 60, 120], [0, -60, -30]);
  const translateY = interpolate(frame, [0, 60, 120], [0, 20, 70]);

  return (
    <AbsoluteFill style={{ background: "#0f0b05", overflow: "hidden", opacity }}>
      <AbsoluteFill
        style={{
          transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <BagSVG />
      </AbsoluteFill>

      {/* Monogram label overlay */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 60,
          opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: "clamp" }),
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          letterSpacing: 4,
          color: "#b59959",
          textTransform: "uppercase",
          borderLeft: "2px solid #b59959",
          paddingLeft: 16,
          lineHeight: 1.8,
        }}
      >
        Monogram Canvas
        <br />
        <span style={{ fontSize: 11, opacity: 0.7 }}>Iconic Pattern · Savoir-Faire</span>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 3: Luxus-Textanimation (7–11s = frame 210–329) ─────────────────────
const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = ["Timeless.", "Iconic.", "Yours."];

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #0a0800 0%, #1e1508 60%, #0a0800 100%)",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Decorative line top */}
      <div
        style={{
          width: interpolate(frame, [0, 30], [0, 200], { extrapolateRight: "clamp" }),
          height: 1,
          background: "#b59959",
          marginBottom: 8,
        }}
      />

      {words.map((word, i) => {
        const startFrame = i * 28;
        const wordOpacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const wordY = interpolate(frame, [startFrame, startFrame + 18], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={word}
            style={{
              opacity: wordOpacity,
              transform: `translateY(${wordY}px)`,
              fontFamily: "'Georgia', serif",
              fontSize: i === 2 ? 58 : 46,
              letterSpacing: 6,
              color: i === 2 ? "#b59959" : "#f0e6cc",
              textTransform: "uppercase",
              fontStyle: i === 2 ? "italic" : "normal",
            }}
          >
            {word}
          </div>
        );
      })}

      {/* Decorative line bottom */}
      <div
        style={{
          width: interpolate(frame, [60, 90], [0, 200], { extrapolateRight: "clamp" }),
          height: 1,
          background: "#b59959",
          marginTop: 8,
        }}
      />

      {/* LV monogram watermark */}
      <div
        style={{
          position: "absolute",
          opacity: 0.06,
          fontSize: 320,
          fontFamily: "'Georgia', serif",
          fontWeight: "bold",
          color: "#b59959",
          letterSpacing: -10,
          userSelect: "none",
        }}
      >
        LV
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4: Call-To-Action (11–15s = frame 330–449) ─────────────────────────
const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Pulsing button
  const buttonScale = 1 + 0.03 * Math.sin((frame / fps) * Math.PI * 2);

  const slideUp = interpolate(frame, [10, 40], [30, 0], { extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0800",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        opacity: bgOpacity,
      }}
    >
      {/* Bag – small, top */}
      <div style={{ transform: "scale(0.55)", marginBottom: -20 }}>
        <BagSVG />
      </div>

      {/* Headline */}
      <div
        style={{
          transform: `translateY(${slideUp}px)`,
          opacity: textOpacity,
          textAlign: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 15,
            letterSpacing: 8,
            color: "#b59959",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          New Collection 2025
        </div>
        <div
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: 32,
            letterSpacing: 4,
            color: "#f0e6cc",
            textTransform: "uppercase",
          }}
        >
          Monogram Canvas Bag
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${buttonScale}) translateY(${slideUp * 0.5}px)`,
          opacity: interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" }),
          background: "#b59959",
          color: "#0a0800",
          fontFamily: "'Georgia', serif",
          fontSize: 14,
          letterSpacing: 5,
          textTransform: "uppercase",
          padding: "14px 44px",
          border: "none",
          cursor: "pointer",
          marginBottom: 24,
        }}
      >
        Shop Now
      </div>

      {/* Social / URL */}
      <div
        style={{
          opacity: interpolate(frame, [50, 75], [0, 1], { extrapolateRight: "clamp" }),
          fontFamily: "monospace",
          fontSize: 13,
          letterSpacing: 2,
          color: "rgba(181,153,89,0.6)",
          textTransform: "lowercase",
        }}
      >
        lv.com · @LouisVuitton
      </div>

      {/* Swipe hint */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: interpolate(frame, [70, 90], [0, 0.8], { extrapolateRight: "clamp" }),
          fontSize: 12,
          letterSpacing: 3,
          color: "#b59959",
          textTransform: "uppercase",
          fontFamily: "'Georgia', serif",
        }}
      >
        ↑ Swipe Up
      </div>
    </AbsoluteFill>
  );
};

// ── Bag SVG (Monogram-style silhouette) ───────────────────────────────────────
const BagSVG: React.FC = () => (
  <svg width="260" height="280" viewBox="0 0 260 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Handle */}
    <path
      d="M90 80 Q90 30 130 30 Q170 30 170 80"
      stroke="#b59959"
      strokeWidth="10"
      strokeLinecap="round"
      fill="none"
    />
    {/* Bag body */}
    <rect x="30" y="75" width="200" height="160" rx="14" fill="#2a1f0a" />
    <rect x="30" y="75" width="200" height="160" rx="14" stroke="#b59959" strokeWidth="2" />
    {/* Monogram pattern — repeating LV motifs */}
    {[0, 1, 2, 3].map((row) =>
      [0, 1, 2, 3].map((col) => (
        <text
          key={`${row}-${col}`}
          x={46 + col * 50}
          y={108 + row * 40}
          fill="#b59959"
          fillOpacity="0.35"
          fontSize="14"
          fontFamily="Georgia, serif"
          fontWeight="bold"
          transform={`rotate(-15, ${46 + col * 50}, ${108 + row * 40})`}
        >
          LV
        </text>
      ))
    )}
    {/* Centre clasp */}
    <rect x="112" y="145" width="36" height="22" rx="4" fill="#b59959" />
    <text x="122" y="161" fill="#0a0800" fontSize="10" fontFamily="Georgia, serif" fontWeight="bold">
      LV
    </text>
    {/* Bottom seam */}
    <line x1="50" y1="235" x2="210" y2="235" stroke="#b59959" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
  </svg>
);

// ── Root Composition ──────────────────────────────────────────────────────────
export const LVAd: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#0a0800" }}>
      {/* Scene 1: 0–89 (3 s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene1 />
      </Sequence>

      {/* Scene 2: 90–209 (4 s) */}
      <Sequence from={90} durationInFrames={120}>
        <Scene2 />
      </Sequence>

      {/* Scene 3: 210–329 (4 s) */}
      <Sequence from={210} durationInFrames={120}>
        <Scene3 />
      </Sequence>

      {/* Scene 4: 330–449 (4 s) */}
      <Sequence from={330} durationInFrames={120}>
        <Scene4 />
      </Sequence>
    </AbsoluteFill>
  );
};
