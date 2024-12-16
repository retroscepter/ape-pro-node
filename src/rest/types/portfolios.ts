import { z } from "zod";

export const apePortfolioUserSchema = z.object({
  totalPnl: z.number(),
  pnlPctChange: z.number(),
});
export type ApePortfolioUser = z.infer<typeof apePortfolioUserSchema>;

export const apePortfolioAssetSchema = z.object({
  id: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  icon: z.string().optional(),
  price: z.number().optional(),
  pool: z.string(),
});
export type ApePortfolioAsset = z.infer<typeof apePortfolioAssetSchema>;

export const apePortfolioBalanceSchema = z.object({
  value: z.number(),
  display: z.number(),
  valueSol: z.number().optional(),
});
export type ApePortfolioBalance = z.infer<typeof apePortfolioBalanceSchema>;

export const apePortfolioPnlSchema = z.object({
  unrealized: z.number().optional(),
  realized: z.number().optional(),
  total: z.number().optional(),
  pctChange: z.number().optional(),
});
export type ApePortfolioPnl = z.infer<typeof apePortfolioPnlSchema>;

export const apePortfolioPositionSchema = z.object({
  asset: apePortfolioAssetSchema,
  balance: apePortfolioBalanceSchema,
  pnl: apePortfolioPnlSchema,
  bought: apePortfolioBalanceSchema,
  sold: apePortfolioBalanceSchema,
});
export type ApePortfolioPosition = z.infer<typeof apePortfolioPositionSchema>;

export const apePortfolioSchema = z.object({
  netWorth: z.number(),
  netWorthInSol: z.number(),
  user: apePortfolioUserSchema,
  positions: z.array(apePortfolioPositionSchema),
  lastUpdated: z.string(),
});
export type ApePortfolio = z.infer<typeof apePortfolioSchema>;

export const getApePortfolioTypeSchema = z.enum(["open", "profitable"]);
export type GetApePortfolioType = z.infer<typeof getApePortfolioTypeSchema>;
