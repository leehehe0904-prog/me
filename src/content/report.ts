/**
 * 學習報告頁（/learning/）的內容。
 *
 * 架構依照「新北市非學校型態個人實驗教育・學生學習狀況報告書」的五個面向：
 *   壹、辦理目標　貳、課程及教學實施情形　參、學習表現成果
 *   肆、計畫執行心得／困難與挑戰　伍、未來展望
 *
 * 作品、日期、技術細節都對照過遊戲的程式碼與 Git 紀錄。
 * 標「草稿」的段落是依照作品整理出來的文字，請老師／家長確認或改寫。
 */
import { profile } from "./profile";

export const report = {
  term: "2026 秋季",
  from: "2026.10.11",
  to: "2026.11.08",
  updated: "2026.11.10",
  /** 草稿：上課方式請確認 */
  mode: "每週一次程式課，以做遊戲為主題",
};

export const parts = [
  { id: "goals", no: "壹", label: "學習目標" },
  { id: "course", no: "貳", label: "課程與教學" },
  { id: "results", no: "參", label: "學習成果" },
  { id: "reflection", no: "肆", label: "心得與挑戰" },
  { id: "next", no: "伍", label: "未來展望" },
] as const;

export type Status = "done" | "doing" | "next";
export const statusLabel: Record<Status, string> = { done: "已達成", doing: "進行中", next: "下一步" };

/* ───────── 壹、學習目標 ───────── */

/** 軒赫自己訂的目標：原文來自他第一個網站的「我的夢想」 */
export const ownGoals: { goal: string; when: string; status: Status; note: string }[] = [
  { goal: "做出自己的第一個網站", when: "現在", status: "done", note: "2026.10.11 完成" },
  { goal: "做出一款自己的小遊戲", when: "不久的將來", status: "done", note: "提早達成，而且做了四款" },
  { goal: "成為厲害的工程師，改變世界", when: "長大以後", status: "doing", note: "一步一步來" },
];

/** 草稿：本階段的課程目標，請老師確認 */
export const courseGoals: { goal: string; status: Status; evidence: string; href: string }[] = [
  {
    goal: "用 HTML、CSS、JavaScript 做出可以互動的網頁",
    status: "done",
    evidence: "第一個個人網站",
    href: "/works/stars/",
  },
  {
    goal: "理解一款遊戲的組成：畫面、規則、操作與回饋",
    status: "done",
    evidence: "方塊鬥技場、太空接星星",
    href: "/works/arena/",
  },
  {
    goal: "認識 3D 遊戲的基本概念：座標、相機、光線與物理",
    status: "doing",
    evidence: "等天光、史萊姆捏捏工坊",
    href: "/works/zombie/",
  },
  {
    goal: "把作品發布到網路上，讓別人也玩得到",
    status: "done",
    evidence: "兩款 3D 遊戲已上線，兩款 2D 遊戲放在本站",
    href: "/#play",
  },
  {
    goal: "養成用 Git 記錄每一次修改的習慣",
    status: "doing",
    evidence: "GitHub 版本紀錄",
    href: profile.github,
  },
];

/* ───────── 貳、課程與教學 ───────── */

/** 學習方式（草稿：請老師確認） */
export const methods = [
  {
    title: "做中學",
    body: "每個階段都做出一款完整、能玩的作品。概念不是先背起來，而是做的時候遇到了才學。",
  },
  {
    title: "一週一個里程碑",
    body: "從 10 月 11 日起，每週完成一件事：一個網站、一款新遊戲，或一次大改版。",
  },
  {
    title: "邊做邊除錯",
    body: "遇到問題先說清楚發生什麼事，再一步一步找原因。〈肆〉記錄了幾次印象最深的除錯。",
  },
  {
    title: "每一步都留紀錄",
    body: "每次修改都存進 Git。這份報告裡的日期，都查得到出處。",
  },
];

