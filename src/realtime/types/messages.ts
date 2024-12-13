import { type Action } from "./actions";
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

export type ActionsMessage = BaseMessage & {
  type: "actions";
  data: Action[];
};

export type IncomingMessage = UpdatesMessage | ActionsMessage;

export type SubscribeRecentMessage = BaseMessage & {
  type: "subscribe:recent";
};

export type UnsubscribeRecentMessage = BaseMessage & {
  type: "unsubscribe:recent";
};

export type SubscribePoolsMessage = BaseMessage & {
  type: "subscribe:pool";
  pools: string[];
};

export type UnsubscribePoolsMessage = BaseMessage & {
  type: "unsubscribe:pool";
  pools: string[];
};

export type OutgoingMessage =
  | SubscribeRecentMessage
  | UnsubscribeRecentMessage
  | SubscribePoolsMessage
  | UnsubscribePoolsMessage;
