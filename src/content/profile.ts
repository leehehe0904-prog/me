export const profile = {
  name: "李軒赫",
  shortName: "軒赫",
  age: 11,
  github: "https://github.com/leehehe0904-prog",
  description:
    "李軒赫，11 歲，和 AI 一起做遊戲，也在學著讀懂程式。這裡收錄他的四款作品和學習紀錄。",
};

/** 興趣（原本網站的內容，重新整理） */
export const interests = [
  { title: "玩遊戲", body: "喜歡挑戰關卡、動腦破解謎題，玩完常常想：這是怎麼做出來的？" },
  { title: "寫程式", body: "正在學 HTML、CSS 和 JavaScript，也在學怎麼和 AI 一起寫程式。" },
  { title: "運動", body: "流汗的感覺很棒，寫程式寫累了就去動一動。" },
  { title: "看書", body: "喜歡科學和冒險故事，很多遊戲點子是從書裡來的。" },
];

/** 學習歷程：日期都來自 Git 紀錄 */
export const journey = [
  {
    date: "2026.10.11",
    title: "第一個網站",
    body: "用 HTML、CSS、JavaScript 寫出自我介紹網頁，還在裡面放了一個小遊戲〈太空接星星〉。",
    tag: "起點",
  },
  {
    date: "2026.10.18",
    title: "方塊鬥技場",
    body: "第一款對戰遊戲。同一天改了三個版本：先做出對打，再加上手槍，最後改成滑鼠開槍、近戰與衝刺。",
    tag: "2D 遊戲",
  },
  {
    date: "2026.10.25",
    title: "等天光 · 第七暝",
    body: "第一款 3D 遊戲，和 AI 一起做。從灰色方塊搭的場景開始，陸續加入多樓層醫院、各種活屍和多人連線。",
    tag: "3D 遊戲",
  },
  {
    date: "2026.11.01",
    title: "整合個人網站",
    body: "把自己做的遊戲嵌進網站，讓大家打開網頁就能直接玩。",
    tag: "網站",
  },
  {
    date: "2026.11.08",
    title: "史萊姆捏捏工坊",
    body: "第二款 3D 遊戲：開放世界、解謎、經營與直播，還支援手機操作。",
    tag: "3D 遊戲",
  },
] as const;

/** 工具箱：每一項都附上在哪個作品用過 */
export const toolbox = [
  { name: "HTML", usedIn: "每一個網頁與遊戲的骨架" },
  { name: "CSS", usedIn: "版面、動畫與遊戲介面" },
  { name: "JavaScript", usedIn: "所有遊戲的規則與互動" },
  { name: "Canvas 2D", usedIn: "方塊鬥技場、太空接星星" },
  { name: "Three.js", usedIn: "等天光、史萊姆捏捏工坊的 3D 世界" },
  { name: "Web Audio", usedIn: "即時合成的音效與配樂" },
  { name: "多人連線", usedIn: "WebSocket、PeerJS 點對點" },
  { name: "Git / GitHub", usedIn: "版本紀錄與網站部署" },
];
