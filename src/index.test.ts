import * as tsGql from "@ts-gql/compiler";

import { vitePluginTsGql } from "./";

describe("vitePluginTsGql", () => {
  let originalEnv: string | undefined;
  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it("should set up the basics of a plugin", async () => {
    const plugin = vitePluginTsGql();
    expect(plugin.configResolved).toBeInstanceOf(Function);
    expect(plugin.name).toEqual("ts-gql");
  });

  it("should run watch in dev mode", async () => {
    process.env.NODE_ENV = "development";
    const watchSpy = jest
      .spyOn(tsGql, "watch")
      // @ts-ignore
      .mockResolvedValue();

    const plugin = vitePluginTsGql();
    if (plugin.configResolved instanceof Function) {
      await plugin.configResolved({} as any);
      expect(watchSpy).toHaveBeenCalledWith(
        expect.stringMatching(/\/vite-plugin-ts-gql$/)
      );
      return;
    }
    expect(false).toBeTruthy();
  });

  it("should not run watch in production mode", async () => {
    process.env.NODE_ENV = "production";
    const watchSpy = jest
      .spyOn(tsGql, "watch")
      // @ts-ignore
      .mockResolvedValue();

    const plugin = vitePluginTsGql();
    if (plugin.configResolved instanceof Function) {
      await plugin.configResolved({} as any);
      expect(watchSpy).not.toHaveBeenCalled();
      return;
    }
    expect(false).toBeTruthy();
  });

  it("should report errors from watch", async () => {
    process.env.NODE_ENV = "development";
    const watchSpy = jest
      .spyOn(tsGql, "watch")
      .mockRejectedValue(new Error("oops"));
    const processExitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation((() => {}) as any);
    const consoleErroSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const plugin = vitePluginTsGql();
    if (plugin.configResolved instanceof Function) {
      await plugin.configResolved({} as any);
      expect(watchSpy).toHaveBeenCalled();
      expect(consoleErroSpy).toHaveBeenCalledWith("Error: oops");
      expect(processExitSpy).toHaveBeenCalledWith(1);
      return;
    }
  });
});
