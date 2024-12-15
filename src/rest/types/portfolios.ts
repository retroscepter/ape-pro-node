import { z } from "zod";

export const portfolioUserSchema = z.object({
  totalPnl: z.number(),
  pnlPctChange: z.number(),
});
export type PortfolioUser = z.infer<typeof portfolioUserSchema>;

export const portfolioAssetSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  icon: z.string(),
  price: z.number().optional(),
  pool: z.string(),
});
export type PortfolioAsset = z.infer<typeof portfolioAssetSchema>;

export const portfolioBalanceSchema = z.object({
  value: z.number(),
  display: z.number(),
  valueSol: z.number().optional(),
});
export type PortfolioBalance = z.infer<typeof portfolioBalanceSchema>;

export const portfolioPnlSchema = z.object({
  unrealized: z.number(),
  realized: z.number(),
  total: z.number(),
  pctChange: z.number(),
});
export type PortfolioPnl = z.infer<typeof portfolioPnlSchema>;

export const portfolioPositionSchema = z.object({
  asset: portfolioAssetSchema,
  balance: portfolioBalanceSchema,
  pnl: portfolioPnlSchema,
  bought: portfolioBalanceSchema,
  sold: portfolioBalanceSchema,
});
export type PortfolioPosition = z.infer<typeof portfolioPositionSchema>;

export const portfolioSchema = z.object({
  netWorth: z.number(),
  netWorthInSol: z.number(),
  user: portfolioUserSchema,
  positions: z.array(portfolioPositionSchema),
  lastUpdated: z.string(),
});
export type Portfolio = z.infer<typeof portfolioSchema>;

export const getPortfolioTypeSchema = z.enum(["open", "profitable"]);
export type GetPortfolioType = z.infer<typeof getPortfolioTypeSchema>;
