import React, { useState } from "react";
import { Movie, Journal } from "./types";
import "./index.css";
import { searchMovies } from "./tmdb";
import MovieJournalPage from "./MovieJournalPage";
import HomePage from "./HomePage";
import ViewJournalPage from "./ViewJournalPage";
import MovieSearchPage from "./MovieSearchPage";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

const LOCAL_KEY = "movie_journals";

/**
 * 用於根據 id 尋找 journal 並顯示閱讀頁
 */
function ViewJournalWrapper({ journals }: { journals: Journal[] }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const journal = journals.find((j) => String(j.id) === String(id));
  if (!journal)
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
        Journal Not Found
      </div>
    );
  return <ViewJournalPage journal={journal} onBack={() => navigate("/")} />;
}

import { getMovieCredits } from "./tmdb";

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();
  const [journals, setJournals] = useState<Journal[]>(() => {
    // journals 初始化後自動 migrate
    setTimeout(() => {
      migrateJournalsIfNeeded();
    }, 0);

    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [searchQuery, setSearchQuery] = useState("");

  // 資料結構自動補齊與清理
  async function migrateJournalsIfNeeded() {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return;
    let changed = false;
    let list: any[] = [];
    try {
      list = JSON.parse(raw);
    } catch {
      return;
    }
    const migrated = await Promise.all(
      list.map(async (j) => {
        // 若缺 director/cast，補齊
        if ((!j.director || !j.cast || j.cast.length === 0) && j.movieId) {
          try {
            const credits = await getMovieCredits(Number(j.movieId));
            j.director = credits.director;
            j.cast = credits.cast;
            changed = true;
          } catch {}
        }
        // 移除無用欄位
        delete j.movieYear;
        delete j.label;
        delete j.icon;
        delete j.reason;
        delete j.leadingActors;
        return j;
      }),
    );
    if (changed) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(migrated));
      setJournals(migrated);
    }
  }
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSaveJournal = (journal: Journal) => {
    const next = [journal, ...journals];
    setJournals(next);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  };

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const results = await searchMovies(q);
    setSearchResults(results);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            journals={journals}
            onSelectJournal={(journal) =>
              window.location.assign(`/journal/view/${journal.id}`)
            }
            onCreateJournal={() => window.location.assign("/journal/new")}
          />
        }
      />
      <Route
        path="/journal/new"
        element={
          <MovieSearchPage
            onSelect={(movie) => {
              setSelectedMovie(movie);
              navigate("/journal/write");
            }}
          />
        }
      />
      <Route
        path="/journal/write"
        element={
          selectedMovie ? (
            <MovieJournalPage
              movie={selectedMovie}
              onBack={() => window.location.assign("/")}
              onSave={(journal) => {
                handleSaveJournal(journal);
                window.location.assign(`/journal/view/${journal.id}`);
              }}
            />
          ) : (
            <div style={{ color: "#fff", textAlign: "center", marginTop: 40 }}>
              請先搜尋並選擇一部電影
            </div>
          )
        }
      />
      <Route
        path="/journal/view/:id"
        element={<ViewJournalWrapper journals={journals} />}
      />
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
