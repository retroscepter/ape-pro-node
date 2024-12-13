import axios from "axios";
import qs from "qs";

import { API_URL } from "./const";
import { type GetGemsBody, type GetGemsResponse } from "./types/gems";
import { type LeaderboardResponse } from "./types/leaderboard";
import { type GetPoolsParams, type GetPoolsResponse } from "./types/pools";
import { type GetPortfolioType, type Portfolio } from "./types/portfolios";

export class RestClient {
  #axios = axios.create({
    baseURL: API_URL,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "comma" }),
  });

  async getPools(params?: GetPoolsParams) {
    const response = await this.#axios.get<GetPoolsResponse>("/v1/pools", {
      params,
    });
    return response.data;
  }

  async getLeaderboard() {
    const response = await this.#axios.get<LeaderboardResponse>(
      "/v1/ape/leaderboard",
    );
    return response.data;
  }

  async getPortfolio(address: string, type: GetPortfolioType) {
    const response = await this.#axios.get<Portfolio>(
      `/v1/ape/${address}/portfolio`,
      { params: { type } },
    );
    return response.data;
  }

  async getGems(body?: GetGemsBody) {
    const response = await this.#axios.post<GetGemsResponse>("/v1/gems", body);
    return response.data;
  }
}
