import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { crx } from '@crxjs/vite-plugin';
import manifest from "./manifest.config";
import zipPack from "vite-plugin-zip-pack";
import packageJson from "./package.json";
const { version } = packageJson;

export default defineConfig({
  plugins: [
    solidPlugin(),
    crx({ manifest }),
    zipPack({ outDir: "zip", outFileName: `chrome-${version}.zip` }),
    zipPack({ outDir: "zip", outFileName: `chrome.zip` })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    minify: false,
  },
});
