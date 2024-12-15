import { z } from "zod";

export const leaderboardRankingSchema = z.object({
  vault: z.string(),
  netWorth: z.number(),
  netWorthInSol: z.number(),
  totalPnl: z.number(),
  pnlPctChange: z.number(),
  volume: z.number(),
  volumeInSol: z.number(),
  lastUpdated: z.string(),
});
export type LeaderboardRanking = z.infer<typeof leaderboardRankingSchema>;

export const getLeaderboardResponseSchema = z.object({
  rankings: z.array(leaderboardRankingSchema),
});
export type GetLeaderboardResponse = z.infer<
  typeof getLeaderboardResponseSchema
>;
