/* eslint-env node */
import type { Plugin } from "vite";

import { watch } from "@ts-gql/compiler";

export function vitePluginTsGql(): Plugin {
  return {
    name: "ts-gql",
    configResolved() {
      if (process.env.NODE_ENV !== "development") {
        return;
      }
      watch(process.cwd()).catch((e) => {
        console.error(e.toString());
        process.exit(1);
      });
    },
  };
}
