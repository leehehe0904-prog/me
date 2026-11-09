/**
 * 學習報告頁（/learning/）的內容。
 *
 * 架構依照「新北市非學校型態個人實驗教育・學生學習狀況報告書」的五個面向：
 *   壹、辦理目標　貳、課程及教學實施情形　參、學習表現成果
 *   肆、計畫執行心得／困難與挑戰　伍、未來展望
 *
 * 寫法原則：不誇大。作品大多是和 AI 一起做的（vibe coding），
 * 報告要老實寫出這件事帶來的困境，以及「讓 AI 幫忙學、而不是代替思考」的做法。
 *
 * 作品、日期、技術細節都對照過遊戲的程式碼與 Git 紀錄。
 * 標「草稿」的段落是依照作品整理出來的文字，請老師／家長確認或改寫。
 */
export const report = {
  term: "2026 秋季",
  from: "2026.10.11",
  to: "2026.11.08",
  updated: "2026.11.10",
  /** 草稿：上課方式請確認 */
  mode: "每週一次程式課，和 AI 一起做遊戲",
};

export const parts = [
  { id: "goals", no: "壹", label: "學習目標" },
  { id: "course", no: "貳", label: "課程與教學" },
  { id: "results", no: "參", label: "學習成果" },
  { id: "reflection", no: "肆", label: "心得與挑戰" },
  { id: "next", no: "伍", label: "未來展望" },
] as const;

export type Status = "done" | "doing" | "next";
export const statusLabel: Record<Status, string> = { done: "已完成", doing: "進行中", next: "下一步" };

/* ───────── 壹、學習目標 ───────── */

/** 軒赫自己訂的目標：原文來自他第一個網站的「我的夢想」 */
export const ownGoals: { goal: string; when: string; status: Status; note: string }[] = [
  { goal: "做出自己的第一個網站", when: "現在", status: "done", note: "2026.10.11" },
  { goal: "做出一款自己的小遊戲", when: "不久的將來", status: "done", note: "2026.10，和 AI 一起完成" },
  { goal: "成為厲害的工程師，改變世界", when: "長大以後", status: "doing", note: "先從看懂程式開始" },
];

/** 草稿：本階段的課程目標，請老師確認。大多還在進行中，照實標示 */
export const courseGoals: { goal: string; status: Status; evidence: string; href?: string }[] = [
  {
    goal: "能用文字把想法說清楚：玩法、規則和畫面，讓 AI 做出接近想像的東西",
    status: "doing",
    evidence: "四款作品的製作過程",
    href: "/#works",
  },
  {
    goal: "能試玩自己的作品，找出問題，並把問題描述清楚",
    status: "doing",
    evidence: "史萊姆捏捏工坊的手機版修正",
    href: "/works/slime/",
  },
  {
    goal: "看得懂 AI 寫的程式在做什麼，從改數值、讀註解開始",
    status: "doing",
    evidence: "方塊鬥技場的 CONFIG 數值",
    href: "/works/arena/",
  },
  {
    goal: "認識網頁與遊戲的基本組成：HTML、CSS、JavaScript，畫面、規則與輸入",
    status: "doing",
    evidence: "太空接星星",
    href: "/works/stars/",
  },
  {
    goal: "在老師協助下，把作品發布到網路上",
    status: "done",
    evidence: "兩款 3D 遊戲已上線，兩款 2D 遊戲放在本站",
    href: "/#play",
  },
];

/* ───────── 貳、課程與教學 ───────── */

/** 分工：這一階段實際的做法（草稿：請老師確認） */
export const roles = [
  {
    who: "軒赫",
    items: ["想點子和玩法", "用文字描述想要的效果", "試玩、找問題，說出哪裡不對"],
  },
  {
    who: "AI",
    items: ["寫出大部分的程式", "依照描述修改", "被問到時，解釋程式在做什麼"],
  },
  {
    who: "老師",
    items: ["把大目標拆成小步驟", "用提問引導，而不是直接給答案", "確認他是不是真的懂了"],
  },
];

/** 學習方式（草稿：請老師確認） */
export const methods = [
  {
    title: "先說清楚，再請 AI 做",
    body: "動手前先用自己的話寫下想要什麼。說不清楚，AI 就只能用猜的。",
  },
  {
    title: "問「為什麼」，不只說「幫我修」",
    body: "遇到問題，先請 AI 解釋原因，聽懂了再修。",
  },
  {
    title: "自己動手改一點",
    body: "從改數值開始：速度、數量、顏色。改之前先猜會發生什麼，再跑跑看。",
  },
  {
    title: "每一步都留紀錄",
    body: "每次修改都存進 Git。這份報告裡的日期，都查得到出處。",
  },
];

/** 每週接觸到的概念，和 profile.ts 的 journey 一一對應（同一個日期） */
export const weekly: Record<string, string[]> = {
  "2026.10.11": ["HTML 網頁結構", "CSS 排版", "JavaScript 事件", "Canvas 畫圖"],
  "2026.10.18": ["鍵盤與滑鼠輸入", "碰撞判定", "遊戲迴圈", "電腦對手"],
  "2026.10.25": ["3D 場景", "相機與燈光", "第一人稱操作", "多人連線"],
  "2026.11.01": ["把遊戲嵌進網頁", "版面整理", "劇情與線索"],
  "2026.11.08": ["開放世界地圖", "邏輯謎題", "手機觸控", "自動存檔"],
};

