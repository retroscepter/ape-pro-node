import { afterAll, describe, expect, it } from "vitest";

import { ApeRealtimeClient } from "./client";
import { type ApeAction, apeActionSchema } from "./types/actions";
import {
  type ApeEvent,
  ApeEventSchema,
  type ApeUpdate,
  apeUpdateSchema,
} from "./types/events";

describe("RealtimeClient", () => {
  describe("connection", () => {
    const client = new ApeRealtimeClient();

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
    const client = new ApeRealtimeClient();

    let firstEvent: ApeEvent | null = null;
    const firstUpdates: ApeUpdate[] = [];
    const firstActions: ApeAction[] = [];

    client.on("event", (event) => {
      if (!firstEvent) {
        firstEvent = event;
      }
    });

    client.on("updates", (updates) => {
      if (firstUpdates.length === 0) {
        firstUpdates.push(...updates);
        client.subscribeToPools(firstUpdates.map((u) => u.pool.id));
      }
    });

    client.on("actions", (actions) => {
      if (firstActions.length === 0) {
        firstActions.push(...actions);
      }
    });

    client.on("connect", () => {
      client.subscribeToRecent();
    });

    client.connect();

    afterAll(() => {
      client.disconnect();
    });

    it("should receive a valid event", async () => {
      await expect
        .poll(() => firstEvent, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expect(() => ApeEventSchema.parse(firstEvent)).not.toThrow();
    }, 30000);

    it("should receive a valid updates event", async () => {
      await expect
        .poll(() => firstUpdates.length, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expect(() => apeUpdateSchema.array().parse(firstUpdates)).not.toThrow();
    }, 30000);

    it("should receive a valid actions event", async () => {
      await expect
        .poll(() => firstActions.length, { interval: 100, timeout: 30000 })
        .toBeTruthy();
      expect(() => apeActionSchema.array().parse(firstActions)).not.toThrow();
    }, 30000);
  });
});
