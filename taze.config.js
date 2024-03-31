import { defineConfig } from "taze";

export default defineConfig({
  force: true,
  recursive: true,
  exclude: [
    // exclude so we stick on version 4.21.1 until following issues are resolved
    // https://github.com/sidebase/nuxt-auth/issues/514
    // https://github.com/sidebase/nuxt-auth/issues/518
    "next-auth",
  ],
});
