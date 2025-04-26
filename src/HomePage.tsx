import React from 'react';
import { Journal } from './types';

// 取得優先顯示的圖片
const getCoverImage = (j: Journal) => {
  if (Array.isArray(j.backdrops) && j.backdrops.length > 0) return j.backdrops[0];
  if ((j as any).backdrop) return (j as any).backdrop;
  if ((j as any).poster) return (j as any).poster;
  return '';
};

function groupByMonth(journals: Journal[]) {
  return journals.reduce((acc, j) => {
    const date = new Date(j.createdAt);
    const ym = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    if (!acc[ym]) acc[ym] = [];
    acc[ym].push(j);
    return acc;
  }, {} as Record<string, Journal[]>);
}

function getMonthLabel(ym: string) {
  const [y, m] = ym.split('-');
  return `${parseInt(m)}月 ${y}`;
}

interface HomePageProps {
  journals: Journal[];
  onSelectJournal: (journal: Journal) => void;
  onCreateJournal: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ journals, onSelectJournal, onCreateJournal }) => {
  const grouped = groupByMonth(journals);
  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="iphone-container">
      <div className="main-title special-font heading" style={{padding: '32px 20px 12px 20px', color: '#fff'}}>My Movie</div>
      {months.map(ym => (
        <div key={ym} style={{ marginBottom: 24 }}>
          <div className="section-title" style={{color:'#fff', margin:'18px 0 10px 16px'}}>{getMonthLabel(ym)}</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
            padding: '0 12px'
          }}>
            {grouped[ym].map(j => (
  <div
    key={j.id}
    onClick={() => onSelectJournal(j)}
    style={{
      background: '#23232a',
      borderRadius: 16,
      boxShadow: '0 2px 8px #0002',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 210,
      cursor: 'pointer',
      transition: 'box-shadow 0.15s',
    }}
    tabIndex={0}
    role="button"
    aria-label={`檢視 ${j.movieTitle} 日誌`}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') onSelectJournal(j); }}
  >
    <img
      src={getCoverImage(j)}
      style={{ width: '100%', height: 140, objectFit: 'cover', background: '#222' }}
      alt={j.movieTitle}
    />
    <div style={{ padding: '10px 12px 8px 12px', color: '#fff' }}>
      <div className="card-title title-font title" style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{j.movieTitle}</div>
      <div style={{fontSize:13,color:'#aaa',marginBottom:4}}></div>
      <div style={{fontSize:14,color:'#eee',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{j.note}</div>
    </div>
  </div>
))}
          </div>
        </div>
      ))}
      
    {/* 浮動新增按鈕 */}
    <button
      onClick={onCreateJournal}
      style={{
        position: 'fixed',
        right: 24,
        bottom: 32,
        width: 56,
        height: 56,
        borderRadius: '50%',
        background: '#007aff',
        color: '#fff',
        fontSize: 32,
        border: 'none',
        boxShadow: '0 4px 16px #007aff55',
        zIndex: 999,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.2s',
      }}
      aria-label="新增 Journal"
    >
      +
    </button>
  </div>
);
};

export default HomePage;
