import React, { useState, useEffect, useRef } from 'react';
import { searchMovies } from './tmdb';
import type { Movie } from './types';

interface MovieSearchPageProps {
  onSelect: (movie: Movie) => void;
}

const MovieSearchPage: React.FC<MovieSearchPageProps> = ({ onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!searchQuery) {
      setResults([]);
      setError('');
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await searchMovies(searchQuery.trim());
        setResults(res);
        if (res.length === 0) setError('查無此片');
        else setError('');
      } catch (e) {
        setError('搜尋失敗，請稍後再試');
        setResults([]);
      }
      setLoading(false);
    }, 350);
    // eslint-disable-next-line
  }, [searchQuery]);

  return (
    <div style={{ background: '#181818', minHeight: '100vh', maxWidth: 430, margin: '0 auto', borderRadius: 32, color: '#fff', position: 'relative', boxShadow: '0 2px 24px #0008', padding: 0 }}>
      <div style={{ padding: '32px 20px 12px 20px', fontSize: 32, fontWeight: 700 }}>Search</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 20px 20px 20px' }}>
        <input
          type="text"
          placeholder="Search movie"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: 12, borderRadius: 20, border: 'none', fontSize: 18, background: '#222', color: '#fff' }}
        />
        <span style={{ fontSize: 24, color: '#fff' }}>🔍</span>
      </div>
      {loading && <div style={{ textAlign: 'center', color: '#aaa', marginTop: 40 }}>載入中...</div>}
      {!searchQuery && !loading && (
        <div style={{ textAlign: 'center', color: '#888', marginTop: 60, fontSize: 18 }}>請輸入電影名稱</div>
      )}
      {searchQuery && !loading && error && (
        <div style={{ textAlign: 'center', color: '#e88', marginTop: 60, fontSize: 18 }}>{error}</div>
      )}
      {searchQuery && !loading && results.length > 0 && (
        <div style={{ padding: '0 20px' }}>
          {results.map(movie => (
            <div
              key={movie.id}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 0', borderBottom: '1px solid #333', cursor: 'pointer' }}
              onClick={() => onSelect(movie)}
            >
              {movie.posters?.[0] ? (
                <img src={movie.posters[0]} alt={movie.title} style={{ width: 64, height: 92, borderRadius: 8, objectFit: 'cover' }} />
              ) : (
                <div style={{ width: 64, height: 92, borderRadius: 8, background: '#333' }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 20 }}>{movie.title}</div>
                <div style={{ color: '#aaa', fontSize: 14 }}>{movie.year || '未知年份'}</div>
                <div style={{ color: '#aaa', fontSize: 14, marginTop: 2 }}>
                  {movie.director ? `導演：${movie.director}` : ''}
                  {movie.cast && movie.cast.length > 0 ? ` / 主演：${movie.cast.slice(0, 3).join('、')}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSearchPage;
