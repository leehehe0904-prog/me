import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/content/works";
import styles from "./WorkEntry.module.css";

/** 首頁作品列表的一項。size="lg" 是大張橫向，"sm" 是兩欄的小卡 */
export default function WorkEntry({
  work,
  size = "lg",
  flip = false,
}: {
  work: Work;
  size?: "lg" | "sm";
  flip?: boolean;
}) {
  const detail = `/works/${work.slug}/`;

  return (
    <article className={styles.entry} data-size={size} data-flip={flip} data-reveal>
      <Link href={detail} className={styles.media} aria-label={`${work.title}的介紹`}>
        <Image
          src={work.cover.src}
          alt={work.cover.alt}
          placeholder="blur"
          sizes={size === "lg" ? "(max-width: 900px) 100vw, 720px" : "(max-width: 900px) 100vw, 600px"}
          className={styles.img}
        />
        <span className={styles.index}>{work.index}</span>
      </Link>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{work.genre}</span>
          <span aria-hidden="true">／</span>
          <span>{work.year}</span>
        </p>
        <h3 className={styles.title}>
          <Link href={detail}>
            {work.title}
            {work.subtitle ? <span className={styles.subtitle}>{work.subtitle}</span> : null}
          </Link>
        </h3>
        <p className={styles.summary}>{work.summary}</p>
        <ul className={styles.tech} aria-label="使用技術">
          {work.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <div className={styles.actions}>
          <Link href={detail} className={styles.primary}>
            看介紹 <span aria-hidden="true">→</span>
          </Link>
          {work.play.external ? (
            <a href={work.play.href} className={styles.secondary} target="_blank" rel="noopener noreferrer">
              {work.play.label} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link href="/#play" className={styles.secondary}>
              {work.play.label} <span aria-hidden="true">↓</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
