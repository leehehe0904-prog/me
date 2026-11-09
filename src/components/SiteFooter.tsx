import Link from "next/link";
import Seal from "./Seal";
import { profile } from "@/content/profile";
import { works } from "@/content/works";
import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer} data-print="hide">
      <div className="container">
        <div className={styles.top}>
          <p className={styles.big} data-reveal>
            下一款遊戲，
            <br />
            製作中
            <span className={styles.cursor} aria-hidden="true" />
          </p>

          <div className={styles.grid}>
            <div className={styles.col}>
              <p className={styles.label}>作品</p>
              <ul>
                {works.map((w) => (
                  <li key={w.slug}>
                    <Link href={`/works/${w.slug}/`}>{w.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.col}>
              <p className={styles.label}>網站</p>
              <ul>
                <li>
                  <Link href="/#about">關於我</Link>
                </li>
                <li>
                  <Link href="/learning/">學習報告</Link>
                </li>
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.base}>
          <span className={styles.sign}>
            <Seal size={22} />© 2026 {profile.name}
          </span>
          <span>用 HTML、CSS、JavaScript 與 Next.js 製作</span>
        </div>
      </div>
    </footer>
  );
}
