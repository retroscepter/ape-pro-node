import { z } from "zod";

import { apePoolSchema } from "~/types/pools";

export const apeSwapActionSchema = z.object({
  type: z.literal("swap"),
  blockId: z.number(),
  txHash: z.string(),
  timestamp: z.string(),
  actionId: z.string(),
  traderAddress: z.string(),
  offerAsset: z.string(),
  offerAmount: z.number(),
  offerAssetUsdPrice: z.number(),
  returnAsset: z.string(),
  returnAmount: z.number(),
  returnAssetUsdPrice: z.number(),
  usdVolume: z.number(),
});
export type ApeSwapAction = z.infer<typeof apeSwapActionSchema>;

export const apeGraduatedActionSchema = z.object({
  type: z.literal("graduated"),
  pool: apePoolSchema,
});
export type ApeGraduatedAction = z.infer<typeof apeGraduatedActionSchema>;

export const apeActionSchema = z.discriminatedUnion("type", [
  apeSwapActionSchema,
  apeGraduatedActionSchema,
]);
export type ApeAction = z.infer<typeof apeActionSchema>;
