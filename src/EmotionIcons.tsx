import React from "react";

interface Emotion {
  key: string;
  label: string;
  svg: JSX.Element;
}

const emotions: Emotion[] = [
  {
    key: "感動",
    label: "感動",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <path
          d="M15 25 Q20 28 25 25"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="14" cy="21" rx="0.7" ry="1.2" fill="blue" />
        <ellipse cx="26" cy="21" rx="0.7" ry="1.2" fill="blue" />
      </svg>
    ),
  },
  {
    key: "興奮",
    label: "興奮",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="16" r="1" fill="black" />
        <circle cx="26" cy="16" r="1" fill="black" />
        <path
          d="M15 24 Q20 32 25 24"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <line x1="20" y1="8" x2="20" y2="12" stroke="black" strokeWidth="1" />
        <line x1="16" y1="10" x2="18" y2="14" stroke="black" strokeWidth="1" />
        <line x1="24" y1="10" x2="22" y2="14" stroke="black" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: "失落",
    label: "失落",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 27 Q20 23 25 27"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "憤怒",
    label: "憤怒",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <path
          d="M15 27 Q20 23 25 27"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M12 13 Q14 15 16 13"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M24 13 Q26 15 28 13"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "溫馨",
    label: "溫馨",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <path
          d="M15 26 Q20 30 25 26"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M18 22 Q20 24 22 22"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "震撼",
    label: "震撼",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <ellipse
          cx="20"
          cy="25"
          rx="2"
          ry="3"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
      </svg>
    ),
  },
  {
    key: "困惑",
    label: "困惑",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 27 Q20 25 25 27"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M18 14 Q20 16 22 14"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "無聊",
    label: "無聊",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <rect x="15" y="25" width="10" height="2" rx="1" fill="black" />
      </svg>
    ),
  },
  {
    key: "療癒",
    label: "療癒",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 25 Q20 28 25 25"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M20 25 Q21 22 23 24"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "感傷",
    label: "感傷",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 27 Q20 24 25 27"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <ellipse cx="14" cy="21" rx="0.7" ry="1.2" fill="blue" />
      </svg>
    ),
  },
  {
    key: "歡樂",
    label: "歡樂",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="16" r="1" fill="black" />
        <circle cx="26" cy="16" r="1" fill="black" />
        <path
          d="M15 24 Q20 32 25 24"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "驚喜",
    label: "驚喜",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="16" r="1" fill="black" />
        <circle cx="26" cy="16" r="1" fill="black" />
        <ellipse
          cx="20"
          cy="25"
          rx="1.5"
          ry="2.5"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
      </svg>
    ),
  },
  {
    key: "害怕",
    label: "害怕",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <path
          d="M15 26 Q20 20 25 26"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "啟發",
    label: "啟發",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="17" r="1" fill="black" />
        <circle cx="26" cy="17" r="1" fill="black" />
        <path
          d="M15 25 Q20 28 25 25"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <line x1="20" y1="8" x2="20" y2="12" stroke="black" strokeWidth="1" />
      </svg>
    ),
  },
  {
    key: "懷舊",
    label: "懷舊",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 27 Q20 26 25 27"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M10 12 Q20 5 30 12"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
  {
    key: "平靜",
    label: "平靜",
    svg: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <rect
          x="3"
          y="3"
          width="34"
          height="34"
          rx="8"
          stroke="black"
          strokeWidth="1"
          fill="white"
        />
        <circle cx="14" cy="18" r="1" fill="black" />
        <circle cx="26" cy="18" r="1" fill="black" />
        <path
          d="M15 26 Q20 27 25 26"
          stroke="black"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    ),
  },
];

interface EmotionIconsProps {
  value: { label: string; icon: string; reason: string } | null;
  onChange: (val: { label: string; icon: string; reason: string }) => void;
  grid?: number;
}

const EmotionIcons: React.FC<EmotionIconsProps> = ({
  value,
  onChange,
  grid,
}) => {
  if (grid === 4) {
    const rows: Emotion[][] = [];
    for (let i = 0; i < emotions.length; i += 4) {
      rows.push(emotions.slice(i, i + 4));
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          margin: "16px 0",
        }}
      >
        {rows.map((row, idx) => (
          <div key={idx} style={{ display: "flex", gap: 8 }}>
            {row.map((e) => (
              <button
                key={e.key}
                onClick={() =>
                  onChange({ label: e.label, icon: "", reason: "" })
                }
                style={{
                  border:
                    value?.label === e.label
                      ? "2px solid #007aff"
                      : "2px solid #eee",
                  borderRadius: 10,
                  background: "#fff",
                  padding: 2,
                  outline: "none",
                  cursor: "pointer",
                  boxShadow:
                    value?.label === e.label ? "0 0 4px #007aff44" : "none",
                  width: 60,
                  height: 60,
                }}
                title={e.label}
              >
                {e.svg}
                <div style={{ fontSize: 10, color: "#555" }}>{e.label}</div>
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  // default fallback
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "16px 0" }}
    >
      {emotions.map((e) => (
        <button
          key={e.key}
          onClick={() => onChange({ label: e.label, icon: "", reason: "" })}
          style={{
            border:
              value?.label === e.label ? "2px solid #007aff" : "2px solid #eee",
            borderRadius: 10,
            background: "#fff",
            padding: 2,
            outline: "none",
            cursor: "pointer",
            boxShadow: value?.label === e.label ? "0 0 4px #007aff44" : "none",
          }}
          title={e.label}
        >
          {e.svg}
          <div style={{ fontSize: 10, color: "#555" }}>{e.label}</div>
        </button>
      ))}
    </div>
  );
};

export default EmotionIcons;
