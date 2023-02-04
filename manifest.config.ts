import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "./package.json";
const { version } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = version.replace(/[^\d.-]+/g, "").split(/[.-]/);

export default defineManifest(async (env) => {
  return {
    name: "__MSG_appName__" + (env.mode === "development" ? " [DEV] " : ""),
    description: "__MSG_appDesc__",
    default_locale: "en",
    short_name: "netflix-csfd-ext",
    author: "bartholomej",
    icons: {
      16: "src/assets/logo-16.png",
      32: "src/assets/logo-32.png",
      128: "src/assets/logo-128.png"
    },
    version: `${major}.${minor}.${patch}.${label}`,
    version_name: version,
    host_permissions: ["https://www.csfd.cz/"],
    content_scripts: [
      {
        run_at: "document_end",
        matches: ["https://www.netflix.com/*"],
        js: ["src/content.tsx"]
      }
    ],
    background: {
      service_worker: "src/background.ts",
      type: "module"
    },
    manifest_version: 3,
    permissions: ["tabs"]
  };
});