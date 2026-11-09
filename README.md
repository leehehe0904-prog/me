# 李軒赫｜作品集

軒赫（11 歲）的個人作品集網站，整合了原本的個人網站與〈方塊鬥技場〉，並收錄四款遊戲：

| 作品 | 類型 | 玩法 |
| --- | --- | --- |
| 等天光 · 第七暝 | 3D 第一人稱生存射擊 | [zombie.iosoftware.ai](https://zombie.iosoftware.ai/) |
| 史萊姆捏捏工坊 | 3D 開放世界經營 | [slime.iosoftware.ai](https://slime.iosoftware.ai/) |
| 方塊鬥技場 | 2D 等角對戰 | 網站內直接玩（`public/play/arena/`） |
| 太空接星星 | 2D 街機小遊戲 | 網站內直接玩（`src/components/StarCatcher.tsx`） |

## 開發

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 輸出靜態網站到 out/
```

## 要改內容的話

- 個人資料、興趣、學習歷程、工具箱：`src/content/profile.ts`
- 學習報告頁（`/learning/`）：`src/content/report.ts`。架構依照自學學習報告書的五個面向
  （目標、課程與教學、學習成果、心得與挑戰、未來展望）；標「草稿」的段落請老師確認，
  `honors`（獲獎）和 `observers`（老師、家長的話）填了才會出現在頁面上。頁面上有「列印／存成 PDF」按鈕。
  寫法原則：不誇大。作品大多是和 AI 一起做的，報告照實寫出這件事帶來的困境，
  以及「讓 AI 幫忙學，而不是代替思考」的做法。
- 作品介紹、亮點、操作方式、截圖：`src/content/works.ts`
- 截圖檔案：`src/assets/shots/`（建議 1600×1000 的 WebP）
- 顏色與字型：`src/app/globals.css` 最上面的 `:root`

## 部署（GitHub Pages）

推送到 `main` 後，`.github/workflows/deploy.yml` 會自動建置並部署。
第一次要到 GitHub 專案的 **Settings → Pages → Source** 選 **GitHub Actions**。
網站放在子路徑（例如 `/test`）時，流程會自動帶入 `PAGES_BASE_PATH`，不需要手動改設定。

## 設計說明

原本的網站是深藍底加上青、紫、粉的霓虹漸層。這次改成「紙與墨」的編輯排版風格，讓遊戲截圖成為畫面的主角。

**配色**

| 角色 | 名稱 | 色碼 | 用途 |
| --- | --- | --- | --- |
| 主色 | 朱 Cinnabar | `#C8381F` | 行動按鈕、編號、重點。取自印章的朱紅，也呼應遊戲的「開始」鍵；在紙色上對比 4.5:1，白字對比 4.9:1 |
| 輔色 | 松 Pine | `#22463A` | 學習歷程、完成標記。沉穩的深綠，代表成長，和朱色是互補色但明度差很大，不會互搶 |
| 點綴 | 琥珀 Amber | `#E0A43A` | 只用在深色區塊的小面積高光、標題底線 |
| 底色 | 紙 Paper | `#F2EEE5` | 暖白，比純白柔和，加上很淡的紙張顆粒 |
| 文字 | 墨 Ink | `#1A1814` | 暖黑，和紙色對比 15:1 |
| 深色區 | 夜 Night | `#161512` | 遊戲間與頁尾，讓遊戲畫面在深色背景上更突出 |

刻意避開藍紫色：四款遊戲的畫面本身就有各自強烈的顏色（醫院的暗紅、月光谷的綠、木箱的棕），
中性的暖色底加上一個明確的主色，比較不會和截圖打架。

**字體**：標題用思源宋體（Noto Serif TC）的粗體，內文用思源黑體（Noto Sans TC），
編號與標籤用 IBM Plex Mono，像程式碼也像雜誌的頁碼。

**標誌**：朱紅方塊裡的「赫」字，做成印章的樣子。
