import EventEmitter from "eventemitter3";
import {
  type ClientOptions,
  type CloseEvent,
  type ErrorEvent,
  type MessageEvent,
  WebSocket,
} from "ws";
import { z } from "zod";

import { APE_REALTIME_WS_URL } from "./const";
import { type ApeAction } from "./types/actions";
import { type ApeEvent, type ApeUpdate } from "./types/events";
import { type ApeMessage } from "./types/messages";

export const apeRealtimeClientOptionsSchema = z.object({
  ws: z.custom<ClientOptions>().optional(),
  reconnect: z.boolean().default(true),
  reconnectInterval: z.number().default(1000),
});
export type ApeRealtimeClientOptions = z.input<
  typeof apeRealtimeClientOptionsSchema
>;
type ApeRealtimeClientParsedOptions = z.output<
  typeof apeRealtimeClientOptionsSchema
>;

export type ApeRealtimeClientEvents = {
  disconnect: (event?: CloseEvent) => void;
  connect: () => void;
  error: (error: Error) => void;
  event: (message: ApeEvent) => void;
  updates: (updates: ApeUpdate[]) => void;
  actions: (actions: ApeAction[]) => void;
};

export class ApeRealtimeClient extends EventEmitter<ApeRealtimeClientEvents> {
  #options: ApeRealtimeClientParsedOptions;
  #ws: WebSocket | null = null;

  constructor(options?: ApeRealtimeClientOptions) {
    super();
    this.#options = apeRealtimeClientOptionsSchema.parse(options ?? {});
  }

  connect() {
    if (this.#ws) {
      throw new Error("connect: websocket already intialized");
    }

    this.#ws = new WebSocket(APE_REALTIME_WS_URL, this.#options.ws);
    this.#ws.addEventListener("message", this.#handleMessage);
    this.#ws.addEventListener("error", this.#handleError);
    this.#ws.addEventListener("close", this.#handleClose);
    this.#ws.addEventListener("open", this.#handleOpen);
  }

  send(message: ApeMessage) {
    if (!this.#ws) {
      throw new Error(
        "send: websocket not initialized, please connect before trying to send a message",
      );
    }

    this.#ws.send(JSON.stringify(message));
  }

  subscribeToRecent() {
    this.send({ type: "subscribe:recent" });
  }

  unsubscribeFromRecent() {
    this.send({ type: "unsubscribe:recent" });
  }

  subscribeToPools(pools: string[]) {
    this.send({ type: "subscribe:pool", pools });
  }

  unsubscribeFromPools(pools: string[]) {
    this.send({ type: "unsubscribe:pool", pools });
  }

  disconnect() {
    if (!this.#ws) {
      throw new Error(
        "disconnect: websocket not initialized, please connect before trying to disconnect",
      );
    }

    this.#removeListeners();
    this.#ws.close();
    this.#ws = null;
    this.emit("disconnect");
  }

  #removeListeners() {
    if (!this.#ws) {
      throw new Error("disconnect: websocket not initialized");
    }

    this.#ws.removeEventListener("message", this.#handleMessage);
    this.#ws.removeEventListener("error", this.#handleError);
    this.#ws.removeEventListener("close", this.#handleClose);
    this.#ws.removeEventListener("open", this.#handleOpen);
  }

  #handleOpen = () => {
    this.emit("connect");
  };

  #handleClose = (event: CloseEvent) => {
    this.#removeListeners();
    this.#ws = null;
    this.emit("disconnect", event);

    if (this.#options.reconnect) {
      setTimeout(() => this.connect(), this.#options.reconnectInterval);
    }
  };

  #handleError = (event: ErrorEvent) => {
    this.emit("error", new Error(event.message, { cause: event }));
  };

  #handleMessage = (event: MessageEvent) => {
    if (typeof event.data !== "string") {
      this.emit("error", new Error("Invalid message format"));
      return;
    }

    let data: ApeEvent;
    try {
      data = JSON.parse(event.data) as ApeEvent;
    } catch (error) {
      this.emit("error", new Error("Invalid message format", { cause: error }));
      return;
    }

    this.emit("event", data);

    if (data.type === "updates") {
      this.emit("updates", data.data);
    }
    if (data.type === "actions") {
      this.emit("actions", data.data);
    }
  };
}
