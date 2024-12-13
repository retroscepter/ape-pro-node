import { type Pool } from "./pools";

type BaseMessage = {
  type: string;
};

export type UpdatesMessageItem = {
  type: "new" | "update";
  pool: Pool;
};

export type UpdatesMessage = BaseMessage & {
  type: "updates";
  data: UpdatesMessageItem[];
};

export type IncomingMessage = UpdatesMessage;

export type SubscribeRecentMessage = BaseMessage & {
  type: "subscribe:recent";
};

export type OutgoingMessage = SubscribeRecentMessage;
