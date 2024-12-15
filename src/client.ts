import {
  ApeRealtimeClient,
  type ApeRealtimeClientEvents,
  type ApeRealtimeClientOptions,
} from "./realtime/client";
import { ApeRestClient, type ApeRestClientOptions } from "./rest/client";

export type ApeClientOptions = ApeRealtimeClientOptions & ApeRestClientOptions;

export type ApeClientEvents = ApeRealtimeClientEvents;

export class ApeClient extends ApeRealtimeClient {
  api: ApeRestClient;

  constructor(options?: ApeClientOptions) {
    super({
      ws: options?.ws,
    });
    this.api = new ApeRestClient({
      axios: options?.axios,
    });
  }
}
