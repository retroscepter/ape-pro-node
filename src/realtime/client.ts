import EventEmitter from "eventemitter3";
import { type ErrorEvent } from "undici-types";

import { REALTIME_WS_URL } from "./const";
import { type IncomingMessage, type OutgoingMessage } from "./types/messages";
import { type Pool } from "./types/pools";

export type RealtimeEvents = {
  disconnect: () => void;
  connect: () => void;
  error: (error: Error) => void;
  message: (message: IncomingMessage) => void;
  newPool: (pool: Pool) => void;
  poolUpdate: (pool: Pool) => void;
};

export class RealtimeClient extends EventEmitter<RealtimeEvents> {
  #ws: WebSocket | null = null;

  constructor() {
    super();
  }

  connect() {
    if (this.#ws) {
      throw new Error("Already initialized");
    }

    this.#ws = new WebSocket(REALTIME_WS_URL);
    this.#ws.addEventListener("message", this.#handleMessage);
    this.#ws.addEventListener("error", this.#handleError);
    this.#ws.addEventListener("close", this.#handleClose);
    this.#ws.addEventListener("open", this.#handleOpen);
  }

  send(message: OutgoingMessage) {
    if (!this.#ws) {
      throw new Error("Not connected");
    }

    this.#ws.send(JSON.stringify(message));
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
    this.send({ type: "subscribe:recent" });
    this.emit("connect");
  };

  #handleClose = () => {
    this.emit("disconnect");
  };

  #handleError = (event: ErrorEvent) => {
    this.emit("error", new Error(event.message));
  };

  #handleMessage = (event: MessageEvent) => {
    if (typeof event.data !== "string") {
      this.emit("error", new Error("Invalid message format"));
      return;
    }

    let data: IncomingMessage;
    try {
      data = JSON.parse(event.data) as IncomingMessage;
    } catch (error) {
      this.emit("error", new Error("Invalid message format", { cause: error }));
      return;
    }

    this.emit("message", data);

    if (
      this.listeners("newPool").length > 0 ||
      this.listeners("poolUpdate").length > 0
    ) {
      switch (data.type) {
        case "updates":
          for (const item of data.data) {
            this.emit(
              item.type === "new" ? "newPool" : "poolUpdate",
              item.pool,
            );
          }
          break;
        default:
          this.emit("error", new Error("Unknown message type"));
          break;
      }
    }
  };
}
