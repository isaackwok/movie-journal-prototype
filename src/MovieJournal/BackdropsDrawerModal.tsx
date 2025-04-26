import React, { useEffect } from 'react';

interface BackdropsDrawerModalProps {
  open: boolean;
  backdrops: string[];
  selectedBackdrops: string[];
  setSelectedBackdrops: (arr: string[]) => void;
  onClose: () => void;
  setStep?: (step: number) => void; // 可選，讓 parent 可傳 step 控制
}

const BackdropsDrawerModal: React.FC<BackdropsDrawerModalProps> = ({ open, backdrops, selectedBackdrops, setSelectedBackdrops, onClose }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* 遮罩 */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: open ? 'rgba(0,0,0,0.35)' : 'transparent',
          zIndex: 2000,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'background 0.3s',
        }}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        style={{
          position: 'fixed',
          left: '50%',
          top: '50%',
          transform: open ? 'translate(-50%, -50%)' : 'translate(-50%, 100%)',
          width: '100%',
          maxWidth: 393,
          background: '#fff',
          zIndex: 2100,
          borderRadius: 18,
          boxShadow: '0 2px 24px #0002',
          minHeight: 320,
          maxHeight: '90vh',
          overflowY: 'auto',
          transition: 'transform 0.25s',
          padding: 0,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '18px 16px 8px 16px', borderBottom: '1px solid #eee' }}>
          <button onClick={onClose} style={{ marginRight: 12, background: 'none', border: 'none', color: '#222', fontSize: 20, cursor: 'pointer', borderRadius: 12, padding: '4px 12px', fontWeight: 600 }}>←</button>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#222', textAlign: 'center', flex: 1 }}>All Backdrops</div>
        </div>
        <div style={{ padding: '8px 0', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, width: '100%', boxSizing: 'border-box', margin: 0 }}>
            {backdrops.map((img) => {
              const isSelected = selectedBackdrops.includes(img);
              return (
                <div key={img} style={{ position: 'relative', cursor: 'pointer', border: isSelected ? '2px solid #fca311' : 'none', boxShadow: isSelected ? '0 0 6px #fca31144' : 'none', transition: 'border 0.2s', background: '#eee' }}
                  onClick={() => setSelectedBackdrops(isSelected ? selectedBackdrops.filter(i => i !== img) : [...selectedBackdrops, img])}
                >
                  <div style={{ width: '100%', aspectRatio: '4/3', background: '#ddd', overflow: 'hidden' }}>
                    <img src={img} alt="scene" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0 }} />
                  </div>
                  {isSelected && (
                    <div style={{ position: 'absolute', top: 8, right: 8, background: '#fca311', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 1px 4px #0002' }}>✓</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default BackdropsDrawerModal;
