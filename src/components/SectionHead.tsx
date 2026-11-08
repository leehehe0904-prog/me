import type { ReactNode } from "react";
import styles from "./SectionHead.module.css";

type Props = {
  no: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  aside?: ReactNode;
};

export default function SectionHead({ no, label, title, lead, tone = "light", aside }: Props) {
  return (
    <div className={styles.head} data-tone={tone} data-reveal>
      <p className={styles.label}>
        <span className={styles.no}>{no}</span>
        <span className={styles.rule} aria-hidden="true" />
        {label}
      </p>
      <div className={styles.row}>
        <h2 className={styles.title}>{title}</h2>
        {aside ? <div className={styles.aside}>{aside}</div> : null}
      </div>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </div>
  );
}
