import { afterAll, describe, expect, expectTypeOf, it } from "vitest";

import { RealtimeClient } from "./client";
import { type IncomingMessage } from "./types/messages";
import { type Pool } from "./types/pools";

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

  describe("receiving messages", () => {
    const client = new RealtimeClient();

    let received = false;
    let receivedNewPool = false;
    let receivedPoolUpdate = false;

    client.on("message", () => {
      received = true;
    });
    client.on("newPool", () => {
      receivedNewPool = true;
    });
    client.on("poolUpdate", () => {
      receivedPoolUpdate = true;
    });
    client.connect();

    afterAll(() => {
      client.disconnect();
    });

    it("should receive any message", async () => {
      await expect
        .poll(() => received, { interval: 100, timeout: 10000 })
        .toBe(true);
    }, 10000);

    it("should receive a new pool", async () => {
      await expect
        .poll(() => receivedNewPool, { interval: 100, timeout: 10000 })
        .toBe(true);
    }, 10000);

    it("should receive a pool update", async () => {
      await expect
        .poll(() => receivedPoolUpdate, { interval: 100, timeout: 10000 })
        .toBe(true);
    }, 10000);
  });

  describe("message types", () => {
    const client = new RealtimeClient();

    let firstMessage: IncomingMessage | null = null;
    let firstNewPool: Pool | null = null;
    let firstPoolUpdate: Pool | null = null;

    client.on("message", (message) => {
      if (!firstMessage) {
        firstMessage = message;
      }
    });
    client.on("newPool", (pool) => {
      if (!firstNewPool) {
        firstNewPool = pool;
      }
    });
    client.on("poolUpdate", (pool) => {
      if (!firstPoolUpdate) {
        firstPoolUpdate = pool;
      }
    });
    client.connect();

    afterAll(() => {
      client.disconnect();
    });

    it("the first message should match the correct type", async () => {
      await expect
        .poll(() => firstMessage, { interval: 100, timeout: 10000 })
        .toBeTruthy();
      expectTypeOf(firstMessage!).toEqualTypeOf<IncomingMessage>();
    }, 10000);

    it("the first new pool should match the correct type", async () => {
      await expect
        .poll(() => firstNewPool, { interval: 100, timeout: 10000 })
        .toBeTruthy();
      expectTypeOf(firstNewPool!).toEqualTypeOf<Pool>();
    }, 10000);

    it("the first pool update should match the correct type", async () => {
      await expect
        .poll(() => firstPoolUpdate, { interval: 100, timeout: 10000 })
        .toBeTruthy();
      expectTypeOf(firstPoolUpdate!).toEqualTypeOf<Pool>();
    }, 10000);
  });
});
