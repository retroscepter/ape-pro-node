import * as dateFns from "date-fns";
import { describe, expect, it } from "vitest";

import { RestClient } from "./client";
import { type GetGemsFilters, getGemsResponseSchema } from "./types/gems";
import { getLeaderboardResponseSchema } from "./types/leaderboard";
import { getPoolsResponseSchema, type PoolSortBy } from "./types/pools";
import { portfolioSchema } from "./types/portfolios";

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

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
      expect(response.pools.length).toBe(0);
    });

    it("should return no pools when invalid asset IDs are provided", async () => {
      const response = await client.getPools({
        assetIds: ["invalid-asset-id"],
      });

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
      expect(response.pools.length).toBe(0);
    });

    it("should return the correct number of pools when valid asset IDs are provided", async () => {
      const response = await client.getPools({
        assetIds: [SOL_ASSET_ID, JUP_ASSET_ID],
      });

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
      expect(response.pools.length).toBe(2);
    });

    it("should support the createdAt parameter", async () => {
      const response = await client.getPools({
        createdAt: oneDayAgo,
      });

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
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

        expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
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

        expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
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

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
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

      expect(() => getPoolsResponseSchema.parse(response)).not.toThrow();
      expect(response.pools.length).toBe(10);
    });
  });

  let portfolioAddress: string | null = null;

  describe("getLeaderboard", () => {
    it("should return the leaderboard", async () => {
      const response = await client.getLeaderboard();

      expect(() => getLeaderboardResponseSchema.parse(response)).not.toThrow();
      expect(response.rankings.length).toBeGreaterThan(0);

      portfolioAddress = response.rankings[0].vault;
    });
  });

  describe("getPortfolio", () => {
    it("should return the open portfolio", async () => {
      const response = await client.getPortfolio(portfolioAddress!, "open");

      expect(() => portfolioSchema.parse(response)).not.toThrow();
    });

    it("should return the profitable portfolio", async () => {
      const response = await client.getPortfolio(
        portfolioAddress!,
        "profitable",
      );

      expect(() => portfolioSchema.parse(response)).not.toThrow();
    });
  });

  describe("getGems", () => {
    const GEM_FILTERS: GetGemsFilters = {
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

      expect(() => getGemsResponseSchema.parse(response)).not.toThrow();
      expect(response.new).toBeUndefined();
      expect(response.aboutToGraduate).toBeUndefined();
      expect(response.graduated).toBeUndefined();
    });

    it("should support all new filters", async () => {
      const response = await client.getGems({
        new: GEM_FILTERS,
      });

      expect(() => getGemsResponseSchema.parse(response)).not.toThrow();
      expect(response.new).toBeDefined();
    });

    it("should support all aboutToGraduate filters", async () => {
      const response = await client.getGems({
        aboutToGraduate: GEM_FILTERS,
      });

      expect(() => getGemsResponseSchema.parse(response)).not.toThrow();
      expect(response.aboutToGraduate).toBeDefined();
    });

    it("should support all graduated filters", async () => {
      const response = await client.getGems({
        graduated: GEM_FILTERS,
      });

      expect(() => getGemsResponseSchema.parse(response)).not.toThrow();
      expect(response.graduated).toBeDefined();
    });
  });
});
