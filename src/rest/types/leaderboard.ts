export type LeaderboardRanking = {
  vault: string;
  netWorth: number;
  netWorthInSol: number;
  totalPnl: number;
  pnlPctChange: number;
  volume: number;
  volumeInSol: number;
  lastUpdated: string;
};

export type LeaderboardResponse = {
  rankings: LeaderboardRanking[];
};
