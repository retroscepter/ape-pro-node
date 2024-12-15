import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";
import qs from "qs";

import { APE_API_URL } from "./const";
import { type GetApeGemsBody, type GetApeGemsResponse } from "./types/gems";
import { type GetApeLeaderboardResponse } from "./types/leaderboard";
import {
  type GetApePoolsParams,
  type GetApePoolsResponse,
} from "./types/pools";
import {
  type ApePortfolio,
  type GetApePortfolioType,
} from "./types/portfolios";

export type ApeRestClientOptions = {
  axios?: CreateAxiosDefaults;
};

export class ApeRestClient {
  #axios: AxiosInstance;

  constructor(options?: ApeRestClientOptions) {
    this.#axios = axios.create({
      baseURL: APE_API_URL,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "comma" }),
      ...options?.axios,
    });
  }

  async getPools(params?: GetApePoolsParams) {
    const response = await this.#axios.get<GetApePoolsResponse>("/v1/pools", {
      params,
    });
    return response.data;
  }

  async getLeaderboard() {
    const response = await this.#axios.get<GetApeLeaderboardResponse>(
      "/v1/ape/leaderboard",
    );
    return response.data;
  }

  async getPortfolio(address: string, type: GetApePortfolioType) {
    const response = await this.#axios.get<ApePortfolio>(
      `/v1/ape/${address}/portfolio`,
      { params: { type } },
    );
    return response.data;
  }

  async getGems(body?: GetApeGemsBody) {
    const response = await this.#axios.post<GetApeGemsResponse>(
      "/v1/gems",
      body,
    );
    return response.data;
  }
}
