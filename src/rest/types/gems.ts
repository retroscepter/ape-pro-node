import { type GetPoolsResponse } from "./pools";

export type GetGemsFilters = {
  topHoldersPercentage?: number;
  minDevLaunchedMints?: number;
  maxDevLaunchedMints?: number;
  numOfSocials?: number;
  minLiquidity?: number;
  maxLiquidity?: number;
  minMcap?: number;
  maxMcap?: number;
  minVolume24h?: number;
  maxVolume24h?: number;
  minTxns24h?: number;
  maxTxns24h?: number;
  minBuys24h?: number;
  maxBuys24h?: number;
  minSells24h?: number;
  maxSells24h?: number;
  minTokenAge?: number;
  maxTokenAge?: number;
  minBondingCurve?: number;
  maxBondingCurve?: number;
  notPumpfunToken?: boolean;
};

export type GetGemsBody = {
  new?: GetGemsFilters;
  aboutToGraduate?: GetGemsFilters;
  graduated?: GetGemsFilters;
};

export type GetGemsResponse = {
  new?: GetPoolsResponse;
  aboutToGraduate?: GetPoolsResponse;
  graduated?: GetPoolsResponse;
};
