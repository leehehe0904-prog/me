"use client";

import Image from "next/image";
import { useState } from "react";
import { getWork } from "@/content/works";
import { withBase } from "@/lib/base";
import styles from "./ArenaEmbed.module.css";

/**
 * 方塊鬥技場：按下按鈕才載入遊戲，避免一打開網頁就搶走鍵盤。
 * 這款需要鍵盤和滑鼠，手機與平板改成顯示提示。
 */
export default function ArenaEmbed() {
  const [loaded, setLoaded] = useState(false);
  const arena = getWork("arena")!;
  const src = withBase("/play/arena/");

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        {loaded ? (
          <iframe className={styles.iframe} src={src} title="方塊鬥技場" allow="fullscreen" />
        ) : (
          <div className={styles.poster}>
            <Image src={arena.cover.src} alt="" fill sizes="(max-width: 1240px) 100vw, 1000px" className={styles.img} />
            <div className={styles.scrim} />
            <div className={styles.center}>
              <button type="button" className={styles.play} onClick={() => setLoaded(true)}>
                <span className={styles.tri} aria-hidden="true" />
                載入遊戲
              </button>
              <p className={styles.touchNote}>這款需要鍵盤和滑鼠，請用電腦開啟。</p>
            </div>
          </div>
        )}
      </div>

      <div className={styles.bar}>
        <p className={styles.hint}>
          {loaded ? "點一下遊戲畫面就能用鍵盤操作。" : "標題畫面：↑↓ 切換選項，←→ 更改設定，Enter 開始。"}
        </p>
        <a className={styles.full} href={src} target="_blank" rel="noopener">
          全螢幕開啟 ↗
        </a>
      </div>
    </div>
  );
}
