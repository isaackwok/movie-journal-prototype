/// <reference types="vite/client" />
import { Movie } from "./types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

// 搜尋電影，回傳多語言、多張海報、年份、id
export async function searchMovies(
  query: string,
  language = "zh-TW"
): Promise<Movie[]> {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=${language}`
  );
  const data = await res.json();
  const movies: Movie[] = await Promise.all(
    data.results.map(async (item: any) => {
      const detail = await getMovieDetail(item.id, language);
      const credits = await getMovieCredits(item.id);
      const infoDetail = await getMovieInfoDetail(item.id);
      return {
        id: item.id,
        title: item.title,
        year: item.release_date ? item.release_date.slice(0, 4) : "",
        posters: detail.posters,
        backdrops: detail.backdrops,
        director: credits.director,
        cast: credits.cast,
        overview: item.overview,
        genres: infoDetail.genres,
        runtime: infoDetail.runtime,
        production_companies: infoDetail.production_companies,
      };
    })
  );
  return movies;
}

// 取得電影細節（多張 poster/backdrop）
export async function getMovieDetail(movieId: number, language = "zh-TW") {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/images?api_key=${API_KEY}`
  );
  const imgData = await res.json();
  return {
    posters: imgData.posters.map((p: any) => `${IMAGE_BASE}${p.file_path}`),
    backdrops: imgData.backdrops.map((b: any) => `${IMAGE_BASE}${b.file_path}`),
  };
}
// 取得電影細節（多張 poster/backdrop）
export async function getMovieInfoDetail(movieId: number, language = "zh-TW") {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${language}`
  );
  const data = await res.json();
  return {
    genres: data.genres,
    runtime: data.runtime,
    production_companies: data.production_companies,
  };
}

// 取得導演與前三位主要演員
export async function getMovieCredits(movieId: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );
  const data = await res.json();
  const director = data.crew.find((c: any) => c.job === "Director")?.name || "";
  const cast = data.cast.slice(0, 3).map((a: any) => a.name);
  return { director, cast };
}
