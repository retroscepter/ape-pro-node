import axios from "axios";
import qs from "qs";

import { API_URL } from "./const";
import { type GetPoolsParams, type GetPoolsResponse } from "./types/pools";

export class RestClient {
  #axios = axios.create({
    baseURL: API_URL,
  });

  async getPools(params?: GetPoolsParams) {
    const response = await this.#axios.get<GetPoolsResponse>("/v1/pools", {
      params,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "comma" }),
    });
    return response.data;
  }
}
