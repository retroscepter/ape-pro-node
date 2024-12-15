import { z } from "zod";

import { getApePoolsResponseSchema } from "./pools";

export const getApeGemsFiltersSchema = z.object({
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
export type GetApeGemsFilters = z.infer<typeof getApeGemsFiltersSchema>;

export const getApeGemsBodySchema = z.object({
  new: z.optional(getApeGemsFiltersSchema),
  aboutToGraduate: z.optional(getApeGemsFiltersSchema),
  graduated: z.optional(getApeGemsFiltersSchema),
});
export type GetApeGemsBody = z.infer<typeof getApeGemsBodySchema>;

export const getApeGemsResponseSchema = z.object({
  new: z.optional(getApePoolsResponseSchema),
  aboutToGraduate: z.optional(getApePoolsResponseSchema),
  graduated: z.optional(getApePoolsResponseSchema),
});
export type GetApeGemsResponse = z.infer<typeof getApeGemsResponseSchema>;
