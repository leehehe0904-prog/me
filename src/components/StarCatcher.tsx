"use client";

/*
 * 太空接星星：軒赫第一個網站裡的小遊戲。
 * 遊戲規則與數值和原版一樣，只是改成 React 元件，並把 emoji 換成用 Canvas 畫的圖形，
 * 讓畫面和整個網站的配色一致。
 */
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./StarCatcher.module.css";

const W = 600;
const H = 400;
const COLORS = {
  bg: "#1c1a17",
  dot: "rgba(237,232,221,0.16)",
  star: "#e0a43a",
  starCore: "#f6d9a0",
  rock: "#c8381f",
  rockLight: "#ea6142",
  ship: "#ede8dd",
  shipShade: "#bdb4a2",
  dome: "rgba(224,164,58,0.55)",
};

type Item = { x: number; y: number; r: number; speed: number; type: "star" | "rock"; spin: number };
type Particle = { x: number; y: number; vx: number; vy: number; life: number; color: string };
type Phase = "idle" | "running" | "paused" | "over";

// 背景的小點點，只產生一次
const DOTS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 137.5) % W,
  y: (i * 61.8 * 3.3) % H,
  r: i % 5 === 0 ? 1.4 : 0.8,
}));

export default function StarCatcher() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const state = useRef({
    ship: { x: W / 2, y: H - 40, r: 22 },
    items: [] as Item[],
    particles: [] as Particle[],
    score: 0,
    lives: 3,
    spawnTimer: 0,
    last: 0,
    raf: 0,
    keys: {} as Record<string, boolean>,
    phase: "idle" as Phase,
  });
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);

  const bestRef = useRef(0);

  // 最高分存在瀏覽器裡（存不了也沒關係）
  useEffect(() => {
    try {
      bestRef.current = Number(localStorage.getItem("starBest")) || 0;
      setBest(bestRef.current);
    } catch {}
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const g = canvas.getContext("2d");
    if (!g) return;
    const s = state.current;
    const dpr = canvas.width / W;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);

    g.fillStyle = COLORS.bg;
    g.fillRect(0, 0, W, H);
    g.fillStyle = COLORS.dot;
    for (const d of DOTS) {
      g.beginPath();
      g.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      g.fill();
    }

    for (const it of s.items) {
      if (it.type === "star") drawStar(g, it.x, it.y, 14, it.spin);
      else drawRock(g, it);
    }

    for (const p of s.particles) {
      g.globalAlpha = Math.max(0, p.life / 0.6);
      g.fillStyle = p.color;
      g.fillRect(p.x - 2, p.y - 2, 4, 4);
    }
    g.globalAlpha = 1;

    drawShip(g, s.ship.x, s.ship.y);
  }, []);

  // 第一次顯示時畫出靜態畫面，並依螢幕密度設定畫布解析度
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    draw();
  }, [draw]);

  const shake = () => {
    boxRef.current?.animate(
      [{ transform: "translateX(-8px)" }, { transform: "translateX(8px)" }, { transform: "none" }],
      { duration: 200 },
    );
  };

  const burst = (x: number, y: number, color: string) => {
    const s = state.current;
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const v = 60 + Math.random() * 140;
      s.particles.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 0.6, color });
    }
  };

  const endGame = useCallback(() => {
    const s = state.current;
    s.phase = "over";
    cancelAnimationFrame(s.raf);
    if (document.pointerLockElement === canvasRef.current) document.exitPointerLock();
    const isBest = s.score > bestRef.current;
    if (isBest) {
      bestRef.current = s.score;
      setBest(s.score);
      try {
        localStorage.setItem("starBest", String(s.score));
      } catch {}
    }
    setNewBest(isBest);
    setPhase("over");
  }, []);

  // requestAnimationFrame 透過 ref 呼叫最新的 loop，避免函式在宣告前就引用自己
  const loopRef = useRef<(now: number) => void>(() => {});
  const frame = useCallback((now: number) => loopRef.current(now), []);

  const loop = useCallback(
    (now: number) => {
      const s = state.current;
      if (s.phase !== "running") return;
      const dt = Math.min((now - s.last) / 1000, 0.05);
      s.last = now;

      if (s.keys.ArrowLeft || s.keys.a) s.ship.x -= 380 * dt;
      if (s.keys.ArrowRight || s.keys.d) s.ship.x += 380 * dt;
      s.ship.x = Math.max(s.ship.r, Math.min(W - s.ship.r, s.ship.x));

      // 分數越高，東西掉越快、越多
      s.spawnTimer -= dt;
      if (s.spawnTimer <= 0) {
        const level = 1 + s.score / 15;
        s.items.push({
          x: 20 + Math.random() * (W - 40),
          y: -20,
          r: 16,
          speed: (90 + Math.random() * 80) * Math.min(level, 3),
          type: Math.random() < 0.3 + Math.min(s.score / 100, 0.25) ? "rock" : "star",
          spin: Math.random() * Math.PI,
        });
        s.spawnTimer = Math.max(0.35, 0.9 - s.score * 0.01);
      }

      for (let i = s.items.length - 1; i >= 0; i--) {
        const it = s.items[i];
        it.y += it.speed * dt;
        it.spin += dt * (it.type === "star" ? 1.6 : 0.8);
        const hit = Math.hypot(it.x - s.ship.x, it.y - s.ship.y) < it.r + s.ship.r;
        if (hit) {
          s.items.splice(i, 1);
          if (it.type === "star") {
            s.score++;
            setScore(s.score);
            burst(it.x, it.y, COLORS.star);
          } else {
            s.lives--;
            setLives(s.lives);
            burst(it.x, it.y, COLORS.rockLight);
            shake();
          }
          if (s.lives <= 0) {
            draw();
            return endGame();
          }
        } else if (it.y > H + 20) {
          s.items.splice(i, 1);
        }
      }

      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt;
        if (p.life <= 0) s.particles.splice(i, 1);
      }

      draw();
      s.raf = requestAnimationFrame(frame);
    },
    [draw, endGame, frame],
  );

  useEffect(() => {
    loopRef.current = loop;
  }, [loop]);

  const lockMouse = () => {
    const c = canvasRef.current;
    if (!c?.requestPointerLock || window.matchMedia("(pointer: coarse)").matches) return;
    try {
      const p = c.requestPointerLock() as unknown as Promise<void> | undefined;
      p?.catch?.(() => {});
    } catch {}
  };

  const resume = useCallback(() => {
    const s = state.current;
    s.phase = "running";
    setPhase("running");
    lockMouse();
    s.last = performance.now();
    s.raf = requestAnimationFrame(frame);
  }, [frame]);

  const start = useCallback(() => {
    const s = state.current;
    s.ship = { x: W / 2, y: H - 40, r: 22 };
    s.items = [];
    s.particles = [];
    s.score = 0;
    s.lives = 3;
    s.spawnTimer = 0;
    setScore(0);
    setLives(3);
    setNewBest(false);
    resume();
  }, [resume]);

  const pause = useCallback(() => {
    const s = state.current;
    if (s.phase !== "running") return;
    s.phase = "paused";
    cancelAnimationFrame(s.raf);
    setPhase("paused");
  }, []);

  // 滑鼠、鍵盤、手指
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const s = state.current;

    const moveTo = (clientX: number) => {
      if (s.phase !== "running") return;
      const rect = c.getBoundingClientRect();
      s.ship.x = ((clientX - rect.left) / rect.width) * W;
    };
    const onMouse = (e: MouseEvent) => {
      if (document.pointerLockElement === c) {
        const rect = c.getBoundingClientRect();
        s.ship.x += e.movementX * (W / rect.width);
      } else moveTo(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (s.phase !== "running") return;
      e.preventDefault();
      moveTo(e.touches[0].clientX);
    };
    const onDown = (e: KeyboardEvent) => {
      s.keys[e.key] = true;
      if (s.phase === "running" && (e.key === "ArrowLeft" || e.key === "ArrowRight")) e.preventDefault();
    };
    const onUp = (e: KeyboardEvent) => {
      s.keys[e.key] = false;
    };
    const onLock = () => {
      if (document.pointerLockElement !== c && s.phase === "running") pause();
    };
    const onHidden = () => document.hidden && pause();

    c.addEventListener("mousemove", onMouse);
    c.addEventListener("touchstart", onTouch, { passive: false });
    c.addEventListener("touchmove", onTouch, { passive: false });
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    document.addEventListener("pointerlockchange", onLock);
    document.addEventListener("visibilitychange", onHidden);
    return () => {
      cancelAnimationFrame(s.raf);
      c.removeEventListener("mousemove", onMouse);
      c.removeEventListener("touchstart", onTouch);
      c.removeEventListener("touchmove", onTouch);
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      document.removeEventListener("pointerlockchange", onLock);
      document.removeEventListener("visibilitychange", onHidden);
      if (s.phase === "running") s.phase = "paused";
    };
  }, [pause]);

  const overlay = {
    idle: { title: "準備好了嗎？", text: "接住星星得分，碰到隕石扣一條命。", button: "開始遊戲" },
    paused: { title: "暫停中", text: "滑鼠已放開，按下按鈕繼續。", button: "繼續遊戲" },
    over: {
      title: newBest ? "新紀錄！" : "遊戲結束",
      text: `這一局得到 ${score} 分`,
      button: "再玩一次",
    },
    running: null,
  }[phase];

  return (
    <div className={styles.wrap}>
      <div className={styles.hud} aria-live="polite">
        <span>
          <em>分數</em>
          <b>{String(score).padStart(3, "0")}</b>
        </span>
        <span>
          <em>生命</em>
          <span className={styles.lives} aria-label={`剩下 ${lives} 條命`}>
            {[0, 1, 2].map((i) => (
              <i key={i} data-on={i < lives} />
            ))}
          </span>
        </span>
        <span>
          <em>最高分</em>
          <b>{String(best).padStart(3, "0")}</b>
        </span>
      </div>

      <div className={styles.box} ref={boxRef}>
        <canvas ref={canvasRef} className={styles.canvas} width={W} height={H} aria-label="太空接星星遊戲畫面" />
        {overlay ? (
          <div className={styles.overlay}>
            <p className={styles.title}>{overlay.title}</p>
            <p className={styles.text}>{overlay.text}</p>
            <button type="button" className={styles.button} onClick={phase === "paused" ? resume : start}>
              {overlay.button}
            </button>
          </div>
        ) : null}
      </div>
      <p className={styles.help}>電腦：滑鼠或 ← → 方向鍵（Esc 暫停）　手機：用手指拖曳</p>
    </div>
  );
}

