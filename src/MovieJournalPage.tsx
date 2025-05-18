import React, { useState, useRef, useEffect } from "react";
import "./MovieJournalPage.css";
import EmotionSection from "./MovieJournal/EmotionSection";
import BackdropSection from "./MovieJournal/BackdropSection";
import BackdropsDrawerModal from "./MovieJournal/BackdropsDrawerModal";
import NoteSection from "./MovieJournal/NoteSection";
import type { Movie } from "./types";
import type { Journal } from "./types";

interface Props {
  movie: Movie;
  onBack: () => void;
  onSave: (journal: Journal) => void;
}

// 如需 title/desc，拉出 metaSectionList
const metaSectionList = [
  {
    title: "What do you feel after watching this movie?",
    desc: "Describe your feelings while you are watching the film. Try to focus on a few adjectives.",
  },
  {
    title: "Select the most memorable scenes.",
    desc: "",
  },
  {
    title: "Write down your thoughts.",
    desc: "Describe your feelings while you are watching the film. Tips on how to elaborate…",
  },
];

const MovieJournalPage: React.FC<Props> = ({ movie, onBack, onSave }) => {
  // 所有 state 只宣告一次
  // 所有 state 只宣告一次（請勿重複宣告）
  const [showBackdropModal, setShowBackdropModal] = useState(false);
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState<{
    label: string;
    icon: string;
    reason: string;
  } | null>(null);
  const [selectedBackdrops, setSelectedBackdrops] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  // 卡片 refs
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // step 變動時 anchor
  useEffect(() => {
    const ref = cardRefs[step]?.current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  // 處理 swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchEndY(null);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndY(e.touches[0].clientY);
  };
  const handleTouchEnd = () => {
    if (touchStartY !== null && touchEndY !== null) {
      const delta = touchEndY - touchStartY;
      if (delta < -40) {
        // swipe up
        setStep((s) => Math.min(sectionList.length - 1, s + 1));
      } else if (delta > 40) {
        // swipe down
        setStep((s) => Math.max(0, s - 1));
      }
    }
    setTouchStartY(null);
    setTouchEndY(null);
  };

  const handleSubmit = async () => {
    if (!emotion || !selectedBackdrops || !note.trim()) return;
    setLoading(true);
    const journal: Journal = {
      id: Date.now().toString(),
      movieId: String(movie.id ?? ""),
      movieTitle: movie.title ?? "",
      original_title: (movie as any).original_title ?? movie.title ?? "", // 儲存 TMDB 原始片名
      director: movie.director ?? "",
      cast: Array.isArray(movie.cast) ? movie.cast.slice(0, 3) : [],
      backdrops: selectedBackdrops, // 多選
      emotion: emotion, // 已為物件
      note: note ?? "",
      date: new Date().toLocaleDateString(),
      createdAt: new Date().toISOString(),
    };

    await new Promise((r) => setTimeout(r, 400)); // 模擬 loading
    setLoading(false);
    onSave(journal);
  };

  // 分段切換 UI
  const sectionList = [
    <EmotionSection
      key="emotion"
      emotion={emotion}
      setEmotion={
        setEmotion as (val: {
          label: string;
          icon: string;
          reason: string;
        }) => void
      }
    />,
    <BackdropSection
      key="backdrops"
      backdrops={movie.backdrops}
      selectedBackdrops={selectedBackdrops}
      setSelectedBackdrops={setSelectedBackdrops}
      onViewMore={() => setShowDrawer(true)}
    />,
    <NoteSection key="note" note={note} setNote={setNote} loading={loading} />,
  ];

  return (
    <>
      <div
        className="iphone-container journal-fullscreen"
        style={{
          padding: "0 0 24px 0",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          overflow: "hidden",
          position: "relative",
          maxWidth: 430,
          margin: "0 auto",
          width: "100%",
          height: "100vh",
          background: "#fff",
        }}
      >
        {/* Header */}
        <div
          className="heading"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px 24px 0 24px",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 20,
              color: "#222",
              letterSpacing: 1,
            }}
          >
            Post
          </div>
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              fontSize: 28,
              color: "#888",
              cursor: "pointer",
              lineHeight: 1,
            }}
            aria-label="close"
          >
            ×
          </button>
        </div>
        {/* Movie Title */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 18,
            color: "#222",
            textAlign: "center",
            marginTop: 8,
            marginBottom: 0,
            width: "100%",
          }}
        >
          {movie.title}
        </div>
        {/* Section 切換區 */}
        <div
          style={{
            flex: 1,
            position: "relative",
            width: "100%",
            overflow: "hidden",
            display: "block",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 卡片滑動動畫區 */}
          {/* Section 卡片堆疊區 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {/* 動態卡片堆疊滑動 preview UI */}
            {/* 新增 hooks 與動態高度計算 */}
            {(() => {
              const [cardHeights, setCardHeights] = React.useState<number[]>([
                0, 0, 0,
              ]);
              const cardRefs = [
                React.useRef<HTMLDivElement>(null),
                React.useRef<HTMLDivElement>(null),
                React.useRef<HTMLDivElement>(null),
              ];
              React.useLayoutEffect(() => {
                setCardHeights(
                  cardRefs.map((ref) =>
                    ref.current ? ref.current.offsetHeight : 0
                  )
                );
              }, [emotion, selectedBackdrops, note, step, loading]);
              const translateY = cardHeights
                .slice(0, step)
                .reduce((a, b) => a + b, 0);
              return (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transition: "transform 0.5s cubic-bezier(0.77,0,0.18,1)",
                    transform: `translateY(-${translateY}px)`,
                  }}
                >
                  {/* step0: 主卡片（情緒） */}
                  <div
                    ref={cardRefs[0]}
                    style={{
                      width: "100%",
                      maxWidth: 370,
                      margin: "0 auto",
                      marginBottom: 24,
                      alignSelf: "center",
                      padding: 0,
                      background: "none",
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative",
                    }}
                  >
                    <EmotionSection emotion={emotion} setEmotion={setEmotion} />
                  </div>
                  {/* step1: 劇照卡片 */}
                  <div
                    ref={cardRefs[1]}
                    style={{
                      width: "100%",
                      maxWidth: 370,
                      margin: "0 auto",
                      marginBottom: 24,
                      alignSelf: "center",
                      padding: 0,
                      background: "none",
                      borderRadius: 0,
                      boxShadow: "none",
                      position: "relative",
                      cursor: step === 0 ? "pointer" : "auto",
                      pointerEvents: step === 0 ? "auto" : "auto",
                    }}
                  >
                    <BackdropSection
                      backdrops={movie.backdrops}
                      selectedBackdrops={selectedBackdrops}
                      setSelectedBackdrops={setSelectedBackdrops}
                      onViewMore={() => setShowDrawer(true)}
                    />
                  </div>
                  {/* step2: 筆記卡片 */}
                  <div
                    ref={cardRefs[2]}
                    style={{
                      width: "100%",
                      maxWidth: 370,
                      margin: "0 auto",
                      marginBottom: 24,
                      alignSelf: "center",
                      padding: 0,
                      background: "none",
                      borderRadius: 0,
                      boxShadow: "none",
                      zIndex: 1,
                      cursor: step === 1 ? "pointer" : "auto",
                      pointerEvents: step === 1 ? "auto" : "auto",
                      position: "relative",
                    }}
                    onClick={step === 1 ? () => setStep(2) : undefined}
                  >
                    <NoteSection
                      note={note}
                      setNote={setNote}
                      loading={loading}
                    />
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
        {/* Stepper Controls + 漸層背景 */}
        <div style={{ position: "relative", width: "100%" }}>
          <div className="journal-footer-gradient" />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 32,
              margin: "12px 0 0 0",
              position: "relative",
              zIndex: 1,
            }}
          >
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              style={{
                background: "none",
                border: "none",
                color: step === 0 ? "#ccc" : "#222",
                fontSize: 32,
                cursor: step === 0 ? "not-allowed" : "pointer",
                borderRadius: "50%",
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              disabled={step === 0}
              aria-label="Previous"
            >
              ↑
            </button>
            {step < sectionList.length - 1 ? (
              <button
                onClick={() =>
                  setStep((s) => Math.min(sectionList.length - 1, s + 1))
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#222",
                  fontSize: 32,
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Next"
              >
                ↓
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!note.trim() || loading}
                style={{
                  background: "#222",
                  color: "#fff",
                  border: "none",
                  borderRadius: 22,
                  padding: "8px 32px",
                  fontSize: 17,
                  fontWeight: 600,
                  boxShadow: "0 2px 8px #2222",
                  opacity: !note.trim() || loading ? 0.5 : 1,
                  cursor: !note.trim() || loading ? "not-allowed" : "pointer",
                  minWidth: 120,
                  transition: "opacity 0.2s",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
      <BackdropsDrawerModal
        key={movie.id}
        open={showDrawer}
        backdrops={movie.backdrops}
        selectedBackdrops={selectedBackdrops}
        setSelectedBackdrops={setSelectedBackdrops}
        onClose={() => {
          setShowDrawer(false);
          setStep(1);
        }}
        setStep={setStep}
      />
    </>
  );
};

export default MovieJournalPage;
