import { URL } from 'url';
import type { AddressLookupRequest, AddressLookupResponse } from '../types/smarty.js';
import * as dotenv from 'dotenv';
dotenv.config();

const AUTH_ID = process.env.SMARTY_AUTH_ID;
const AUTH_TOKEN = process.env.SMARTY_AUTH_TOKEN;
const API_LICENSE = process.env.SMARTY_LICENSE;
const API_HOST = process.env.SMARTY_API_HOST;

const API_URL = new URL(`https://${API_HOST}/street-address?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&license=${API_LICENSE}`);

/**
 * Calls Smarty Address Lookup API to validate a list of address
 * @throws {Error} if the API call fails, or if parsing the response fails
 */
export async function validateAddress (reqData: AddressLookupRequest): Promise<AddressLookupResponse> {
  let resp;
  try {
    resp = await fetch(API_URL, {
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
    return await resp.json() as AddressLookupResponse;
  } catch (err) {
    throw new Error('Error parsing response body', { cause: err });
  }
}
