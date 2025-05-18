// 電影資料型別
export interface Movie {
  poster_path?: string;
  release_date?: string;
  id: number;
  title: string;
  year?: string;
  posters: string[]; // 多張 poster
  backdrops: string[]; // 多張劇照
  director?: string;
  cast: string[]; // 前三位主要演員
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  production_companies: { id: number; name: string }[];
}

export interface Journal {
  id: string;
  movieId: string;
  movieTitle: string;
  original_title?: string; // 新增 TMDB 原始片名
  director: string;
  cast: string[];
  backdrops: string[];
  emotion: { label: string; icon: string; reason: string };
  note: string;
  date: string;
  createdAt: string;
}
