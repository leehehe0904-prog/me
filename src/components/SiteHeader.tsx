"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Seal from "./Seal";
import { profile } from "@/content/profile";
import styles from "./SiteHeader.module.css";

const links = [
  { href: "/#works", label: "作品", no: "01" },
  { href: "/#play", label: "遊戲間", no: "02" },
  { href: "/#about", label: "關於我", no: "03" },
  { href: "/learning/", label: "學習報告", no: "04" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 換頁時關閉手機選單（在 render 時比對路徑，React 建議的寫法）
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-print="hide" data-scrolled={scrolled || open} data-open={open}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} aria-label={`${profile.name}，回到首頁`}>
          <Seal size={30} />
          <span className={styles.name}>{profile.name}</span>
          <span className={styles.tag}>作品集</span>
        </Link>

        <nav className={styles.nav} aria-label="主要導覽">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.link}>
              <span className={styles.no}>{l.no}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link href="/#play" className={styles.cta}>
          玩一場
          <span aria-hidden="true">→</span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "關閉選單" : "開啟選單"}</span>
          <span className={styles.bars} aria-hidden="true" />
        </button>
      </div>

      <div id="mobile-menu" className={styles.sheet} hidden={!open}>
        <nav className="container" aria-label="手機導覽">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.sheetLink} onClick={() => setOpen(false)}>
                  <span className={styles.no}>{l.no}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.sheetNote}>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          </p>
        </nav>
      </div>
    </header>
  );
}
