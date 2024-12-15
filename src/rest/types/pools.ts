import { z } from "zod";

import { poolSchema } from "~/types/pools";

export const poolSortBySchema = z.enum([
  "listedTime",
  "mcap",
  "volume5m",
  "volume1h",
  "volume6h",
  "volume24h",
  "txs5m",
  "txs1h",
  "txs6h",
  "txs24h",
  "liquidity",
]);
export type PoolSortBy = z.infer<typeof poolSortBySchema>;

export const getPoolsParamsSchema = z.object({
  createdAt: z.date().optional(),
  sortBy: poolSortBySchema.optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  notPumpfunToken: z.literal(true).optional(),
  assetIds: z.array(z.string()).optional(),
});
export type GetPoolsParams = z.infer<typeof getPoolsParamsSchema>;

export const getPoolsResponseSchema = z.object({
  pools: z.array(poolSchema),
  next: z.number().optional(),
  total: z.number(),
});

export type GetPoolsResponse = z.infer<typeof getPoolsResponseSchema>;
