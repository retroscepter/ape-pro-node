import { z } from "zod";

import { poolSchema } from "~/types/pools";

export const swapActionSchema = z.object({
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
export type SwapAction = z.infer<typeof swapActionSchema>;

export const graduatedActionSchema = z.object({
  type: z.literal("graduated"),
  pool: poolSchema,
});
export type GraduatedAction = z.infer<typeof graduatedActionSchema>;

export const actionSchema = z.discriminatedUnion("type", [
  swapActionSchema,
  graduatedActionSchema,
]);
export type Action = z.infer<typeof actionSchema>;
