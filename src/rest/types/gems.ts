import { z } from "zod";

import { getPoolsResponseSchema } from "./pools";

export const getGemsFiltersSchema = z.object({
  topHoldersPercentage: z.optional(z.number()),
  minDevLaunchedMints: z.optional(z.number()),
  maxDevLaunchedMints: z.optional(z.number()),
  numOfSocials: z.optional(z.number()),
  minLiquidity: z.optional(z.number()),
  maxLiquidity: z.optional(z.number()),
  minMcap: z.optional(z.number()),
  maxMcap: z.optional(z.number()),
  minVolume24h: z.optional(z.number()),
  maxVolume24h: z.optional(z.number()),
  minTxns24h: z.optional(z.number()),
  maxTxns24h: z.optional(z.number()),
  minBuys24h: z.optional(z.number()),
  maxBuys24h: z.optional(z.number()),
  minSells24h: z.optional(z.number()),
  maxSells24h: z.optional(z.number()),
  minTokenAge: z.optional(z.number()),
  maxTokenAge: z.optional(z.number()),
  minBondingCurve: z.optional(z.number()),
  maxBondingCurve: z.optional(z.number()),
  notPumpfunToken: z.optional(z.boolean()),
});
export type GetGemsFilters = z.infer<typeof getGemsFiltersSchema>;

export const getGemsBodySchema = z.object({
  new: z.optional(getGemsFiltersSchema),
  aboutToGraduate: z.optional(getGemsFiltersSchema),
  graduated: z.optional(getGemsFiltersSchema),
});
export type GetGemsBody = z.infer<typeof getGemsBodySchema>;

export const getGemsResponseSchema = z.object({
  new: z.optional(getPoolsResponseSchema),
  aboutToGraduate: z.optional(getPoolsResponseSchema),
  graduated: z.optional(getPoolsResponseSchema),
});
export type GetGemsResponse = z.infer<typeof getGemsResponseSchema>;
