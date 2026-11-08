import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ padding: "clamp(96px, 14vw, 180px) var(--gutter)" }}>
      <p className="eyebrow">404</p>
      <h1
        style={{
          marginTop: 16,
          fontFamily: "var(--font-serif)",
          fontWeight: 900,
          fontSize: "clamp(40px, 7vw, 80px)",
          lineHeight: 1.15,
        }}
      >
        這一關還沒做出來。
      </h1>
      <p style={{ marginTop: 20, color: "var(--ink-2)" }}>
        <Link href="/" style={{ borderBottom: "1.5px solid var(--cinnabar)" }}>
          回到首頁
        </Link>
      </p>
    </section>
  );
}
