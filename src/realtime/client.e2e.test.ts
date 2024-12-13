import { afterAll, describe, expect, expectTypeOf, it } from "vitest";

import { type Pool } from "~/types/pools";

import { RealtimeClient } from "./client";
import { type GraduatedAction, type SwapAction } from "./types/actions";

describe("RealtimeClient", () => {
  describe("connection", () => {
    const client = new RealtimeClient();

    let connected = false;
    let disconnected = false;

    client.on("connect", () => {
      connected = true;
    });
    client.on("disconnect", () => {
      disconnected = true;
    });

    it("should throw an error when sending a message if the client is not initialized", () => {
      expect(() => client.send({ type: "subscribe:recent" })).toThrow();
    });

    it("should connect", async () => {
      client.connect();

      await expect
        .poll(() => connected, { interval: 100, timeout: 10000 })
        .toBe(true);
    });

    it("should throw an error when trying to connect if the client is already initialized", () => {
      expect(() => client.connect()).toThrow();
    });

    it("should disconnect", async () => {
      client.disconnect();

      await expect
        .poll(() => disconnected, { interval: 100, timeout: 10000 })
        .toBe(true);
    });

    it("should throw an error when trying to disconnect if the client is not initialized", () => {
      expect(() => client.disconnect()).toThrow();
    });
  });

  describe("subscriptions", () => {
    const client = new RealtimeClient();

    let firstNewPool: Pool | null = null;
    let firstPoolUpdate: Pool | null = null;
    let firstSwap: SwapAction | null = null;
    let firstGraduatedPool: GraduatedAction | null = null;
    const updatedPoolIds: string[] = [];

    client.on("newPool", (pool) => {
      if (!firstNewPool) {
        firstNewPool = pool;
      }
    });
    client.on("poolUpdate", (pool) => {
      if (!firstPoolUpdate) {
        firstPoolUpdate = pool;
      }
      updatedPoolIds.push(pool.id);
    });
    client.on("swap", (swap) => {
      if (!firstSwap) {
        firstSwap = swap;
      }
    });
    client.on("graduated", (graduated) => {
      if (!firstGraduatedPool) {
        firstGraduatedPool = graduated;
      }
    });
    client.on("connect", () => {
      client.subscribeRecent();
    });
    client.connect();

    afterAll(() => {
      client.disconnect();
    });

    it("should receive a new pool", async () => {
      await expect
        .poll(() => firstNewPool, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expectTypeOf(firstNewPool!).toEqualTypeOf<Pool>();
    }, 30000);

    it("should receive a pool update", async () => {
      await expect
        .poll(() => firstPoolUpdate, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expectTypeOf(firstPoolUpdate!).toEqualTypeOf<Pool>();
    }, 30000);

    it("should receive a swap", async () => {
      client.subscribePools(updatedPoolIds);

      await expect
        .poll(() => firstSwap, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expectTypeOf(firstSwap!).toEqualTypeOf<SwapAction>();
    }, 30000);

    it.skip("should receive a graduated pool", async () => {
      await expect
        .poll(() => firstGraduatedPool, { interval: 100, timeout: 300000 })
        .toBeTruthy();
      expectTypeOf(firstGraduatedPool!).toEqualTypeOf<GraduatedAction>();
    }, 300000);
  });
});
