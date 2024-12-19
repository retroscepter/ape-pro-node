import { z } from "zod";

export const apeAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().optional(),
  decimals: z.number(),
  twitter: z.optional(z.string()),
  website: z.optional(z.string()),
  dev: z.string().optional(),
  usdPrice: z.number().optional(),
  nativePrice: z.number().optional(),
  poolAmount: z.number().optional(),
  circSupply: z.number().optional(),
  totalSupply: z.number().optional(),
  fdv: z.optional(z.number()),
  mcap: z.optional(z.number()),
  launchpad: z.optional(z.string()),
  tokenProgram: z.string(),
  devMintCount: z.optional(z.number()),
});
export type ApeAsset = z.infer<typeof apeAssetSchema>;

export const apePartialAssetSchema = apeAssetSchema.pick({
  id: true,
  symbol: true,
  decimals: true,
  poolAmount: true,
});
export type ApePartialAsset = z.infer<typeof apePartialAssetSchema>;

export const apePoolAuditSchema = z.object({
  mintAuthorityDisabled: z.optional(z.boolean()),
  freezeAuthorityDisabled: z.optional(z.boolean()),
  topHoldersPercentage: z.optional(z.number()),
  lpBurnedPercentage: z.optional(z.number()),
});
export type ApePoolAudit = z.infer<typeof apePoolAuditSchema>;

export const apePoolStatsSchema = z.object({
  priceChange: z.optional(z.number()),
  buyVolume: z.optional(z.number()),
  sellVolume: z.optional(z.number()),
  numBuys: z.optional(z.number()),
  numSells: z.optional(z.number()),
  numTraders: z.optional(z.number()),
  numBuyers: z.optional(z.number()),
  numSellers: z.optional(z.number()),
});
export type ApePoolStats = z.infer<typeof apePoolStatsSchema>;

export const apePoolSchema = z.object({
  id: z.string(),
  chain: z.string(),
  dex: z.string(),
  type: z.string(),
  baseAsset: apeAssetSchema,
  quoteAsset: apePartialAssetSchema,
  audit: apePoolAuditSchema.optional(),
  createdAt: z.string(),
  liquidity: z.number().optional(),
  stats5m: z.optional(apePoolStatsSchema),
  stats1h: z.optional(apePoolStatsSchema),
  stats6h: z.optional(apePoolStatsSchema),
  stats24h: z.optional(apePoolStatsSchema),
  bondingCurve: z.optional(z.number()),
  isUnreliable: z.optional(z.boolean()),
  updatedAt: z.string(),
});
export type ApePool = z.infer<typeof apePoolSchema>;
