import * as dateFns from "date-fns";
import { describe, expect, expectTypeOf, it } from "vitest";

import { RestClient } from "./client";
import { type GetGemsFilters, type GetGemsResponse } from "./types/gems";
import { type LeaderboardResponse } from "./types/leaderboard";
import { type GetPoolsResponse, type PoolSortBy } from "./types/pools";
import { type Portfolio } from "./types/portfolios";

const SOL_ASSET_ID = "So11111111111111111111111111111111111111112";
const JUP_ASSET_ID = "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN";

const oneDayAgo = dateFns.subDays(new Date(), 1);

describe("RestClient", () => {
  const client = new RestClient();

  describe("getPools", () => {
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

  let portfolioAddress: string | null = null;

  describe("getLeaderboard", () => {
    it("should return the leaderboard", async () => {
      const response = await client.getLeaderboard();

      expectTypeOf(response).toEqualTypeOf<LeaderboardResponse>();
      expect(response.rankings.length).toBeGreaterThan(0);

      portfolioAddress = response.rankings[0].vault;
    });
  });

  describe("getPortfolio", () => {
    it("should return the open portfolio", async () => {
      const response = await client.getPortfolio(portfolioAddress!, "open");

      expectTypeOf(response).toEqualTypeOf<Portfolio>();
    });

    it("should return the profitable portfolio", async () => {
      const response = await client.getPortfolio(
        portfolioAddress!,
        "profitable",
      );

      expectTypeOf(response).toEqualTypeOf<Portfolio>();
    });
  });

  describe("getGems", () => {
    const GEM_FILTERS: Record<
      keyof Required<GetGemsFilters>,
      GetGemsFilters[keyof GetGemsFilters]
    > = {
      topHoldersPercentage: 10,
      minDevLaunchedMints: 10,
      maxDevLaunchedMints: 10,
      numOfSocials: 10,
      minLiquidity: 10,
      maxLiquidity: 10,
      minMcap: 10,
      maxMcap: 10,
      minVolume24h: 10,
      maxVolume24h: 10,
      minTxns24h: 10,
      maxTxns24h: 10,
      minBuys24h: 10,
      maxBuys24h: 10,
      minSells24h: 10,
      maxSells24h: 10,
      minTokenAge: 10,
      maxTokenAge: 10,
      minBondingCurve: 10,
      maxBondingCurve: 10,
      notPumpfunToken: true,
    };

    it("should return no lists when no params are provided", async () => {
      const response = await client.getGems();

      expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
      expect(response.new).toBeUndefined();
      expect(response.aboutToGraduate).toBeUndefined();
      expect(response.graduated).toBeUndefined();
    });

    it("should support new filters", async () => {
      const response = await client.getGems({
        new: {},
      });

      expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
      expect(response.new?.pools.length).toBeGreaterThan(0);
    });

    for (const [key, value] of Object.entries(GEM_FILTERS)) {
      it(`should support the ${key} new filter`, async () => {
        const response = await client.getGems({
          new: { [key]: value },
        });

        expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
        expect(response.new).toBeDefined();
      });
    }

    it("should support aboutToGraduate filters", async () => {
      const response = await client.getGems({
        aboutToGraduate: {},
      });

      expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
      expect(response.aboutToGraduate?.pools.length).toBeGreaterThan(0);
    });

    for (const [key, value] of Object.entries(GEM_FILTERS)) {
      it(`should support the ${key} aboutToGraduate filter`, async () => {
        const response = await client.getGems({
          aboutToGraduate: { [key]: value },
        });

        expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
        expect(response.aboutToGraduate).toBeDefined();
      });
    }

    it("should support graduated filters", async () => {
      const response = await client.getGems({
        graduated: {},
      });

      expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
      expect(response.graduated?.pools.length).toBeGreaterThan(0);
    });

    for (const [key, value] of Object.entries(GEM_FILTERS)) {
      it(`should support the ${key} graduated filter`, async () => {
        const response = await client.getGems({
          graduated: { [key]: value },
        });

        expectTypeOf(response).toEqualTypeOf<GetGemsResponse>();
        expect(response.graduated).toBeDefined();
      });
    }
  });
});
