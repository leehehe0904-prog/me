import type { NextConfig } from "next";

// GitHub Pages 專案頁會放在子路徑底下（例如 /test），
// 部署流程會把子路徑放進 PAGES_BASE_PATH；本機開發時是空字串。
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
