import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(appDir, "..");

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.9jobs.co",
          },
        ],
        destination: "https://9jobs.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
