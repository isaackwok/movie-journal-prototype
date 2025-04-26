# Movie Journal Prototype

這是一個以 React + TypeScript 實作的電影心得紀錄 App 原型。

## MVP 功能
- 搜尋電影（TMDB API，多語言、incremental search）
- 搜尋結果顯示：主海報、名稱、年份、導演、前三位主要演員
- 點擊電影可進入紀錄編輯流程（後續擴充）
- 16 種自訂情緒 icon（SVG）

## 開發指令
1. 安裝依賴：`npm install`
2. 啟動開發伺服器：`npm run dev`

## TMDB API Key
請將你的 TMDB API key 設定在 `.env` 檔案中：
```
VITE_TMDB_API_KEY=d4c9092656c3aa3cfa5761fbf093f7d0
```

---
