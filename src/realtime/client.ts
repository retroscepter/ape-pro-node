import EventEmitter from "eventemitter3";
import {
  type ClientOptions,
  type ErrorEvent,
  type MessageEvent,
  WebSocket,
} from "ws";

import { APE_REALTIME_WS_URL } from "./const";
import { type ApeAction } from "./types/actions";
import { type ApeEvent, type ApeUpdate } from "./types/events";
import { type ApeMessage } from "./types/messages";

export type ApeRealtimeClientOptions = {
  ws?: ClientOptions;
};

export type ApeRealtimeClientEvents = {
  disconnect: () => void;
  connect: () => void;
  error: (error: Error) => void;
  event: (message: ApeEvent) => void;
  updates: (updates: ApeUpdate[]) => void;
  actions: (actions: ApeAction[]) => void;
};

export class ApeRealtimeClient extends EventEmitter<ApeRealtimeClientEvents> {
  #options: ApeRealtimeClientOptions;
  #ws: WebSocket | null = null;

  constructor(options?: ApeRealtimeClientOptions) {
    super();
    this.#options = options ?? {};
  }

  connect() {
    if (this.#ws) {
      throw new Error("Already initialized");
    }

    this.#ws = new WebSocket(APE_REALTIME_WS_URL, this.#options.ws);
    this.#ws.addEventListener("message", this.#handleMessage);
    this.#ws.addEventListener("error", this.#handleError);
    this.#ws.addEventListener("close", this.#handleClose);
    this.#ws.addEventListener("open", this.#handleOpen);
  }

  send(message: ApeMessage) {
    if (!this.#ws) {
      throw new Error("Not connected");
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
      throw new Error("Not connected");
    }

    this.#ws.removeEventListener("message", this.#handleMessage);
    this.#ws.removeEventListener("error", this.#handleError);
    this.#ws.removeEventListener("close", this.#handleClose);
    this.#ws.removeEventListener("open", this.#handleOpen);

    this.#ws.close();
    this.#ws = null;

    this.emit("disconnect");
  }

  #handleOpen = () => {
    this.emit("connect");
  };

  #handleClose = () => {
    this.emit("disconnect");
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
