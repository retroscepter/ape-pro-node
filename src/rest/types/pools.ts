import { z } from "zod";

import { apePoolSchema } from "~/types/pools";

export const apePoolSortBySchema = z.enum([
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
export type ApePoolSortBy = z.infer<typeof apePoolSortBySchema>;

export const getApePoolsParamsSchema = z.object({
  createdAt: z.date().optional(),
  sortBy: apePoolSortBySchema.optional(),
  sortDir: z.enum(["asc", "desc"]).optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  notPumpfunToken: z.literal(true).optional(),
  assetIds: z.array(z.string()).optional(),
});
export type GetApePoolsParams = z.infer<typeof getApePoolsParamsSchema>;

export const getApePoolsResponseSchema = z.object({
  pools: z.array(apePoolSchema),
  next: z.number().optional(),
  total: z.number(),
});

export type GetApePoolsResponse = z.infer<typeof getApePoolsResponseSchema>;
