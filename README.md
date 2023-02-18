# vite-plugin-ts-gql

A [Vite](https://vitejs.dev/) plugin for running [ts-gql](https://github.com/Thinkmill/ts-gql) in dev

This will automatically start the `@ts-gql/compiler` watch command so you don't have to and can just start vite.

## Usage

1. Install and set up vite and ts-gql
1. Install the plugin `npm i --save-dev vite-plugin-ts-gql` or `yarn add -D vite-plugin-ts-gql`
1. Import the plugin into your vite config `vite.config.{ts,js}` adding it the plugins.

```ts
import { vitePluginTsGql } from "vite-plugin-ts-gql";
export default defineConfig({
  // Rest of the config
  plugins: [vitePluginTsGql() /* rest of the plugins */],
});
```
