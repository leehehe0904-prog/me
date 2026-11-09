import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import PrintButton from "@/components/PrintButton";
import ReportToc from "@/components/ReportToc";
import { journey, profile, toolbox } from "@/content/profile";
import {
  assessments,
  challenges,
  courseGoals,
  domains,
  honors,
  level,
  methods,
  nextCourse,
  nextGoals,
  observers,
  ownGoals,
  parts,
  report,
  roles,
  statusLabel,
  studentWords,
  weekly,
  workDates,
  type Status,
} from "@/content/report";
import { works } from "@/content/works";
import styles from "./learning.module.css";

export const metadata: Metadata = {
  title: "學習報告",
  description: `${profile.name}${report.term}的學習報告：學習目標、課程與教學、學習成果、心得與挑戰、未來展望。`,
};

const pad = (n: number) => String(n).padStart(2, "0");
const delay = (i: number) => ({ "--reveal-delay": `${i * 0.05}s` }) as React.CSSProperties;

function PartHead({ id, title, lead }: { id: (typeof parts)[number]["id"]; title: ReactNode; lead?: ReactNode }) {
  const part = parts.find((p) => p.id === id)!;
  return (
    <header className={styles.partHead} data-reveal>
      <p className={styles.partLabel}>
        <span className={styles.partNo}>{part.no}</span>
        {part.label}
      </p>
      <h2 className={styles.partTitle}>{title}</h2>
      {lead ? <p className={styles.partLead}>{lead}</p> : null}
    </header>
  );
}

function Pill({ status }: { status: Status }) {
  return (
    <span className={styles.pill} data-status={status}>
      {statusLabel[status]}
    </span>
  );
}

function SmartLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return href.startsWith("http") ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <span aria-hidden="true">↗</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {children} <span aria-hidden="true">→</span>
    </Link>
  );
}

