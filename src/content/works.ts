import type { StaticImageData } from "next/image";

import zombie1 from "@/assets/shots/zombie-1.webp";
import zombie2 from "@/assets/shots/zombie-2.webp";
import zombie3 from "@/assets/shots/zombie-3.webp";
import zombie4 from "@/assets/shots/zombie-4.webp";
import zombie5 from "@/assets/shots/zombie-5.webp";
import slime1 from "@/assets/shots/slime-1.webp";
import slime2 from "@/assets/shots/slime-2.webp";
import slime3 from "@/assets/shots/slime-3.webp";
import slime4 from "@/assets/shots/slime-4.webp";
import slime5 from "@/assets/shots/slime-5.webp";
import arena1 from "@/assets/shots/arena-1.webp";
import arena2 from "@/assets/shots/arena-2.webp";
import stars1 from "@/assets/shots/stars-1.webp";
import stars2 from "@/assets/shots/stars-2.webp";

export type Shot = { src: StaticImageData; alt: string; caption?: string };

export type Work = {
  slug: string;
  index: string;
  title: string;
  subtitle?: string;
  genre: string;
  year: string;
  summary: string;
  /** 詳細頁開頭的長一點的介紹 */
  intro: string[];
  features: { title: string; body: string }[];
  controls: { keys: string; action: string }[];
  tech: string[];
  platform: string;
  /** 外部網址或站內遊玩頁 */
  play: { href: string; label: string; external: boolean; note?: string };
  cover: Shot;
  gallery: Shot[];
  /** 製作方式（詳細頁的資訊欄）。不確定的就不要填 */
  making?: string;
  /** 卡片與詳細頁的代表色（取自遊戲本身） */
  tone: string;
};

