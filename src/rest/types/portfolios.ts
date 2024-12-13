export type PortfolioUser = {
  totalPnl: number;
  pnlPctChange: number;
};

export type PortfolioAsset = {
  id: string;
  symbol: string;
  decimals: number;
  icon: string;
  price: number;
  pool: string;
};

export type PortfolioBalance = {
  value: number;
  display: number;
  valueSol?: number;
};

export type PortfolioPnl = {
  unrealized: number;
  realized: number;
  total: number;
  pctChange: number;
};

export type PortfolioPosition = {
  asset: PortfolioAsset;
  balance: PortfolioBalance;
  pnl: PortfolioPnl;
  bought: PortfolioBalance;
  sold: PortfolioBalance;
};

export type Portfolio = {
  netWorth: number;
  netWorthInSol: number;
  user: PortfolioUser;
  positions: PortfolioPosition[];
  lastUpdated: string;
};

export type GetPortfolioType = "open" | "profitable";
