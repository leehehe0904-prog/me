"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReportToc.module.css";

type Part = { id: string; no: string; label: string };

/** 報告頁的目錄：桌機在左側固定，手機變成頂端可橫向滑動的標籤列；目前讀到哪一章會標出來 */
export default function ReportToc({ parts }: { parts: readonly Part[] }) {
  const [active, setActive] = useState<string>(parts[0].id);

  useEffect(() => {
    const sections = parts.map((p) => document.getElementById(p.id)).filter((el): el is HTMLElement => !!el);
    // 以畫面上方 30% 的那條線為準：線經過哪一章，就標哪一章
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -69% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [parts]);

  // 手機的橫向標籤列：讓目前這一章的標籤保持在畫面內
  const listRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    // offsetLeft 都是相對於目錄外框（sticky），先扣掉標籤列本身的位置
    const left = link.offsetLeft - list.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.toc} aria-label="報告目錄">
      <p className={styles.title}>目錄</p>
      <ol ref={listRef}>
        {parts.map((p) => (
          <li key={p.id}>
            <a href={`#${p.id}`} aria-current={active === p.id ? "location" : undefined} className={styles.link}>
              <span className={styles.no}>{p.no}</span>
              {p.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
