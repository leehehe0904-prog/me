import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArenaEmbed from "@/components/ArenaEmbed";
import StarCatcher from "@/components/StarCatcher";
import { getWork, works } from "@/content/works";
import styles from "./work.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata(props: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const work = getWork(slug);
  if (!work) return {};
  return { title: work.title, description: work.summary };
}

export default async function WorkPage(props: PageProps<"/works/[slug]">) {
  const { slug } = await props.params;
  const work = getWork(slug);
  if (!work) notFound();

  const i = works.indexOf(work);
  const prev = works[(i - 1 + works.length) % works.length];
  const next = works[(i + 1) % works.length];
  const playable = work.slug === "arena" || work.slug === "stars";

  return (
    <article className={styles.page} style={{ "--tone": work.tone } as React.CSSProperties}>
      <header className={`container ${styles.head}`}>
        <Link href="/#works" className={styles.back}>
          <span aria-hidden="true">←</span> 所有作品
        </Link>

        <div className={styles.headGrid}>
          <div data-reveal>
            <p className={styles.kicker}>
              <span className={styles.idx}>
                {work.index} / {String(works.length).padStart(2, "0")}
              </span>
              <span>{work.genre}</span>
            </p>
            <h1 className={styles.title}>
              {work.title}
              {work.subtitle ? <span className={styles.subtitle}>{work.subtitle}</span> : null}
            </h1>
            <p className={styles.summary}>{work.summary}</p>
          </div>

          <aside className={styles.metaBox} data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
            <dl className={styles.meta}>
              <div>
                <dt>年份</dt>
                <dd>{work.year}</dd>
              </div>
              <div>
                <dt>平台</dt>
                <dd>{work.platform}</dd>
              </div>
              <div>
                <dt>技術</dt>
                <dd>{work.tech.join("、")}</dd>
              </div>
            </dl>
            {work.play.external ? (
              <>
                <a href={work.play.href} className={styles.play} target="_blank" rel="noopener noreferrer">
                  {work.play.label} <span aria-hidden="true">↗</span>
                </a>
                {work.play.note ? <p className={styles.note}>{work.play.note}</p> : null}
              </>
            ) : (
              <a href="#play-here" className={styles.play}>
                {work.play.label} <span aria-hidden="true">↓</span>
              </a>
            )}
          </aside>
        </div>
      </header>

      <div className="container">
        <figure className={styles.cover} data-reveal>
          <Image
            src={work.cover.src}
            alt={work.cover.alt}
            placeholder="blur"
            priority
            sizes="(max-width: 1240px) 100vw, 1240px"
          />
        </figure>
      </div>

      <section className={`container ${styles.block}`}>
        <h2 className={styles.blockLabel}>關於這款遊戲</h2>
        <div className={styles.intro}>
          {work.intro.map((p, n) => (
            <p key={n} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section className={`container ${styles.block}`}>
        <h2 className={styles.blockLabel}>亮點</h2>
        <ol className={styles.features}>
          {work.features.map((f, n) => (
            <li key={f.title} data-reveal style={{ "--reveal-delay": `${(n % 3) * 0.06}s` } as React.CSSProperties}>
              <span className={styles.fNo}>{String(n + 1).padStart(2, "0")}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {work.gallery.length > 0 ? (
        <section className={`container ${styles.block}`}>
          <h2 className={styles.blockLabel}>畫面</h2>
          <div className={styles.gallery} data-count={work.gallery.length}>
            {work.gallery.map((g, n) => (
              <figure key={n} data-reveal>
                <Image src={g.src} alt={g.alt} placeholder="blur" sizes="(max-width: 900px) 100vw, 620px" />
                {g.caption ? <figcaption>{g.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className={`container ${styles.block}`}>
        <h2 className={styles.blockLabel}>操作方式</h2>
        <dl className={styles.controls} data-reveal>
          {work.controls.map((c) => (
            <div key={c.keys + c.action}>
              <dt>
                {c.keys.split(" / ").map((alt, n) => (
                  <span key={alt} className={styles.keyGroup}>
                    {n > 0 ? <span className={styles.slash}>/</span> : null}
                    {/* 「W A S D」這種單一字母的組合拆成一顆一顆按鍵 */}
                    {(/^(\w )+\w$/.test(alt) ? alt.split(" ") : [alt]).map((k) => (
                      <kbd key={k}>{k}</kbd>
                    ))}
                  </span>
                ))}
              </dt>
              <dd>{c.action}</dd>
            </div>
          ))}
        </dl>
      </section>

      {playable ? (
        <section id="play-here" className={styles.playHere}>
          <div className="container">
            <h2 className={styles.playTitle}>現在就玩</h2>
            {work.slug === "arena" ? <ArenaEmbed /> : <StarCatcher />}
          </div>
        </section>
      ) : null}

      <nav className="container" aria-label="其他作品">
        <div className={styles.pager}>
          <Link href={`/works/${prev.slug}/`} className={styles.pagerLink}>
            <span className={styles.pagerDir}>← 上一個</span>
            <span className={styles.pagerTitle}>{prev.title}</span>
          </Link>
          <Link href={`/works/${next.slug}/`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerDir}>下一個 →</span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
