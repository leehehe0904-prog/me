"use client";

import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import ArenaEmbed from "./ArenaEmbed";
import StarCatcher from "./StarCatcher";
import styles from "./Playroom.module.css";

const tabs = [
  { id: "arena", label: "方塊鬥技場", meta: "對戰 · 鍵盤＋滑鼠" },
  { id: "stars", label: "太空接星星", meta: "街機 · 手機也能玩" },
] as const;
type TabId = (typeof tabs)[number]["id"];

const TOUCH_QUERY = "(hover: none) and (pointer: coarse)";
const subscribeTouch = (cb: () => void) => {
  const mq = window.matchMedia(TOUCH_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getTouch = () => window.matchMedia(TOUCH_QUERY).matches;

export default function Playroom() {
  const [chosen, setActive] = useState<TabId | null>(null);
  const isTouch = useSyncExternalStore(subscribeTouch, getTouch, () => false);
  // 還沒選過的話：手機與平板預設打開可以用手指玩的那款
  const active: TabId = chosen ?? (isTouch ? "stars" : "arena");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const i = tabs.findIndex((t) => t.id === active);
    const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length].id;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className={styles.room}>
      <div className={styles.tabs} role="tablist" aria-label="選擇遊戲" onKeyDown={onKey}>
        {tabs.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[t.id] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(t.id)}
          >
            <span className={styles.tabNo}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.tabLabel}>{t.label}</span>
            <span className={styles.tabMeta}>{t.meta}</span>
          </button>
        ))}
      </div>

      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== t.id}
          className={styles.panel}
        >
          {/* 切換分頁時把遊戲卸載，避免背景還在跑、還在搶鍵盤 */}
          {active === t.id ? t.id === "arena" ? <ArenaEmbed /> : <StarCatcher /> : null}
          <p className={styles.more}>
            <Link href={`/works/${t.id}/`}>看〈{t.label}〉的製作介紹 →</Link>
          </p>
        </div>
      ))}
    </div>
  );
}
