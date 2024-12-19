import { z } from "zod";

export const apeAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  symbol: z.string(),
  icon: z.string().optional(),
  decimals: z.number(),
  twitter: z.string().optional(),
  website: z.string().optional(),
  dev: z.string().optional(),
  usdPrice: z.number().optional(),
  nativePrice: z.number().optional(),
  poolAmount: z.number().optional(),
  circSupply: z.number().optional(),
  totalSupply: z.number().optional(),
  fdv: z.number().optional(),
  mcap: z.number().optional(),
  launchpad: z.string().optional(),
  tokenProgram: z.string(),
  devMintCount: z.number().optional(),
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
  mintAuthorityDisabled: z.boolean().optional(),
  freezeAuthorityDisabled: z.boolean().optional(),
  topHoldersPercentage: z.number().optional(),
  lpBurnedPercentage: z.number().optional(),
});
export type ApePoolAudit = z.infer<typeof apePoolAuditSchema>;

export const apePoolStatsSchema = z.object({
  priceChange: z.number().optional(),
  buyVolume: z.number().optional(),
  sellVolume: z.number().optional(),
  numBuys: z.number().optional(),
  numSells: z.number().optional(),
  numTraders: z.number().optional(),
  numBuyers: z.number().optional(),
  numSellers: z.number().optional(),
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
  stats5m: apePoolStatsSchema.optional(),
  stats1h: apePoolStatsSchema.optional(),
  stats6h: apePoolStatsSchema.optional(),
  stats24h: apePoolStatsSchema.optional(),
  bondingCurve: z.number().optional(),
  migratedTo: z.string().optional(),
  isUnreliable: z.boolean().optional(),
  updatedAt: z.string(),
});
export type ApePool = z.infer<typeof apePoolSchema>;
