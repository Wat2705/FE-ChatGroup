import react from "@vitejs/plugin-react";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as path from "path";
import { defineConfig } from "vite";

const _dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: path.join(_dirname, "/src") }],
  },
  plugins: [react()],
});