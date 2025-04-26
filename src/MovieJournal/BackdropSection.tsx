import React from 'react';

interface BackdropSectionProps {
  backdrops: string[];
  selectedBackdrops: string[];
  setSelectedBackdrops: React.Dispatch<React.SetStateAction<string[]>>;
  onViewMore: () => void;
  preview?: boolean; // <--- 一定要有這行
}

const BackdropSection: React.FC<BackdropSectionProps> = ({
  backdrops, selectedBackdrops, setSelectedBackdrops, onViewMore, preview
}) => {

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 370,
        margin: '0 auto',
        padding: preview ? '16px 8px 8px 8px' : '32px 16px 24px 16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 2px 12px #0001',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, color: '#222', marginBottom: 12 }}>Select the most memorable scenes.</div>
      <div style={{ width: '100%', marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          {(backdrops.length <= 6 ? backdrops : backdrops.slice(0, 6)).map((img, idx) => {
            const isViewMore = backdrops.length > 6 && idx === 5;
            const isSelected = selectedBackdrops.includes(img);
            return (
              <div key={img} style={{
                borderRadius: 0,
                overflow: 'hidden',
                border: isSelected ? '2px solid #fca311' : '2px solid #eee',
                cursor: 'pointer',
                boxShadow: isSelected ? '0 0 6px #fca31144' : 'none',
                transition: 'border 0.2s',
                position: 'relative',
              }}
                onClick={() => {
                  if (isViewMore) {
                    onViewMore();
                  } else {
                    setSelectedBackdrops(isSelected ? selectedBackdrops.filter(i => i !== img) : [...selectedBackdrops, img]);
                  }
                } }
              >
                <div style={{ width: '100%', aspectRatio: '4/3', background: '#ddd', overflow: 'hidden' }}>
                  <img src={img} alt="scene" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 0, filter: isViewMore ? 'brightness(0.7)' : undefined }} />
                </div>
                {/* 多選勾勾 */}
                {isSelected && !isViewMore && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#fca311', color: '#fff', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 1px 4px #0002' }}>✓</div>
                )}
                {/* View more overlay */}
                {isViewMore && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>View more</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BackdropSection;
