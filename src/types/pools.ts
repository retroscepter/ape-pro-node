import { z } from "zod";

export const poolBaseAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().optional(),
  decimals: z.number(),
  twitter: z.optional(z.string()),
  website: z.optional(z.string()),
  dev: z.string().optional(),
  usdPrice: z.number(),
  nativePrice: z.number().optional(),
  poolAmount: z.number().optional(),
  circSupply: z.number(),
  totalSupply: z.number(),
  fdv: z.optional(z.number()),
  mcap: z.optional(z.number()),
  launchpad: z.optional(z.string()),
  tokenProgram: z.string(),
  devMintCount: z.optional(z.number()),
});
export type PoolBaseAsset = z.infer<typeof poolBaseAssetSchema>;

export const poolQuoteAssetSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  poolAmount: z.number().optional(),
});
export type PoolQuoteAsset = z.infer<typeof poolQuoteAssetSchema>;

export const poolAuditSchema = z.object({
  mintAuthorityDisabled: z.optional(z.boolean()),
  freezeAuthorityDisabled: z.optional(z.boolean()),
  topHoldersPercentage: z.optional(z.number()),
  lpBurnedPercentage: z.optional(z.number()),
});
export type PoolAudit = z.infer<typeof poolAuditSchema>;

export const poolStatsSchema = z.object({
  priceChange: z.optional(z.number()),
  buyVolume: z.optional(z.number()),
  sellVolume: z.optional(z.number()),
  numBuys: z.optional(z.number()),
  numSells: z.optional(z.number()),
  numTraders: z.optional(z.number()),
  numBuyers: z.optional(z.number()),
  numSellers: z.optional(z.number()),
});
export type PoolStats = z.infer<typeof poolStatsSchema>;

export const poolSchema = z.object({
  id: z.string(),
  chain: z.string(),
  dex: z.string(),
  type: z.string(),
  baseAsset: poolBaseAssetSchema,
  quoteAsset: poolQuoteAssetSchema,
  audit: poolAuditSchema,
  createdAt: z.string(),
  liquidity: z.number().optional(),
  stats5m: z.optional(poolStatsSchema),
  stats1h: z.optional(poolStatsSchema),
  stats6h: z.optional(poolStatsSchema),
  stats24h: z.optional(poolStatsSchema),
  bondingCurve: z.optional(z.number()),
  isUnreliable: z.optional(z.boolean()),
  updatedAt: z.string(),
});
export type Pool = z.infer<typeof poolSchema>;
