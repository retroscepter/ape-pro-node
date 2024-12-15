import { z } from "zod";

export const apeSubscribeToRecentMessageSchema = z.object({
  type: z.literal("subscribe:recent"),
});
export type ApeSubscribeToRecentMessage = z.infer<
  typeof apeSubscribeToRecentMessageSchema
>;

export const apeUnsubscribeFromRecentMessageSchema = z.object({
  type: z.literal("unsubscribe:recent"),
});
export type ApeUnsubscribeFromRecentMessage = z.infer<
  typeof apeUnsubscribeFromRecentMessageSchema
>;

export const apeSubscribeToPoolsMessageSchema = z.object({
  type: z.literal("subscribe:pool"),
  pools: z.array(z.string()),
});
export type ApeSubscribeToPoolsMessage = z.infer<
  typeof apeSubscribeToPoolsMessageSchema
>;

export const apeUnsubscribeFromPoolsMessageSchema = z.object({
  type: z.literal("unsubscribe:pool"),
  pools: z.array(z.string()),
});
export type ApeUnsubscribeFromPoolsMessage = z.infer<
  typeof apeUnsubscribeFromPoolsMessageSchema
>;

export const apeMessageSchema = z.discriminatedUnion("type", [
  apeSubscribeToRecentMessageSchema,
  apeUnsubscribeFromRecentMessageSchema,
  apeSubscribeToPoolsMessageSchema,
  apeUnsubscribeFromPoolsMessageSchema,
]);
export type ApeMessage = z.infer<typeof apeMessageSchema>;
