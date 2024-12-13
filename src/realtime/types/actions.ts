import { type Pool } from "~/types/pools";

type BaseAction = {
  type: string;
};

export type SwapAction = BaseAction & {
  type: "swap";
  blockId: number;
  txHash: string;
  timestamp: string;
  actionId: string;
  traderAddress: string;
  offerAsset: string;
  offerAmount: number;
  offerAssetUsdPrice: number;
  returnAsset: string;
  returnAmount: number;
  returnAssetUsdPrice: number;
  usdVolume: number;
};

export type GraduatedAction = BaseAction & {
  type: "graduated";
  pool: Pool;
};

export type Action = SwapAction | GraduatedAction;
