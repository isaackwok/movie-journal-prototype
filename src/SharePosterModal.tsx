import React, { useEffect, useRef, useState } from 'react';

interface SharePosterModalProps {
  open: boolean;
  onClose: () => void;
  backdrops: string[];
  movieOriginalTitle: string;
  onShare: (imgDataUrl: string) => void;
}

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 1280; // 9:16

const SharePosterModal: React.FC<SharePosterModalProps> = ({ open, onClose, backdrops, movieOriginalTitle, onShare }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imgUrl, setImgUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (!backdrops || backdrops.length === 0) {
      setImgUrl('');
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(backdrops.slice(0, 3).map(src => loadImage(src)))
      .then(images => {
        const canvas = canvasRef.current;
        if (!canvas) { setLoading(false); return; }
        const ctx = canvas.getContext('2d');
        if (!ctx) { setLoading(false); return; }
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const partH = Math.floor(CANVAS_HEIGHT / 3);
        images.forEach((img, i) => {
          drawCover(ctx, img, 0, i * partH, CANVAS_WIDTH, partH);
        });
        ctx.fillStyle = 'rgba(0,0,0,0.18)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.font = 'bold 54px "Nothing You Could Do", "Avenir", Arial';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 18;
        // special-font + text-shadow
        ctx.save();

        const url = canvas.toDataURL('image/png');
        setImgUrl(url);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [open, backdrops, movieOriginalTitle]);

  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', maxWidth: '100vw', maxHeight: '100vh', background: 'rgba(0,0,0,0.78)', zIndex: 3000, display: open ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
    }}>
      <div style={{
      background: '#18181b', borderRadius: 18, padding: '16px 0 24px 0',
      maxWidth: 393, width: '95vw', minWidth: 320,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      boxShadow: '0 8px 32px #0008', maxHeight: '95vh', overflowY: 'auto'
    }}>
        <div style={{ fontSize: 22, color: '#fff', marginBottom: 12, fontWeight: 600 }}>Share your poster</div>
        <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} style={{ display: 'none' }} />
        {loading && <div style={{ color: '#fff', margin: '40px 0' }}>Image generation in progress...</div>}
        {(!backdrops || backdrops.length === 0) && !loading && (
          <div style={{ color: '#fff', margin: '40px 0', textAlign: 'center' }}>Unable to generate poster</div>
        )}
        {imgUrl && !loading && (
          <img src={imgUrl} alt="poster preview" style={{
  display: 'block',
  margin: '0 auto 18px auto',
  maxWidth: '90vw',
  maxHeight: 340,
  width: 'auto',
  height: 'auto',
  aspectRatio: '9/16',
  borderRadius: 14,
  boxShadow: '0 2px 12px #0005',
  background: '#222',
  objectFit: 'contain'
}} />
        )}
      </div>
      {/* Instagram Story 分享按鈕，置於 modal 最下方，左右置中 */}
      {imgUrl && !loading && (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '0 0 18px 0' }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)',
              color: '#fff', fontWeight: 700, fontSize: 18, border: 'none',
              borderRadius: 10, padding: '14px 32px', cursor: 'pointer',
              boxShadow: '0 2px 8px #0004', transition: 'filter 0.15s',
              outline: 'none',
            }}
            onClick={() => onShare(imgUrl)}
          >
            <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="24" fill="url(#ig-gradient)"/>
              <rect x="14" y="14" width="20" height="20" rx="6" stroke="white" strokeWidth="2.5" fill="none"/>
              <circle cx="24" cy="24" r="6.5" stroke="white" strokeWidth="2.5" fill="none"/>
              <circle cx="31.5" cy="16.5" r="1.5" fill="white"/>
            </svg>
            <span style={{fontWeight:700, letterSpacing:1}}>Instagram Story</span>
          </button>
        </div>
      )}
      </div>
  );
};

// 支援 Web Share API 分享圖片
async function onShare(imgUrl: string) {
  // 先檢查瀏覽器支援性
  const canShareFile = !!(navigator.canShare && window.navigator.canShare({ files: [new File([], '')] }));
  if (canShareFile) {
    try {
      const res = await fetch(imgUrl);
      const blob = await res.blob();
      const file = new File([blob], 'poster.png', { type: 'image/png' });
      await navigator.share({
        files: [file],
        title: 'Movie Poster',
        text: 'Check out my movie poster!',
      });
    } catch (err) {
      alert('分享失敗，請再試一次或手動下載圖片');
    }
  } else {
    // fallback: 下載圖片
    const a = document.createElement('a');
    a.href = imgUrl;
    a.download = 'poster.png';
    a.click();
    alert('你的瀏覽器不支援直接分享，已自動下載圖片');
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    // proxy 路徑自動支援 CORS，不需 crossOrigin
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) {
  // 以 cover 方式畫圖
  const imgRatio = img.width / img.height;
  const boxRatio = w / h;
  let drawW = w, drawH = h, dx = x, dy = y;
  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = img.width * (h / img.height);
    dx = x - (drawW - w) / 2;
  } else {
    drawW = w;
    drawH = img.height * (w / img.width);
    dy = y - (drawH - h) / 2;
  }
  ctx.drawImage(img, dx, dy, drawW, drawH);
}

export default SharePosterModal;