export default function LearningPage() {
  const ordered = [...works].sort((a, b) => workDates[a.slug].localeCompare(workDates[b.slug]));
  const online = works.filter((w) => w.play.external).length;

  return (
    <article className={styles.page}>
      {/* ───────── 封面 ───────── */}
      <header className={`container ${styles.head}`}>
        <Link href="/" className={styles.back}>
          <span aria-hidden="true">←</span> 回到首頁
        </Link>

        <div className={styles.headGrid}>
          <div>
            <p className={styles.kicker}>
              <span className={styles.accent}>學習報告</span>
              <span>{report.term}</span>
            </p>
            <h1 className={styles.title}>
              這一季的
              <br />
              學習紀錄。
            </h1>
            <p className={styles.summary}>
              依照自學學習報告的五個面向整理。這一階段的作品大多是和 AI 一起做的，所以這份紀錄也老實寫下：哪些已經懂了，哪些還在學。
            </p>
          </div>

          <div className={styles.metaBox}>
            <dl className={styles.meta}>
              <div>
                <dt>學生</dt>
                <dd>
                  {profile.name}（{profile.age} 歲）
                </dd>
              </div>
              <div>
                <dt>期間</dt>
                <dd>
                  {report.from} – {report.to}
                </dd>
              </div>
              <div>
                <dt>學習方式</dt>
                <dd>{report.mode}</dd>
              </div>
              <div>
                <dt>最後更新</dt>
                <dd>{report.updated}</dd>
              </div>
            </dl>
            <PrintButton className={styles.print} />
          </div>
        </div>
      </header>

      <div className={`container ${styles.layout}`}>
        <ReportToc parts={parts} />

        <div className={styles.body}>
          {/* ───────── 壹、學習目標 ───────── */}
          <section id="goals" className={styles.part}>
            <PartHead
              id="goals"
              title="想做到的事，和目前的進度。"
              lead="目標有兩種：一種是軒赫自己寫下的夢想，一種是這一階段課程想培養的能力。"
            />

            <h3 className={styles.subhead}>自己訂的目標</h3>
            <ol className={styles.ownGoals}>
              {ownGoals.map((g, i) => (
                <li key={g.goal} data-status={g.status} data-reveal style={delay(i)}>
                  <p className={styles.when}>{g.when}</p>
                  <p className={styles.ownGoal}>{g.goal}</p>
                  <p className={styles.ownNote}>
                    <span className={styles.mark} aria-hidden="true" />
                    {statusLabel[g.status]} · {g.note}
                  </p>
                </li>
              ))}
            </ol>
            <p className={styles.source}>原文出自他的第一個網站（2026.10.11）。</p>

            <h3 className={styles.subhead}>這一階段的課程目標</h3>
            <ol className={styles.goalList}>
              {courseGoals.map((g, i) => (
                <li key={g.goal} data-reveal style={delay(i)}>
                  <span className={styles.goalNo}>{pad(i + 1)}</span>
                  <div className={styles.goalText}>
                    <p className={styles.goal}>{g.goal}</p>
                    <p className={styles.evidence}>
                      對應：{g.href ? <SmartLink href={g.href}>{g.evidence}</SmartLink> : g.evidence}
                    </p>
                  </div>
                  <Pill status={g.status} />
                </li>
              ))}
            </ol>
          </section>

          {/* ───────── 貳、課程與教學 ───────── */}
          <section id="course" className={styles.part}>
            <PartHead
              id="course"
              title="和 AI 一起做，再回頭弄懂。"
              lead={report.mode + "。這一階段的作品，大部分程式是 AI 寫的；課堂的重點，是把做出來的東西拆開，弄懂它為什麼會動。"}
            />

            <h3 className={styles.subhead}>分工</h3>
            <ul className={styles.roles}>
              {roles.map((r, i) => (
                <li key={r.who} data-reveal style={delay(i)}>
                  <p className={styles.roleWho}>{r.who}</p>
                  <ul>
                    {r.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <h3 className={styles.subhead}>學習方式</h3>
            <ul className={styles.methods}>
              {methods.map((m, i) => (
                <li key={m.title} data-reveal style={delay(i)}>
                  <span className={styles.methodNo}>{pad(i + 1)}</span>
                  <h4>{m.title}</h4>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>

            <h3 className={styles.subhead}>課程進度</h3>
            <ol className={styles.weeks}>
              {journey.map((j, i) => (
                <li key={j.date} data-reveal style={delay(i)}>
                  <p className={styles.weekNo}>
                    第 {i + 1} 週<time>{j.date}</time>
                  </p>
                  <div className={styles.weekBody}>
                    <h4>{j.title}</h4>
                    <p>{j.body}</p>
                  </div>
                  <ul className={styles.concepts} aria-label="這週接觸到的概念">
                    {weekly[j.date]?.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <h3 className={styles.subhead}>作品裡出現的各科概念</h3>
            <p className={styles.note}>
              做遊戲會碰到很多科目的概念。這些多半是 AI 寫進程式裡的：出現在作品裡，不代表已經學會，這也是下一階段要一個一個弄懂的地方。
            </p>
            <ul className={styles.domains}>
              {domains.map((d, i) => (
                <li key={d.name} data-reveal style={delay(i % 3)}>
                  <p className={styles.domainHead}>
                    <span className={styles.domainMark} aria-hidden="true">
                      {d.mark}
                    </span>
                    {d.name}
                  </p>
                  <ul className={styles.domainItems}>
                    {d.items.map((it) => (
                      <li key={it.text}>
                        <p>{it.text}</p>
                        <span>{it.from}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>

            <h3 className={styles.subhead}>用到的工具與資源</h3>
            <ul className={styles.tools}>
              {toolbox.map((t) => (
                <li key={t.name}>
                  <span className={styles.toolName}>{t.name}</span>
                  <span className={styles.toolUse}>{t.usedIn}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ───────── 參、學習成果 ───────── */}
          <section id="results" className={styles.part}>
            <PartHead
              id="results"
              title="四款作品，和還在學的地方。"
              lead="成果是可以實際打開來玩的作品，日期來自 Git 紀錄。不過作品能玩，不等於每一行程式都懂，所以這裡也寫下目前的程度。"
            />

            <dl className={styles.figures} data-reveal>
              <div>
                <dt>作品</dt>
                <dd>
                  {works.length}
                  <small>款</small>
                </dd>
              </div>
              <div>
                <dt>公開上線</dt>
                <dd>
                  {online}
                  <small>款</small>
                </dd>
              </div>
              <div>
                <dt>個人網站</dt>
                <dd>
                  1<small>個</small>
                </dd>
              </div>
              <div>
                <dt>里程碑</dt>
                <dd>
                  {journey.length}
                  <small>個</small>
                </dd>
              </div>
            </dl>

            <h3 className={styles.subhead}>成果紀錄</h3>
            <ol className={styles.records}>
              {ordered.map((w) => (
                <li key={w.slug}>
                  <time className={styles.recDate}>{workDates[w.slug]}</time>
                  <div className={styles.recMain}>
                    <Link href={`/works/${w.slug}/`} className={styles.recTitle}>
                      {w.title}
                    </Link>
                    <span className={styles.recGenre}>{w.genre}</span>
                  </div>
                  {w.play.external ? (
                    <a href={w.play.href} target="_blank" rel="noopener noreferrer" className={styles.recPlay}>
                      {new URL(w.play.href).host} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <Link href={`/works/${w.slug}/#play-here`} className={styles.recPlay}>
                      本站直接玩 <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </li>
              ))}
            </ol>

            <h3 className={styles.subhead}>評量方式</h3>
            <ul className={styles.methods} data-variant="plain">
              {assessments.map((a, i) => (
                <li key={a.title} data-reveal style={delay(i)}>
                  <span className={styles.methodNo}>{pad(i + 1)}</span>
                  <h4>{a.title}</h4>
                  <p>{a.body}</p>
                </li>
              ))}
            </ul>

            <h3 className={styles.subhead}>目前的程度</h3>
            <div className={styles.level}>
              <div data-reveal>
                <p className={styles.levelHead} data-kind="can">
                  做得到
                </p>
                <ul>
                  {level.can.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <div data-reveal style={delay(1)}>
                <p className={styles.levelHead} data-kind="practicing">
                  還在練習
                </p>
                <ul>
                  {level.practicing.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {honors.length > 0 ? (
              <>
                <h3 className={styles.subhead}>獲獎與參賽</h3>
                <ul className={styles.tools}>
                  {honors.map((h) => (
                    <li key={h.title}>
                      <span className={styles.toolName}>{h.date}</span>
                      <span className={styles.toolUse}>
                        {h.title}
                        {h.note ? `（${h.note}）` : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </section>

          {/* ───────── 肆、心得與挑戰 ───────── */}
          <section id="reflection" className={styles.part}>
            <PartHead
              id="reflection"
              title="做得出來，不代表看得懂。"
              lead="用 AI 寫程式，很快就能做出能玩的遊戲；難的是停下來，弄懂它為什麼會動。這是很多用 AI 學程式的學生都會遇到的困境，下面是這一階段遇到的情況，和試著面對的方式。"
            />

            <h3 className={styles.subhead}>軒赫說</h3>
            <div className={styles.quotes}>
              {studentWords.map((q, i) => (
                <figure key={q.quote} className={styles.quote} data-size={i === 0 ? "lg" : "sm"} data-reveal>
                  <blockquote>
                    <p>{q.quote}</p>
                  </blockquote>
                  <figcaption>{q.source}</figcaption>
                </figure>
              ))}
            </div>

            <h3 className={styles.subhead}>用 AI 寫程式的困境</h3>
            <ol className={styles.challenges}>
              {challenges.map((c, i) => (
                <li key={c.title} data-reveal style={delay(i)}>
                  <p className={styles.chMeta}>
                    <span>{pad(i + 1)}</span>
                    {c.title}
                    {c.example ? (
                      <small>
                        例：{c.example.work} · {c.example.date}
                      </small>
                    ) : null}
                  </p>
                  <dl className={styles.chGrid}>
                    <div>
                      <dt>遇到的困境</dt>
                      <dd>{c.problem}</dd>
                    </div>
                    <div>
                      <dt>怎麼面對</dt>
                      <dd>{c.approach}</dd>
                    </div>
                    <div className={styles.chLearned}>
                      <dt>想養成的習慣</dt>
                      <dd>{c.habit}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>

            {observers.length > 0 ? (
              <>
                <h3 className={styles.subhead}>老師與家長的觀察</h3>
                <div className={styles.observers}>
                  {observers.map((o) => (
                    <figure key={o.role + o.body} className={styles.observer}>
                      <blockquote>
                        <p>{o.body}</p>
                      </blockquote>
                      <figcaption>
                        {o.role}
                        {o.name ? ` · ${o.name}` : null}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </>
            ) : null}
          </section>

          {/* ───────── 伍、未來展望 ───────── */}
          <section id="next" className={styles.part}>
            <PartHead
              id="next"
              title="下一步：看懂自己做的遊戲。"
              lead="前四週先把遊戲做出來；接下來要把它拆開，弄懂每個畫面、每個動作背後的原理。"
            />

            <div className={styles.course} data-reveal>
              <div className={styles.courseHead}>
                <p className={styles.courseKicker}>下一階段課程</p>
                <h3>{nextCourse.title}</h3>
                <p>{nextCourse.body}</p>
                <Link href="/works/zombie/" className={styles.courseLink}>
                  認識〈等天光〉 <span aria-hidden="true">→</span>
                </Link>
              </div>
              <ol className={styles.chapters}>
                {nextCourse.chapters.map((c, i) => (
                  <li key={c.title}>
                    <span className={styles.chNo}>第 {i + 1} 章</span>
                    <p className={styles.chTitle}>{c.title}</p>
                    <p className={styles.chSub}>{c.sub}</p>
                  </li>
                ))}
              </ol>
            </div>

            <h3 className={styles.subhead}>接下來的目標</h3>
            <ol className={styles.goalList}>
              {nextGoals.map((g, i) => (
                <li key={g.goal} data-reveal style={delay(i)}>
                  <span className={styles.goalNo}>{pad(i + 1)}</span>
                  <div className={styles.goalText}>
                    <p className={styles.goal}>{g.goal}</p>
                    <p className={styles.evidence}>{g.note}</p>
                  </div>
                  <Pill status={g.status} />
                </li>
              ))}
            </ol>

            <p className={styles.closing} data-reveal>
              這份報告會跟著新作品一起更新。
              <Link href="/#works">回去看作品 →</Link>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
