import * as dateFns from "date-fns";
import { describe, expect, expectTypeOf, it } from "vitest";

import { RestClient } from "./client";
import { type GetPoolsResponse, type PoolSortBy } from "./types/pools";

const SOL_ASSET_ID = "So11111111111111111111111111111111111111112";
const JUP_ASSET_ID = "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN";

const SORT_BY_OPTIONS: PoolSortBy[] = [
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
];

const SORT_DIR_OPTIONS = ["asc", "desc"] as const;

const oneDayAgo = dateFns.subDays(new Date(), 1);

describe("RestClient", () => {
  describe("getPools", () => {
    const client = new RestClient();

    it("should return no pools when no params are provided", async () => {
      const response = await client.getPools();

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(0);
    });

    it("should return no pools when invalid asset IDs are provided", async () => {
      const response = await client.getPools({
        assetIds: ["invalid-asset-id"],
      });

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(0);
    });

    it("should return the correct number of pools when valid asset IDs are provided", async () => {
      const response = await client.getPools({
        assetIds: [SOL_ASSET_ID, JUP_ASSET_ID],
      });

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(2);
    });

    it("should support the createdAt parameter", async () => {
      const response = await client.getPools({
        createdAt: oneDayAgo,
      });

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(0);
    });

    for (const sortBy of SORT_BY_OPTIONS) {
      it(`should support the ${sortBy} sortBy parameter`, async () => {
        const response = await client.getPools({
          createdAt: oneDayAgo,
          sortBy,
          sortDir: "desc",
          limit: 10,
          offset: 0,
        });

        expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
        expect(response.pools.length).toBeGreaterThan(0);
      });
    }

    for (const sortDir of SORT_DIR_OPTIONS) {
      it(`should support the ${sortDir} sortDir parameter`, async () => {
        const response = await client.getPools({
          createdAt: oneDayAgo,
          sortBy: "listedTime",
          sortDir,
          limit: 10,
          offset: 0,
        });

        expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
        expect(response.pools.length).toBeGreaterThan(0);
      });
    }

    it("should support the offset parameter", async () => {
      const response = await client.getPools({
        createdAt: oneDayAgo,
        sortBy: "listedTime",
        sortDir: "asc",
        limit: 10,
        offset: 10,
      });

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(10);
    });

    it("should support the notPumpfunToken parameter", async () => {
      const response = await client.getPools({
        createdAt: oneDayAgo,
        sortBy: "listedTime",
        sortDir: "asc",
        limit: 10,
        offset: 0,
        notPumpfunToken: true,
      });

      expectTypeOf(response).toEqualTypeOf<GetPoolsResponse>();
      expect(response.pools.length).toBe(10);
    });
  });
});
