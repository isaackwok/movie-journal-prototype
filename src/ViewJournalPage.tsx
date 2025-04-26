import React, { useState } from 'react';
import EmotionIcons from './EmotionIcons';
import SharePosterModal from './SharePosterModal';

// 只顯示單一 icon 的 component
const EmotionIconDisplay: React.FC<{ label: string }> = ({ label }) => {
  // EmotionIcons.tsx 的 emotions 陣列
  const emotions = [
    { key: '感動', label: '感動', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><path d="M15 25 Q20 28 25 25" stroke="black" strokeWidth="1" fill="none"/><ellipse cx="14" cy="21" rx="0.7" ry="1.2" fill="blue"/><ellipse cx="26" cy="21" rx="0.7" ry="1.2" fill="blue"/></svg> },
    { key: '興奮', label: '興奮', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="16" r="1" fill="black"/><circle cx="26" cy="16" r="1" fill="black"/><path d="M15 24 Q20 32 25 24" stroke="black" strokeWidth="1" fill="none"/><line x1="20" y1="8" x2="20" y2="12" stroke="black" strokeWidth="1"/><line x1="16" y1="10" x2="18" y2="14" stroke="black" strokeWidth="1"/><line x1="24" y1="10" x2="22" y2="14" stroke="black" strokeWidth="1"/></svg> },
    { key: '失落', label: '失落', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 27 Q20 23 25 27" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '憤怒', label: '憤怒', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><path d="M15 27 Q20 23 25 27" stroke="black" strokeWidth="1" fill="none"/><path d="M12 13 Q14 15 16 13" stroke="black" strokeWidth="1" fill="none"/><path d="M24 13 Q26 15 28 13" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '溫馨', label: '溫馨', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><path d="M15 26 Q20 30 25 26" stroke="black" strokeWidth="1" fill="none"/><path d="M18 22 Q20 24 22 22" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '震撼', label: '震撼', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><ellipse cx="20" cy="25" rx="2" ry="3" stroke="black" strokeWidth="1" fill="white"/></svg> },
    { key: '困惑', label: '困惑', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 27 Q20 25 25 27" stroke="black" strokeWidth="1" fill="none"/><path d="M18 14 Q20 16 22 14" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '無聊', label: '無聊', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><rect x="15" y="25" width="10" height="2" rx="1" fill="black"/></svg> },
    { key: '療癒', label: '療癒', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 25 Q20 28 25 25" stroke="black" strokeWidth="1" fill="none"/><path d="M20 25 Q21 22 23 24" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '感傷', label: '感傷', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 27 Q20 24 25 27" stroke="black" strokeWidth="1" fill="none"/><ellipse cx="14" cy="21" rx="0.7" ry="1.2" fill="blue"/></svg> },
    { key: '歡樂', label: '歡樂', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="16" r="1" fill="black"/><circle cx="26" cy="16" r="1" fill="black"/><path d="M15 24 Q20 32 25 24" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '驚喜', label: '驚喜', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="16" r="1" fill="black"/><circle cx="26" cy="16" r="1" fill="black"/><ellipse cx="20" cy="25" rx="1.5" ry="2.5" stroke="black" strokeWidth="1" fill="white"/></svg> },
    { key: '害怕', label: '害怕', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><path d="M15 26 Q20 20 25 26" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '啟發', label: '啟發', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="17" r="1" fill="black"/><circle cx="26" cy="17" r="1" fill="black"/><path d="M15 25 Q20 28 25 25" stroke="black" strokeWidth="1" fill="none"/><line x1="20" y1="8" x2="20" y2="12" stroke="black" strokeWidth="1"/></svg> },
    { key: '懷舊', label: '懷舊', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 27 Q20 26 25 27" stroke="black" strokeWidth="1" fill="none"/><path d="M10 12 Q20 5 30 12" stroke="black" strokeWidth="1" fill="none"/></svg> },
    { key: '平靜', label: '平靜', svg: <svg width="40" height="40" viewBox="0 0 40 40"><rect x="3" y="3" width="34" height="34" rx="8" stroke="black" strokeWidth="1" fill="white"/><circle cx="14" cy="18" r="1" fill="black"/><circle cx="26" cy="18" r="1" fill="black"/><path d="M15 26 Q20 27 25 26" stroke="black" strokeWidth="1" fill="none"/></svg> },
  ];
  const found = emotions.find(e => e.label === label);
  return found ? <span style={{ fontSize: 40 }}>{found.svg}</span> : null;
};

// 假設 journal 資料結構如下，可依實際調整
export type ViewJournalPageProps = {
  journal: {
    movieTitle: string;
    original_title?: string;
    date: string;
    backdrops: string[]; // 劇照 url 陣列
    emotion: { label: string; icon: string; reason: string; };
    note: string;
    director?: string;
    cast?: string[];
    leadingActors?: string[];
  };
  onBack: () => void;
};

const ViewJournalPage: React.FC<ViewJournalPageProps> = ({ journal, onBack }) => {
  const [shareOpen, setShareOpen] = useState(false);
  // 分享到 Instagram Story
  const handleShareToInstagram = (imgDataUrl: string) => {
    // 使用 Instagram Stories API
    const ua = navigator.userAgent;
    // 只在手機瀏覽器觸發
    if (/Android|iPhone|iPad|iPod/i.test(ua)) {
      // 利用 Web Intent
      const blob = dataURLtoBlob(imgDataUrl);
      const file = new File([blob], 'poster.png', { type: 'image/png' });
      // 嘗試用 Web Share API
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: '分享電影日記', text: '我的電影日記' });
        return;
      }
      // Instagram Stories URL Scheme
      const url = `intent://share?backgroundImage=${encodeURIComponent(imgDataUrl)}#Intent;package=com.instagram.android;scheme=https;end`;
      window.location.href = url;
    } else {
      // 桌機 fallback：下載圖片
      const a = document.createElement('a');
      a.href = imgDataUrl;
      a.download = 'movie_journal_poster.png';
      a.click();
      alert('已下載圖片，請用手機 IG 上傳至限動');
    }
  };
  // base64 轉 blob
  function dataURLtoBlob(dataurl: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] ?? 'image/png';
    const bstr = atob(arr[1] ?? '');
    let n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
  }

  return (
    <div className="iphone-container" style={{
      background: '#111',
      minHeight: '100vh',
      maxWidth: 393,
      margin: '0 auto',
      borderRadius: 32,
      color: '#fff',
      position: 'relative',
      boxShadow: '0 2px 24px #0008',
      overflowY: 'auto',
      fontFamily: 'inherit',
    }}>
      {/* Header + Title + 分享按鈕 */}
      <div style={{
        borderRadius: 0,
        margin: '0',
        padding: '36px 0 0 0',
        width: '100%',
        boxSizing: 'border-box',
        background: 'transparent',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0 24px', position: 'relative' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 28, color: '#fff', cursor: 'pointer', lineHeight: 1 }} aria-label="back">←</button>
          <button onClick={() => setShareOpen(true)}
            style={{ background: 'none', border: 'none', fontSize: 24, color: '#fff', cursor: 'pointer', marginLeft: 'auto', marginRight: 0 }}
            aria-label="share"
            title="分享">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="28" height="28" rx="14" fill="black"/>
  <path d="M14 8V19" stroke="white" strokeWidth={2} strokeLinecap="round"/>
  <path d="M10 12L14 8L18 12" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
  <rect x="7" y="13" width="14" height="14" rx="2" stroke="white" strokeWidth={2}/>
</svg>
          </button>
        </div>
        <div className="special-font" style={{
          fontSize: 36,
          color: '#fff',
          textAlign: 'center',
          fontWeight: 400,
          letterSpacing: 1,
          margin: '10px 0 0 0',
        }}>{journal?.movieTitle ?? ''}</div>
        <div style={{ textAlign: 'center', color: '#aaa', fontSize: 15, margin: '8px 0 0 0', fontWeight: 500 }}>{journal?.date ?? ''}</div>
      </div>
      <SharePosterModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        backdrops={journal?.backdrops?.slice(0, 3) ?? []}
        movieOriginalTitle={journal?.original_title && journal.original_title.trim() ? journal.original_title : journal?.movieTitle}
        onShare={handleShareToInstagram}
      />
      {/* 第一張 backdrops */}
      {journal.backdrops && journal.backdrops[0] && (
        <div style={{ background: '#18181b', borderRadius: 0, margin: '0 0 16px 0', padding: 0, width: '100%' }}>
          <img
            src={journal.backdrops[0]}
            alt="backdrop1"
            style={{ display: 'block', width: '100%', maxHeight: 260, objectFit: 'cover', background: '#222', borderRadius: 0, margin: 0 }}
          />
        </div>
      )}
      {/* Emotion 區塊 */}
      {journal.emotion && (
  <div style={{ background: '#18181b', borderRadius: 0, margin: '0 0 16px 0', padding: '20px 20px 20px 24px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <span style={{ color: '#bbb', fontWeight: 500, fontSize: 15, marginBottom: 10 }}>I felt</span>
      {/* 顯示 emotion icon，根據 label 對應 EmotionIcons.tsx 的 svg */}
      <EmotionIconDisplay label={journal.emotion.label} />
    </div>
    {journal.emotion.reason && journal.emotion.reason.trim() && (
      <>
        <div style={{ color: '#bbb', fontWeight: 500, fontSize: 15, marginTop: 28, marginLeft: 32 }}>because</div>
        <div style={{ fontSize: 18, color: '#fff', marginTop: 8, marginLeft: 32, marginRight: 32, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{journal.emotion.reason}</div>
      </>
    )}
  </div>
)}
      {/* 第二張 backdrops */}
      {journal.backdrops && journal.backdrops[1] && (
        <div style={{ background: '#18181b', borderRadius: 0, margin: '0 0 16px 0', padding: 0, width: '100%' }}>
          <img
            src={journal.backdrops[1]}
            alt="backdrop2"
            style={{ display: 'block', width: '100%', maxHeight: 260, objectFit: 'cover', background: '#222', borderRadius: 0, margin: 0 }}
          />
        </div>
      )}
      {/* Note 文字內容區塊 */}
      {journal.note && (
        <div style={{ background: '#18181b', borderRadius: 0, margin: '0 0 16px 0', padding: '20px 20px 20px 24px', color: '#fff', textAlign: 'left', fontSize: 15, lineHeight: 1.7 }}>
          <div style={{ color: '#bbb', fontSize: 15, fontWeight: 500, marginBottom: 12 }}>thoughts and feelings</div>
          {journal.note}
        </div>
      )}
      {/* credits block 上方顯示特定 backdrop */}
      {journal.backdrops && journal.backdrops.length >= 2 && (
        <div style={{ background: '#18181b', borderRadius: 0, margin: '0 0 16px 0', padding: 0, width: '100%' }}>
          <img
            src={journal.backdrops[journal.backdrops.length === 2 ? 1 : journal.backdrops.length - 1]}
            alt="backdrop"
            style={{ display: 'block', width: '100%', maxHeight: 260, objectFit: 'cover', background: '#222', borderRadius: 0, margin: 0 }}
          />
        </div>
      )}
      {/* 這裡是 journal 內容的結尾區塊 */}
      <div className="credits-block-detail credits-block-custom">
        <div className="credits-title">CREDITS</div>
        <div className="credits-table">
          <div className="credits-label">Movie</div>
          <div className="credits-value">{journal.original_title || journal.movieTitle}</div>
          <div className="credits-label">Director</div>
          <div className="credits-value">{journal.director ?? ''}</div>
          <div className="credits-label">Casts</div>
          <div className="credits-value">{Array.isArray(journal.cast) ? journal.cast.slice(0, 3).join(', ') : ''}</div>
          <div className="credits-label">Journal Writer</div>
          <div className="credits-value">Jonas</div>
          <div className="credits-label">Log Date</div>
          <div className="credits-value">{journal.date}</div>
          <div className="credits-label">Duration</div>
          <div className="credits-value">5 min 19 sec</div>
        </div>
      </div>
      <div style={{height:200}} />
      <style>{`
        .credits-block-custom {
          background: #18181b;
          border-radius: 0;
          padding: 30px 36px 36px 36px;
          margin: 36px auto 0 auto;
          max-width: 400px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .credits-title {
          font-family: inherit;
          font-size: 16px;
          font-weight: 400;
          color: #aaa;
          letter-spacing: 0.3px;
          margin-bottom: 36px;
          text-align: center;
        }
        .credits-table {
          display: grid;
          grid-template-columns: 120px 1fr;
          row-gap: 12px;
          column-gap: 20px;
          width: 100%;
          max-width: 340px;
        }
        .credits-label {
          text-align: right;
          font-weight: 600;
          color: #eee;
          font-size: 14px;
          letter-spacing: 0.3px;
        }
        .credits-value {
          text-align: left;
          font-weight: 400;
          color: #fff;
          font-size: 14px;
          letter-spacing: 0.3px;
          word-break: break-word;
        }
        @media (max-width: 500px) {
          .credits-block-custom {
            padding: 28px 8vw 24px 8vw;
          }
          .credits-table {
            max-width: 100%;
            grid-template-columns: 90px 1fr;
            column-gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default ViewJournalPage;
