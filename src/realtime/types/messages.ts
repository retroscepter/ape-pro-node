import { z } from "zod";

import { poolSchema } from "~/types/pools";

import { actionSchema } from "./actions";

export const updatesMessageItemSchema = z.object({
  type: z.enum(["new", "update"]),
  pool: poolSchema,
});
export type UpdatesMessageItem = z.infer<typeof updatesMessageItemSchema>;

export const updatesMessageSchema = z.object({
  type: z.literal("updates"),
  data: z.array(updatesMessageItemSchema),
});
export type UpdatesMessage = z.infer<typeof updatesMessageSchema>;

export const actionsMessageSchema = z.object({
  type: z.literal("actions"),
  data: z.array(actionSchema),
});
export type ActionsMessage = z.infer<typeof actionsMessageSchema>;

export const incomingMessageSchema = z.discriminatedUnion("type", [
  updatesMessageSchema,
  actionsMessageSchema,
]);
export type IncomingMessage = z.infer<typeof incomingMessageSchema>;

export const subscribeRecentMessageSchema = z.object({
  type: z.literal("subscribe:recent"),
});
export type SubscribeRecentMessage = z.infer<
  typeof subscribeRecentMessageSchema
>;

export const unsubscribeRecentMessageSchema = z.object({
  type: z.literal("unsubscribe:recent"),
});
export type UnsubscribeRecentMessage = z.infer<
  typeof unsubscribeRecentMessageSchema
>;

export const subscribePoolsMessageSchema = z.object({
  type: z.literal("subscribe:pool"),
  pools: z.array(z.string()),
});
export type SubscribePoolsMessage = z.infer<typeof subscribePoolsMessageSchema>;

export const unsubscribePoolsMessageSchema = z.object({
  type: z.literal("unsubscribe:pool"),
  pools: z.array(z.string()),
});
export type UnsubscribePoolsMessage = z.infer<
  typeof unsubscribePoolsMessageSchema
>;

export const outgoingMessageSchema = z.discriminatedUnion("type", [
  subscribeRecentMessageSchema,
  unsubscribeRecentMessageSchema,
  subscribePoolsMessageSchema,
  unsubscribePoolsMessageSchema,
]);
export type OutgoingMessage = z.infer<typeof outgoingMessageSchema>;