/**
 * 作品裡出現的各科概念。每一項都對得到作品裡實際有的內容，
 * 但多半是 AI 寫進程式裡的：出現過，不代表已經學會。
 */
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
      { text: "說故事：劇情拆成線索，讓玩家自己拼出來", from: "等天光" },
      { text: "台語：「等天光」是等天亮，「第七暝」是第七個晚上", from: "等天光" },
      { text: "描述需求：把想要的玩法寫成 AI 看得懂的文字", from: "每一款作品" },
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
      { text: "程式：HTML 是骨架、CSS 管外觀、JavaScript 寫規則", from: "每一款作品" },
      { text: "AI 協作：怎麼描述需求、怎麼檢查 AI 給的結果", from: "每一款作品" },
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

/** 評量方式（草稿：請老師確認）：重點放在「懂不懂」，不是「做不做得出來」 */
export const assessments = [
  { title: "說得出來", body: "用自己的話說明一個功能怎麼運作。說得出來，才算真的懂。" },
  { title: "改改看", body: "改一個數值或一小段程式，先預測結果，再實際跑跑看。" },
  { title: "試玩回饋", body: "作品上線後實際玩，把問題記下來，並描述到別人能重現。" },
  { title: "看版本紀錄", body: "Git 留下每次修改，回頭看得出每週做了什麼。" },
];

/** 目前的程度（草稿：請老師確認）。老實寫，不誇大 */
export const level = {
  can: [
    "用文字描述想要的玩法和畫面，請 AI 做出能玩的版本",
    "試玩時發現問題，說出「哪裡怪、怎麼會發生」",
    "改程式裡的數值（速度、數量、顏色），觀察會有什麼變化",
  ],
  practicing: [
    "讀懂 AI 寫的程式，說得出每一段在做什麼",
    "不靠 AI，自己寫出一小段功能",
    "程式出錯時，先自己想可能的原因，再去問 AI",
  ],
};

/** 獲獎或參賽紀錄：有的話加在這裡，空的時候頁面不會顯示這一塊 */
export const honors: { date: string; title: string; note?: string }[] = [];

/* ───────── 肆、心得與挑戰 ───────── */

/** 軒赫自己說的話：原文來自他第一個網站（2026.10.11） */
export const studentWords = [
  { quote: "我喜歡探索新事物，這是我親手打造的第一個網站！", source: "2026.10.11 · 第一個網站的自我介紹" },
  { quote: "長大以後，成為厲害的工程師，改變世界。", source: "同一個網站的「我的夢想」" },
];

/**
 * 用 AI 寫程式時遇到的困境。很多用 AI 學程式的學生都會遇到。
 * 例子取自遊戲的 Git 紀錄；「怎麼面對」是草稿，請老師確認。
 */
export const challenges: {
  title: string;
  example?: { work: string; date: string };
  problem: string;
  approach: string;
  habit: string;
}[] = [
  {
    title: "做得出來，不代表看得懂",
    problem: "AI 一次就能寫出幾百行程式，遊戲也真的能玩。可是問起其中一段在做什麼，常常說不出來。",
    approach: "加完一個功能後，挑一小段請 AI 用簡單的話解釋，再用自己的話說一遍給老師聽。",
    habit: "先弄懂，再往下做。",
  },
  {
    title: "壞掉的時候，只會說「幫我修好」",
    example: { work: "等天光", date: "2026.10.25" },
    problem: "加上光暈特效後，畫面突然全黑。最快的方法是叫 AI 修好，但這樣下次遇到，還是不知道為什麼。",
    approach: "先問 AI「為什麼會變黑」。原因是有個數值算出來「不是數字」（NaN），一路影響到整個畫面。弄懂原因之後再修。",
    habit: "先問為什麼，再請它修。",
  },
  {
    title: "說不清楚，AI 就用猜的",
    example: { work: "史萊姆捏捏工坊", date: "2026.11.08" },
    problem: "只說「手機不好玩」，AI 不知道要改哪裡，改出來的也不一定是想要的。",
    approach: "實際用手機玩，把問題拆成具體的描述：視角會亂轉、有些地方會撞到看不見的牆、直播時容易按錯，再一項一項修。",
    habit: "把問題描述到別人能重現。",
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
  body: "用〈等天光〉本身當教材，49 個互動場景、8 章，一個場景學一個概念。拖動程式碼裡的數字，畫面就跟著變；每個場景都有一個小任務。目標是弄懂 AI 寫出來的東西，讓 AI 成為學習的幫手，而不是代替思考。",
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
  { goal: "每加一個新功能，都能用自己的話說明它怎麼運作", note: "說不出來，就先不往下做", status: "next" },
  { goal: "試著不靠 AI，自己寫出一小段功能", note: "從改數值、加一個小功能開始", status: "next" },
  { goal: "做出下一款遊戲", note: "製作中", status: "doing" },
];