export const works: Work[] = [
  {
    slug: "zombie",
    index: "01",
    title: "等天光",
    subtitle: "第七暝",
    genre: "3D 第一人稱 · 生存射擊",
    year: "2026",
    summary:
      "午夜之後的聖心醫院。在地下納骨堂、病房與停車場之間撐過一波又一波的屍潮，回合之間到一樓便利商店補給、升級武器。",
    intro: [
      "「阿嬤死在 207 號房。今晚，她打電話叫你回來。」這是軒赫的第一款 3D 遊戲。玩家被困在午夜之後的聖心醫院，要撐到天亮。醫院有地下一樓到三樓，加上戶外的停車場與墓園，約 75 個風格不同的區域，燈光、霧氣和環境音都會跟著區域改變。",
      "每一波打完可以到一樓便利商店改成的「金水商行」買武器、彈藥與改裝。可以一個人玩，也可以邀朋友連線合作，或是來一場對戰死鬥。",
    ],
    features: [
      { title: "多樓層醫院", body: "B1 到 3F 加上戶外，約 75 個區域，還有腳本安排的驚嚇事件。" },
      { title: "十一種活屍", body: "會飛撲、吐酸、爬天花板、怕手電筒……被打中可以斷肢，倒下變成物理布娃娃。" },
      { title: "武器與改裝", body: "六把槍加上手榴彈與小刀，有開鏡、後座力、穿透，商店可以改裝傷害、彈匣與換彈速度。" },
      {
        title: "有節奏的難度",
        body: "每 5 波出現首領；第 8 波整層停電，只剩緊急照明。四段難度從「阿嬤會一直叫你」到「無人叫你」。",
      },
      { title: "多人連線", body: "2–4 人合作生存、2–8 人對戰死鬥。隊友倒地可以靠近按住 E 救起來。" },
      { title: "即時合成的聲音", body: "音效與配樂都是用 Web Audio 在瀏覽器裡即時合成，不是播放錄好的檔案。" },
    ],
    controls: [
      { keys: "W A S D", action: "移動" },
      { keys: "Shift", action: "奔跑" },
      { keys: "Space", action: "跳躍" },
      { keys: "滑鼠左鍵 / 右鍵", action: "射擊 / 開鏡" },
      { keys: "R", action: "換彈" },
      { keys: "E", action: "互動、開商店" },
      { keys: "H", action: "手電筒" },
      { keys: "M", action: "地圖" },
    ],
    tech: ["Three.js", "Rapier 物理", "Web Audio", "WebSocket", "Vite"],
    platform: "電腦瀏覽器（鍵盤＋滑鼠）",
    play: {
      href: "https://zombie.iosoftware.ai/",
      label: "前往遊玩",
      external: true,
      note: "需要用 Google 帳號登入",
    },
    cover: { src: zombie1, alt: "醫院挑高大廳裡，一群活屍朝玩家走來" },
    gallery: [
      { src: zombie2, alt: "一隻眼睛發光的活屍撲到玩家面前", caption: "一樓大廳：活屍撲到眼前" },
      {
        src: zombie3,
        alt: "昏暗的三樓精神科走廊，指標寫著監控室",
        caption: "3F 精神科走廊：廣播說「您的家人已經回來了。」",
      },
      {
        src: zombie4,
        alt: "金水商行的武器頁，比較巴雷特與 AK-47 的數值",
        caption: "金水商行：買槍時會和手上的武器比較數值",
      },
      { src: zombie5, alt: "像監視器畫面的主選單，標題是等天光", caption: "主選單：做成監視器畫面的樣子" },
    ],
    making: "和 AI 協作，老師從旁指導",
    tone: "#7a2a1c",
  },
  {
    slug: "slime",
    index: "02",
    title: "史萊姆捏捏工坊",
    subtitle: "Squish Lab",
    genre: "3D 開放世界 · 經營",
    year: "2026",
    summary:
      "走進月光谷，捕捉史萊姆、送進產線加工、裝飾，再透過直播和網站賣出去。賺到的錢可以搭計程車到大城市買新設備。",
    intro: [
      "軒赫的第二款 3D 遊戲，換了一個完全不同的方向：明亮、可愛的開放世界經營遊戲。玩家用第一人稱在月光谷裡自由走動，介面參考了 Minecraft 的操作方式，有快捷列、背包和指南針。",
      "世界分成森林、海岸、火山、雪原四個區域，每一區都要先解開謎題才能進入。遊戲支援手機的虛擬搖桿，也能用 PeerJS 和朋友點對點連線。",
    ],
    features: [
      { title: "四個區域", body: "森林、海岸、火山、雪原，天空和霧氣會隨區域漸變，植物用大量實例化模型擺放。" },
      { title: "解謎開路", body: "古地圖碎片與 3×3 旋轉拼圖、撕碎的紙條與潮汐石陣、熔岩柱邏輯謎題。" },
      {
        title: "經營循環",
        body: "捕捉、加工、裝飾、販售。直播單價高但要自己衝人氣；網站是被動收入，還會收到顧客評價。",
      },
      {
        title: "大城市採購",
        body: "一開始只有手作台和電腦，搭計程車到大城市買加工機器、裝飾桌與直播設備，買了才會出現在工坊。",
      },
      { title: "八種史萊姆", body: "每一種都有自己的造型特徵：氣泡、內核、虹膜眼睛、腮紅和滴落效果。" },
      { title: "手機也能玩", body: "虛擬搖桿加滑動視角，點一下就能互動；遊戲會自動存檔。" },
    ],
    controls: [
      { keys: "W A S D", action: "移動" },
      { keys: "滑鼠", action: "轉動視角" },
      { keys: "Space", action: "跳躍" },
      { keys: "E / F", action: "互動、使用工作站" },
      { keys: "I / Tab", action: "背包" },
      { keys: "Esc", action: "選單、存檔" },
      { keys: "T", action: "聊天（多人連線時）" },
    ],
    tech: ["Three.js", "PeerJS", "Canvas", "自動存檔"],
    platform: "電腦與手機瀏覽器",
    play: {
      href: "https://slime.iosoftware.ai/",
      label: "前往遊玩",
      external: true,
      note: "需要輸入遊玩金鑰",
    },
    cover: { src: slime1, alt: "海岸區域，一隻粉紅色的史萊姆站在沙灘上" },
    gallery: [
      { src: slime2, alt: "雪原區域的松樹林與綠色史萊姆", caption: "雪原：天空和霧氣會隨區域漸變" },
      { src: slime3, alt: "直播台介面，正在展示一顆史萊姆捏捏", caption: "直播台：自己衝人氣，單價比較高" },
      { src: slime4, alt: "三台加工機器排成的產線與切割小遊戲", caption: "加工產線：三台機器要到大城市買齊" },
      { src: slime5, alt: "中央平地的手作台與工坊設備", caption: "工坊：一開始只有手作台和電腦" },
    ],
    making: "和 AI 協作，老師從旁指導",
    tone: "#2f5d4a",
  },
  {
    slug: "arena",
    index: "03",
    title: "方塊鬥技場",
    genre: "2D 等角視角 · 對戰",
    year: "2026",
    summary: "等角視角的方塊對戰，三戰兩勝，每回合 60 秒。可以和電腦對打，也能兩個人擠在同一個鍵盤上。",
    intro: [
      "軒赫的第一款對戰遊戲，整個遊戲寫在一個 HTML 檔案裡。場地是 12×12 的等角格子，中間散著幾個木箱當掩護。",
      "所有可以調整的數值（移動速度、攻擊距離、冷卻時間、電腦的反應速度）都集中在檔案最上面的 CONFIG 裡。改一個數字就能感覺到手感的變化，很適合拿來練習「先猜、再改、再看」。",
    ],
    features: [
      { title: "三種動作", body: "近戰、能量球（手槍）和衝刺，各自有冷卻時間，用頭上的三層圓環顯示。" },
      { title: "打擊感", body: "被打中會擊退、閃白、跳起來，畫面震動，血條還有延遲下降的殘影。" },
      { title: "電腦對手", body: "兩種難度，會追擊、放技能，血量低於 30% 時還會撤退和衝刺閃避。" },
      { title: "雙人同樂", body: "單人對電腦，或兩個人共用一個鍵盤；沒有數字鍵盤也能用 , . / 代替。" },
    ],
    controls: [
      { keys: "W A S D", action: "P1 移動" },
      { keys: "滑鼠左鍵", action: "P1 開槍（能量球）" },
      { keys: "滑鼠右鍵", action: "P1 近戰" },
      { keys: "Q", action: "P1 衝刺" },
      { keys: "方向鍵", action: "P2 移動" },
      { keys: "Num 1 2 3（或 , . /）", action: "P2 攻擊、能量球、衝刺" },
      { keys: "P / Esc", action: "暫停" },
    ],
    tech: ["HTML Canvas", "JavaScript", "等角投影"],
    platform: "電腦瀏覽器（鍵盤＋滑鼠）",
    play: { href: "/play/arena/", label: "在網站上玩", external: false },
    cover: { src: arena1, alt: "等角視角的場地上，玩家和電腦在木箱之間對戰" },
    gallery: [{ src: arena2, alt: "方塊鬥技場標題畫面", caption: "標題畫面：可以切換單人／雙人與難度" }],
    tone: "#8a5d36",
  },
  {
    slug: "stars",
    index: "04",
    title: "太空接星星",
    genre: "2D 街機 · 小遊戲",
    year: "2026",
    summary: "移動飛碟接住星星、閃開隕石。分數越高，東西掉得越快、隕石越多。",
    intro: [
      "這是軒赫放在第一個網站裡的小遊戲，也是他第一次接觸「遊戲迴圈」：每一格畫面更新位置、檢查碰撞、再重新畫一次。",
      "滑鼠、鍵盤、手指都能玩。最高分會存在瀏覽器裡，下次打開還在。",
    ],
    features: [
      { title: "難度會長大", body: "分數越高，星星和隕石掉得越快、出現得越頻繁，隕石的比例也會增加。" },
      { title: "三種操作", body: "電腦用滑鼠或方向鍵，手機用手指拖曳。" },
      { title: "最高分紀錄", body: "用 localStorage 把最高分存在瀏覽器裡。" },
      { title: "指標鎖定", body: "開始後滑鼠會鎖在遊戲畫面裡，按 Esc 放開並暫停。" },
    ],
    controls: [
      { keys: "滑鼠 / ← →", action: "移動飛碟" },
      { keys: "手指拖曳", action: "移動飛碟（手機）" },
      { keys: "Esc", action: "放開滑鼠、暫停" },
    ],
    tech: ["HTML Canvas", "JavaScript", "localStorage"],
    platform: "電腦與手機瀏覽器",
    play: { href: "/#play", label: "在網站上玩", external: false },
    cover: { src: stars1, alt: "飛碟在夜空中接星星、閃隕石" },
    gallery: [{ src: stars2, alt: "原版太空接星星的畫面", caption: "第一個網站裡的原版：星星和飛碟是用 emoji 畫的" }],
    tone: "#b07a2a",
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