function drawStar(g: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  g.save();
  g.translate(x, y);
  g.rotate(rot);
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45;
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    g.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
  }
  g.closePath();
  g.fillStyle = COLORS.star;
  g.fill();
  g.beginPath();
  g.arc(0, 0, r * 0.22, 0, Math.PI * 2);
  g.fillStyle = COLORS.starCore;
  g.fill();
  g.restore();
}

function drawRock(g: CanvasRenderingContext2D, it: Item) {
  // 尾巴
  const grad = g.createLinearGradient(it.x, it.y - 46, it.x, it.y);
  grad.addColorStop(0, "rgba(234,97,66,0)");
  grad.addColorStop(1, "rgba(234,97,66,0.45)");
  g.strokeStyle = grad;
  g.lineWidth = 10;
  g.lineCap = "round";
  g.beginPath();
  g.moveTo(it.x, it.y - 46);
  g.lineTo(it.x, it.y - 6);
  g.stroke();

  g.save();
  g.translate(it.x, it.y);
  g.rotate(it.spin);
  g.beginPath();
  const n = 9;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const rad = 13 + ((i * 7) % 5) * 0.9;
    g.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
  }
  g.closePath();
  g.fillStyle = COLORS.rock;
  g.fill();
  g.fillStyle = COLORS.rockLight;
  g.beginPath();
  g.arc(-4, -4, 3.2, 0, Math.PI * 2);
  g.arc(4, 3, 2.2, 0, Math.PI * 2);
  g.fill();
  g.restore();
}

function drawShip(g: CanvasRenderingContext2D, x: number, y: number) {
  g.save();
  g.translate(x, y);
  // 光束
  g.fillStyle = "rgba(224,164,58,0.10)";
  g.beginPath();
  g.moveTo(-10, 6);
  g.lineTo(10, 6);
  g.lineTo(18, 40);
  g.lineTo(-18, 40);
  g.closePath();
  g.fill();
  // 罩子
  g.fillStyle = COLORS.dome;
  g.beginPath();
  g.ellipse(0, -5, 11, 10, 0, Math.PI, 0);
  g.fill();
  // 機身
  g.fillStyle = COLORS.ship;
  g.beginPath();
  g.ellipse(0, 0, 24, 8, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = COLORS.shipShade;
  g.beginPath();
  g.ellipse(0, 3, 22, 4.5, 0, 0, Math.PI);
  g.fill();
  // 燈
  g.fillStyle = COLORS.rockLight;
  for (const dx of [-13, 0, 13]) {
    g.beginPath();
    g.arc(dx, 0.5, 1.8, 0, Math.PI * 2);
    g.fill();
  }
  g.restore();
}
