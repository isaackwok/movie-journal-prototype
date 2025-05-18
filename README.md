# Movie Journal Prototype

這是一個以 React + TypeScript 實作的電影心得紀錄 App 原型。使用者可以搜尋電影、查看詳細資訊，並記錄自己的觀影心得。

## 功能特色

- 搜尋電影（使用 TMDB API，支援多語言、增量搜尋）
- 搜尋結果顯示：主海報、名稱、年份、導演、前三位主要演員
- 點擊電影可進入紀錄編輯流程
- 16 種自訂情緒 icon（SVG）表達觀影感受

## 技術棧

- 前端框架：React 18 + TypeScript
- 建置工具：Vite
- 樣式：CSS Modules
- API：TMDB API

## 開始使用

### 前置需求

- Node.js 18.0 或更高版本
- npm 9.0 或更高版本

### 安裝步驟

1. 複製專案到本地：

   ```bash
   git clone https://github.com/jonaswhite/movie-journal-prototype.git
   cd movie-journal-prototype
   ```

2. 安裝依賴：

   ```bash
   npm install
   ```

3. 設定環境變數：
   建立 `.env` 檔案並添加以下內容：

   ```
   VITE_TMDB_API_KEY=d4c9092656c3aa3cfa5761fbf093f7d0
   ```

4. 啟動開發伺服器：

   ```bash
   npm run dev
   ```

5. 開啟瀏覽器訪問 `http://localhost:5173`

## 協作開發指南

### 分支策略

我們採用簡化版的 Git Flow 工作流：

- `main`：主分支，包含穩定的生產版本代碼
- `feature/*`：新功能開發分支
- `bugfix/*`：錯誤修復分支

### 開發流程

1. 從 `main` 分支建立新的功能分支：

   ```bash
   git checkout main
   git pull
   git checkout -b feature/your-feature-name
   ```

2. 在分支上進行開發並提交變更：

   ```bash
   git add .
   git commit -m "描述你的變更"
   ```

3. 推送分支到遠端儲存庫：

   ```bash
   git push -u origin feature/your-feature-name
   ```

4. 在 GitHub 上創建 Pull Request 到 `main` 分支

### 程式碼風格

- 遵循 TypeScript 的最佳實踐
- 使用功能型元件和 React Hooks
- 保持元件的單一職責
- 添加適當的註釋和文檔

## 專案結構

```
/src
  /assets       # 靜態資源（圖片、圖標等）
  /components   # React 元件
  /hooks        # 自定義 React Hooks
  /pages        # 頁面元件
  /services     # API 服務和外部整合
  /types        # TypeScript 類型定義
  /utils        # 工具函數
```

## 相關資源

- [TMDB API 文檔](https://developers.themoviedb.org/3)
- [React 文檔](https://reactjs.org/docs/getting-started.html)
- [TypeScript 文檔](https://www.typescriptlang.org/docs/)

## 授權

本專案採用 MIT 授權 - 詳見 LICENSE 檔案

---
