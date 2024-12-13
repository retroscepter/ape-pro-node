export type PoolBaseAsset = {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  decimals: number;
  twitter?: string;
  website?: string;
  dev: string;
  usdPrice: number;
  nativePrice: number;
  poolAmount: number;
  circSupply: number;
  totalSupply: number;
  fdv?: number;
  mcap?: number;
  launchpad?: string;
  tokenProgram: string;
  devMintCount?: number;
};

export type PoolQuoteAsset = {
  id: string;
  symbol: string;
  decimals: number;
  poolAmount: number;
};

export type PoolAudit = {
  mintAuthorityDisabled?: boolean;
  freezeAuthorityDisabled?: boolean;
  topHoldersPercentage: number;
  lpBurnedPercentage: number;
};

export type PoolStats = {
  priceChange: number;
  buyVolume: number;
  sellVolume?: number;
  numBuys: number;
  numSells?: number;
  numTraders: number;
  numBuyers: number;
  numSellers?: number;
};

export type Pool = {
  id: string;
  chain: string;
  dex: string;
  type: string;
  baseAsset: PoolBaseAsset;
  quoteAsset: PoolQuoteAsset;
  audit: PoolAudit;
  createdAt: string;
  liquidity: number;
  stats5m: PoolStats;
  stats1h: PoolStats;
  stats6h: PoolStats;
  stats24h: PoolStats;
  bondingCurve?: number;
  isUnreliable?: boolean;
  updatedAt: string;
};