/** 每週學到的概念，和 profile.ts 的 journey 一一對應（同一個日期） */
export const weekly: Record<string, string[]> = {
  "2026.10.11": ["HTML 網頁結構", "CSS 排版與動畫", "JavaScript 事件", "Canvas 畫圖"],
  "2026.10.18": ["鍵盤與滑鼠輸入", "碰撞判定", "遊戲迴圈", "電腦對手"],
  "2026.10.25": ["Three.js 3D 場景", "相機與燈光", "第一人稱操作", "多人連線"],
  "2026.11.01": ["把遊戲嵌進網頁", "版面整理", "劇情、線索與多重結局"],
  "2026.11.08": ["開放世界地圖", "邏輯謎題", "手機觸控操作", "自動存檔"],
};

/** 跨領域：做遊戲時碰到的各科概念。每一項都對得到作品裡實際有的內容 */
export const domains = [
  {
    mark: "數",
    name: "數學",
    items: [
      { text: "座標：3D 世界裡的每樣東西都有 x、y、z 位置", from: "等天光、史萊姆捏捏工坊" },
      { text: "亂數：星星和隕石從哪裡掉下來，由亂數決定", from: "太空接星星" },
      { text: "邏輯推理：拼回撕碎的謎語、推出熔岩柱的顏色", from: "史萊姆捏捏工坊" },
    ],
  },
  {
    mark: "自",
    name: "自然科學",
    items: [
      { text: "重力與拋物線：跳躍，和手榴彈飛出去的路線", from: "等天光" },
      { text: "光與影：燈光、陰影，和紅綠藍混出來的顏色", from: "等天光" },
      { text: "聲音：用程式即時合成音效", from: "等天光、史萊姆捏捏工坊" },
    ],
  },
  {
    mark: "語",
    name: "語文",
    items: [
      { text: "說故事：把劇情拆成線索，讓玩家自己拼出來，共有五種結局", from: "等天光" },
      { text: "台語：「等天光」是等天亮，「第七暝」是第七個晚上", from: "等天光" },
      { text: "寫說明：把玩法和操作寫成別人看得懂的文字", from: "每一款作品" },
    ],
  },
  {
    mark: "藝",
    name: "藝術",
    items: [
      { text: "氣氛：用霧、燈光和色調讓醫院變得可怕", from: "等天光" },
      { text: "造型：用幾何零件替史萊姆做裝飾", from: "史萊姆捏捏工坊" },
      { text: "介面：選單、按鈕和畫面上的資訊要怎麼擺", from: "每一款作品" },
    ],
  },
  {
    mark: "社",
    name: "社會",
    items: [
      { text: "生產：捕捉、加工、裝飾，一條完整的生產線", from: "史萊姆捏捏工坊" },
      { text: "經濟：材料和設備都有價格，要算成本和收入", from: "史萊姆捏捏工坊" },
      { text: "媒體：直播時觀眾會指定想看的款式，限時做出來", from: "史萊姆捏捏工坊" },
    ],
  },
  {
    mark: "科",
    name: "科技",
    items: [
      { text: "程式：HTML 搭骨架、CSS 排版、JavaScript 寫規則", from: "每一款作品" },
      { text: "3D 與連線：Three.js 畫 3D，WebSocket 讓多人同時玩", from: "等天光" },
      { text: "發布：用 Git 管理版本，把網站和遊戲放上網路", from: "這個網站" },
    ],
  },
];

/* ───────── 參、學習成果 ───────── */

/** 每款作品第一版完成的日期（Git 紀錄），排序也照這個 */
export const workDates: Record<string, string> = {
  stars: "2026.10.11",
  arena: "2026.10.18",
  zombie: "2026.10.25",
  slime: "2026.11.08",
};

/** 評量方式（草稿：請老師確認） */
export const assessments = [
  { title: "完整玩一輪", body: "作品做完要能從開始玩到結束，中途卡住就回頭修。" },
  { title: "上線實測", body: "發布到網路上，用電腦和手機實際打開來玩，找出問題再改。" },
  { title: "看版本紀錄", body: "Git 留下每一次修改，回頭比較就看得出每週進步在哪裡。" },
  { title: "說給別人聽", body: "每款作品都整理成介紹頁：玩法、操作與亮點，練習把做過的事說清楚。" },
];

