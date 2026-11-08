import styles from "./Seal.module.css";

/** 印章式標誌：朱紅方塊裡一個「赫」字 */
export default function Seal({ size = 32, char = "赫" }: { size?: number; char?: string }) {
  return (
    <span className={styles.seal} style={{ width: size, height: size, fontSize: size * 0.62 }} aria-hidden="true">
      {char}
    </span>
  );
}
