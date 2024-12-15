import { z } from "zod";

import { apePoolSchema } from "~/types/pools";

import { apeActionSchema } from "./actions";

export const apeUpdateSchema = z.object({
  type: z.enum(["new", "update"]),
  pool: apePoolSchema,
});
export type ApeUpdate = z.infer<typeof apeUpdateSchema>;

export const apeUpdatesEventSchema = z.object({
  type: z.literal("updates"),
  data: z.array(apeUpdateSchema),
});
export type ApeUpdatesEvent = z.infer<typeof apeUpdatesEventSchema>;

export const apeActionsEventSchema = z.object({
  type: z.literal("actions"),
  data: z.array(apeActionSchema),
});
export type ApeActionsEvent = z.infer<typeof apeActionsEventSchema>;

export const apeEventSchema = z.discriminatedUnion("type", [
  apeUpdatesEventSchema,
  apeActionsEventSchema,
]);
export type ApeEvent = z.infer<typeof apeEventSchema>;
