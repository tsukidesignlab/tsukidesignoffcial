# 茲奇製研所｜多頁式互動官網 v4.0

## 這次是真正多頁式，不是首頁錨點導覽

- `index.html`：首頁
- `about/index.html`：關於我們
- `projects/index.html`：六件作品總覽、分類篩選
- `projects/<作品名稱>/index.html`：六個獨立作品內頁
- `brands/focito/index.html`：FOCITO 品牌頁（**只有狐狸與松鼠**）
- `journal/index.html`：實驗筆記
- `contact/index.html`：合作聯絡
- `shop/index.html`：FOCITO 商品展示（**沒有購物車或金流**）

總共 **13 個獨立 HTML 頁面**（首頁 1、關於 1、作品總覽 1、作品內頁 6、FOCITO 1、實驗筆記 1、聯絡 1、商店展示 1）。

## 不會再白底黑字的正確上傳方法

1. 在電腦上將 ZIP **解壓縮**，不要只拖曳 ZIP 本身到 GitHub。
2. 開啟 `Tsuki_Multipage_Website_v4` 資料夾，選取裡面的全部檔案和資料夾：`index.html`、`about/`、`projects/`、`brands/`、`journal/`、`contact/`、`shop/`、`assets/`、`content/`。
3. 拖到 GitHub Repository **根目錄**的 Add file → Upload files；要確認網站根目錄真的存在 `index.html` 與 `assets/css/site.css`。
4. Vercel 匯入此 Repository，Framework Preset 選 `Other`（靜態網站），Root Directory 指向 Repo 根目錄，Build Command 留空，Output Directory 保持預設。
5. 部署後直接測試 `https://你的站址/assets/css/site.css`：如果 404，代表資產未上傳或 Vercel 根目錄設錯；若可顯示 CSS 文字，代表樣式路徑正常。
6. 同時測試 `https://你的站址/about/`、`https://你的站址/projects/`、`https://你的站址/brands/focito/`、`https://你的站址/contact/`。
7. **強烈建議先部署到測試專案**，確定沒問題再換正式站網域，避免覆蓋現有網站。

## 本機預覽

直接在 Chrome 雙擊 `index.html`；這版使用相對路徑，**只要保留資料夾結構**，首頁及內頁、圖片與動畫都能正常顯示。

## 如何日常維護

| 要改的東西 | 修改位置 |
|---|---|
| 首頁文字 | `index.html` |
| 品牌與公司理念 | `about/index.html` |
| 六個作品介紹 | `projects/作品代號/index.html` |
| FOCITO 品牌故事／角色 | `brands/focito/index.html` |
| 消息與文章入口 | `journal/index.html` |
| 聯絡資訊 | `contact/index.html`，全站頁尾／導覽若需同改可聯絡協助 |
| 全站色彩／視覺 | `assets/css/site.css`，上方 `:root` |
| 滾動／游標／轉場／分類篩選 | `assets/js/site.js` |
| 作品／角色圖片 | `assets/images/`（維持檔名就不必改 HTML） |
| 作品基本資料備份 | `content/projects.json`（供未來重構/CMS 用，**修改此 JSON 不會自動更新 HTML**） |

**重要：** 此版仍為靜態 HTML 網站，尚未串接 CMS 後台。修改文字要更動 HTML 再 Commit；不能宣稱修改 `content/projects.json` 會自動更新網頁。正式長期維護可以再將此版改造成 Next.js + CMS。

## 功能與限制

- 支援桌機、平板、手機響應式設計。
- 共用 CSS、共用 JS：避免每個 HTML 各自嵌入大份程式碼，不易維護。
- 有導覽、作品分類篩選、滑鼠效果、捲動出現、讀取進度、品牌色跨頁轉場。
- 保留 `prefers-reduced-motion` 無障礙降級。
- 全站不依賴外部 CDN，圖片均為使用者提供的作品與品牌資產；沒有外部字型資源。
- FOCITO IP：僅有 **狐狸與松鼠**，沒有海狸。
- 產品作品描述經整理，但對技術、獎項、療效與合作不會做尚未核實的宣稱。
- StellarVision 是非螢幕教具，**沒有 App、硬體螢幕、眼動追蹤或家長數據平台**。
- 商品展示頁沒有真實購物、金流、庫存與後台。

## 上線前請確認

- 確認商用 Vercel 方案是否符合其使用條款。
- 作品圖片的公開使用權；兒童出鏡需要適當授權。
- 所有公司的團隊名單、得獎紀錄，請核對是否能對外公開後再放上站。
- 確認正確公司名稱、聯絡信箱與 IG。
