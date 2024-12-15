import { z } from "zod";

export const apeLeaderboardRankingSchema = z.object({
  vault: z.string(),
  netWorth: z.number(),
  netWorthInSol: z.number(),
  totalPnl: z.number(),
  pnlPctChange: z.number(),
  volume: z.number(),
  volumeInSol: z.number(),
  lastUpdated: z.string(),
});
export type ApeLeaderboardRanking = z.infer<typeof apeLeaderboardRankingSchema>;

export const getApeLeaderboardResponseSchema = z.object({
  rankings: z.array(apeLeaderboardRankingSchema),
});
export type GetApeLeaderboardResponse = z.infer<
  typeof getApeLeaderboardResponseSchema
>;
