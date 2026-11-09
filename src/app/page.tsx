import Image from "next/image";
import Link from "next/link";
import Playroom from "@/components/Playroom";
import Seal from "@/components/Seal";
import SectionHead from "@/components/SectionHead";
import WorkEntry from "@/components/WorkEntry";
import { interests, journey, profile } from "@/content/profile";
import { parts, report } from "@/content/report";
import { works } from "@/content/works";
import styles from "./home.module.css";

export default function Home() {
  const [zombie, slime, arena, stars] = works;

  return (
    <>
      {/* ───────── 開場 ───────── */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroText}>
            <p className={styles.heroKicker} data-reveal>
              <span>作品集</span>
              <span className={styles.dot} aria-hidden="true" />
              <span>2026</span>
            </p>
            <h1 className={styles.heroName} data-reveal style={{ "--reveal-delay": "0.05s" } as React.CSSProperties}>
              {profile.name}
            </h1>
            <p className={styles.heroLine} data-reveal style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
              十一歲，正在把
              <br />
              點子做成<em>遊戲</em>。
            </p>
            <p className={styles.heroBody} data-reveal style={{ "--reveal-delay": "0.15s" } as React.CSSProperties}>
              我的遊戲大多是和 AI 一起做的：我想玩法、描述需求、試玩挑問題，AI
              幫忙寫程式。做出來之後，再一步一步弄懂它是怎麼運作的。
            </p>
            <div className={styles.heroActions} data-reveal style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
              <Link href="#works" className={styles.btnPrimary}>
                看作品 <span aria-hidden="true">↓</span>
              </Link>
              <Link href="#play" className={styles.btnText}>
                直接玩一場
              </Link>
            </div>
          </div>

          <div className={styles.heroArt} aria-hidden="true">
            <figure className={`${styles.shot} ${styles.shotA}`}>
              <Image src={zombie.cover.src} alt="" placeholder="blur" priority sizes="(max-width: 900px) 80vw, 520px" />
              <figcaption>
                <span>01</span>
                {zombie.title}
              </figcaption>
            </figure>
            <figure className={`${styles.shot} ${styles.shotB}`}>
              <Image src={slime.cover.src} alt="" placeholder="blur" sizes="(max-width: 900px) 60vw, 360px" />
              <figcaption>
                <span>02</span>
                {slime.title}
              </figcaption>
            </figure>
            <figure className={`${styles.shot} ${styles.shotC}`}>
              <Image src={arena.cover.src} alt="" placeholder="blur" sizes="(max-width: 900px) 50vw, 280px" />
              <figcaption>
                <span>03</span>
                {arena.title}
              </figcaption>
            </figure>
            <span className={styles.stamp}>
              <Seal size={84} />
            </span>
          </div>
        </div>

        <div className="container">
          <dl className={styles.stats} data-reveal>
            <div>
              <dt>完成的遊戲</dt>
              <dd>
                4<small>款</small>
              </dd>
            </div>
            <div>
              <dt>其中 3D 遊戲</dt>
              <dd>
                2<small>款</small>
              </dd>
            </div>
            <div>
              <dt>這一階段</dt>
              <dd>
                5<small>週</small>
              </dd>
            </div>
            <div>
              <dt>年齡</dt>
              <dd>
                {profile.age}
                <small>歲</small>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ───────── 作品 ───────── */}
      <section id="works" className={styles.section}>
        <div className="container">
          <SectionHead
            no="01"
            label="作品"
            title="四款遊戲，兩款 2D、兩款 3D。"
            lead="每一款都能在瀏覽器裡直接玩。這些作品大多是軒赫描述想法、和 AI 一起寫出來的；點進去可以看到玩法和操作方式。"
          />
          <div className={styles.workList}>
            <WorkEntry work={zombie} />
            <WorkEntry work={slime} flip />
          </div>
          <div className={styles.workPair}>
            <WorkEntry work={arena} size="sm" />
            <WorkEntry work={stars} size="sm" />
          </div>
        </div>
      </section>

      {/* ───────── 遊戲間 ───────── */}
      <section id="play" className={styles.dark}>
        <div className="container">
          <SectionHead
            no="02"
            label="遊戲間"
            tone="dark"
            title="不用下載，現在就能玩。"
            lead="這兩款 2D 遊戲直接放在網站裡。方塊鬥技場可以和電腦對打，也可以找朋友一起用同一個鍵盤。"
          />
          <Playroom />
        </div>
      </section>

      {/* ───────── 關於我 ───────── */}
      <section id="about" className={styles.section}>
        <div className="container">
          <SectionHead no="03" label="關於我" title="喜歡玩遊戲，更喜歡想它是怎麼做出來的。" />
          <div className={styles.aboutGrid}>
            <aside className={styles.card} data-reveal>
              <div className={styles.cardTop}>
                <Seal size={56} />
                <div>
                  <p className={styles.cardName}>{profile.name}</p>
                  <p className={styles.cardRole}>見習遊戲開發者</p>
                </div>
              </div>
              <dl className={styles.cardList}>
                <div>
                  <dt>年齡</dt>
                  <dd>{profile.age} 歲</dd>
                </div>
                <div>
                  <dt>正在學</dt>
                  <dd>看懂 AI 寫的程式</dd>
                </div>
                <div>
                  <dt>喜歡</dt>
                  <dd>遊戲、運動、看書</dd>
                </div>
                <div>
                  <dt>作品</dt>
                  <dd>4 款遊戲、1 個網站</dd>
                </div>
              </dl>
            </aside>

            <div className={styles.aboutText}>
              <p className={styles.lead} data-reveal>
                大家好，我叫{profile.name}，今年 {profile.age}{" "}
                歲。玩遊戲的時候，我常常在想：這個敵人為什麼會追著我跑？這個畫面是怎麼畫出來的？
              </p>
              <p data-reveal>
                為了找到答案，我開始學寫程式。我的作品大多是和 AI
                一起做的：我負責想點子、描述需求和試玩，AI 寫出大部分的程式。做得出來不代表看得懂，所以現在我也在學怎麼讀懂這些程式，讓 AI
                幫我學，而不是幫我想。
              </p>
              <ul className={styles.interests}>
                {interests.map((it, i) => (
                  <li key={it.title} data-reveal style={{ "--reveal-delay": `${i * 0.06}s` } as React.CSSProperties}>
                    <span className={styles.interestNo}>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{it.title}</h3>
                    <p>{it.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 學習歷程 ───────── */}
      <section id="journey" className={`${styles.section} ${styles.sunken}`}>
        <div className="container">
          <SectionHead
            no="04"
            label="學習歷程"
            title="五週，五個里程碑。"
            lead="以下日期都來自 Git 的提交紀錄。每一次存檔，都是一小步；完整的目標、課程與心得整理在學習報告裡。"
          />

          <ol className={styles.timeline}>
            {journey.map((j, i) => (
              <li key={j.date} data-reveal style={{ "--reveal-delay": `${i * 0.05}s` } as React.CSSProperties}>
                <time className={styles.tlDate}>{j.date}</time>
                <span className={styles.tlDot} aria-hidden="true" />
                <div className={styles.tlBody}>
                  <h3>{j.title}</h3>
                  <p>{j.body}</p>
                </div>
                <span className={styles.tlTag}>{j.tag}</span>
              </li>
            ))}
          </ol>

          <Link href="/learning/" className={styles.report} data-reveal>
            <div className={styles.reportText}>
              <p className={styles.reportKicker}>學習報告 · {report.term}</p>
              <p className={styles.reportTitle}>完整的學習報告</p>
              <p className={styles.reportBody}>
                依照自學學習報告的五個面向整理：目標、課程、成果、心得與展望。也可以直接列印或存成 PDF。
              </p>
            </div>
            <ol className={styles.reportParts}>
              {parts.map((p) => (
                <li key={p.id}>
                  <span>{p.no}</span>
                  {p.label}
                </li>
              ))}
            </ol>
            <span className={styles.reportGo}>
              閱讀報告 <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
