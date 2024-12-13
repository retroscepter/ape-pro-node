import { type Pool } from "~/types/pools";

export type PoolSortBy =
  | "listedTime"
  | "mcap"
  | "volume5m"
  | "volume1h"
  | "volume6h"
  | "volume24h"
  | "txs5m"
  | "txs1h"
  | "txs6h"
  | "txs24h"
  | "liquidity";

export type GetPoolsParams = {
  createdAt?: Date;
  sortBy?: PoolSortBy;
  sortDir?: "asc" | "desc";
  limit?: number;
  offset?: number;
  notPumpfunToken?: true;
  assetIds?: string[];
};

export type GetPoolsResponse = {
  pools: Pool[];
  next?: number;
  total: number;
};
