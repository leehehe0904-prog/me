import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";
import { profile } from "@/content/profile";
import "./globals.css";

// 中文字型檔很大，Google 會切成很多小檔，用到哪個字才下載哪個，所以不預先載入
const sans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const serif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const mono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  // 分享預覽圖需要完整網址；部署時由 GitHub Actions 帶入網站的網域
  metadataBase: new URL(process.env.PAGES_ORIGIN || "http://localhost:3000"),
  title: {
    default: `${profile.name}｜作品集`,
    template: `%s｜${profile.name}`,
  },
  description: profile.description,
  openGraph: {
    title: `${profile.name}｜作品集`,
    description: profile.description,
    type: "website",
    locale: "zh_TW",
  },
};

export const viewport: Viewport = {
  themeColor: "#f2eee5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          跳到主要內容
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