/** 特殊表現 */
export const highlights = [
  {
    title: "做出能多人連線的 3D 遊戲",
    body: "〈等天光〉有多樓層的醫院、十一種活屍、合作與對戰模式，已經公開上線。",
    href: "/works/zombie/",
  },
  {
    title: "一天內從 2D 改成 3D 開放世界",
    body: "〈史萊姆捏捏工坊〉11 月 8 日先做出網頁版，同一天就改成第一人稱的 3D 開放世界。",
    href: "/works/slime/",
  },
  {
    title: "28 天，四款遊戲",
    body: "從第一個網頁到第二款 3D 遊戲，只花了四個星期。",
    href: "/#works",
  },
];

/** 獲獎或參賽紀錄：有的話加在這裡，空的時候頁面不會顯示這一塊 */
export const honors: { date: string; title: string; note?: string }[] = [];

/* ───────── 肆、心得與挑戰 ───────── */

/** 軒赫自己說的話：原文來自他第一個網站（2026.10.11） */
export const studentWords = [
  { quote: "我喜歡探索新事物，這是我親手打造的第一個網站！", source: "2026.10.11 · 第一個網站的自我介紹" },
  { quote: "長大以後，成為厲害的工程師，改變世界。", source: "同一個網站的「我的夢想」" },
];

/** 困難與挑戰：都來自遊戲的 Git 紀錄 */
export const challenges = [
  {
    work: "等天光",
    date: "2026.10.25",
    problem: "加上光暈特效之後，整個畫面突然變成全黑。",
    solve: "往回追才發現，有一個數值算出來「不是數字」（NaN），一路傳下去把整個畫面弄壞。在源頭擋住之後就恢復了。",
    learned: "出事的地方，不一定是出錯的地方。",
  },
  {
    work: "等天光",
    date: "2026.10.26",
    problem: "殭屍一多，遊戲就變得很卡。",
    solve: "先做一個效能面板（按 F3）看每一幀花了多少時間，再把做殭屍模型的工作交給背景處理，並讓畫質自動調整。",
    learned: "先量清楚，再動手改。",
  },
  {
    work: "史萊姆捏捏工坊",
    date: "2026.11.08",
    problem: "用手機玩的時候視角會亂轉，角色還會撞到看不見的牆。",
    solve: "重新調整手機的觸控視角，把地圖上的「空氣牆」一個一個找出來拿掉，也修掉直播時會誤觸的按鈕。",
    learned: "每一種裝置都要真的拿來玩過。",
  },
];

/**
 * 老師與家長的觀察（對應報告書的「家長執行心得」）。
 * 寫好再加進來，例如：{ role: "家長", body: "……" }。空的時候頁面不會顯示這一塊。
 */
export const observers: { role: string; name?: string; body: string }[] = [];

/* ───────── 伍、未來展望 ───────── */

/** 下一階段的課程：〈等天光〉裡的教學模式（F2），章節順序就是上課順序 */
export const nextCourse = {
  title: "遊戲製作課：把自己的遊戲拆開來看",
  body: "用〈等天光〉本身當教材，49 個互動場景、8 章，一個場景學一個概念。拖動程式碼裡的數字，3D 畫面就立刻跟著變；每個場景都有一個小任務，完成會打勾。",
  chapters: [
    { title: "畫面是程式畫出來的", sub: "場景、相機、每秒 60 張" },
    { title: "三角形的魔法", sub: "每個模型都是三角形拼的" },
    { title: "光、顏色與材質", sub: "為什麼看起來像真的" },
    { title: "氣氛魔法", sub: "回到醫院，調整真正的遊戲畫面" },
    { title: "讓角色動起來", sub: "骨架、關鍵影格、布娃娃" },
    { title: "碰撞、射擊、重力", sub: "遊戲怎麼知道你打中了" },
    { title: "殭屍的大腦", sub: "狀態機、尋路、聽聲音" },
    { title: "聲音、連線、效能", sub: "把所有積木疊起來" },
  ],
};

/** 草稿：下一階段的目標，請老師確認 */
export const nextGoals: { goal: string; note: string; status: Status }[] = [
  { goal: "完成遊戲製作課的八個章節", note: "看懂自己遊戲背後的原理", status: "next" },
  { goal: "自己動手改遊戲裡的數值與程式", note: "從調整數字開始，到自己加功能", status: "next" },
  { goal: "做出下一款遊戲", note: "製作中", status: "doing" },
];
