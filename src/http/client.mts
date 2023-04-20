import { URL } from 'url';
import type { AddressLookupRequest, AddressLookupResponse } from '../types/smarty.js';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Handles HTTP requests. Additional calls for new commands can be added here.
 */
class HttpClient {
  private _baseUrl: URL;

  constructor() {
    const url = this.tryMakeApiUrl();
    if (!url) {
      throw new Error("Missing required environment variables. Ensure that all are set as defined in this package's README");
    }
    this._baseUrl = url;
  }

  private tryMakeApiUrl() {
    const AUTH_ID = process.env.SMARTY_AUTH_ID;
    const AUTH_TOKEN = process.env.SMARTY_AUTH_TOKEN;
    const API_LICENSE = process.env.SMARTY_LICENSE;
    const API_HOST = process.env.SMARTY_API_HOST;

    if (!AUTH_ID || !AUTH_TOKEN || !API_LICENSE || !API_HOST) {
      return;
    }
    const searchParams = new URLSearchParams({
      'auth-id': AUTH_ID,
      'auth-token': AUTH_TOKEN,
      license: API_LICENSE,
    });
    return new URL(`https://${API_HOST}/street-address?${searchParams.toString()}`);
  }

  /**
   * Calls Smarty Address Lookup API to validate a list of address
   * @throws {Error} if the API call fails, or if parsing the response fails
   */
  public async validateAddress(reqData: AddressLookupRequest): Promise<AddressLookupResponse> {
    let resp;
    try {
      resp = await fetch(this._baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(reqData),
      });
      if (resp.status !== 200) {
        throw resp;
      }
    } catch (err) {
      if (err instanceof Response) {
        throw new Error(`API Error: ${err.status} - ${err.statusText}`, { cause: err });
      }
      throw new Error('An unknown error occurred', { cause: err });
    }

    try {
      return (await resp.json()) as AddressLookupResponse;
    } catch (err) {
      throw new Error('Error parsing response body', { cause: err });
    }
  }
}

export default new HttpClient();
