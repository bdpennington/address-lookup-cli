import { URL } from 'url';
import type { AddressLookupRequest } from '../types/smarty.js';
import * as dotenv from 'dotenv';
dotenv.config();

const AUTH_ID = process.env.SMARTY_AUTH_ID;
const AUTH_TOKEN = process.env.SMARTY_AUTH_TOKEN;
const API_LICENSE = process.env.SMARTY_LICENSE;
const API_HOST = process.env.SMARTY_API_HOST;

const API_URL = new URL(`https://${API_HOST}/street-address?auth-id=${AUTH_ID}&auth-token=${AUTH_TOKEN}&license=${API_LICENSE}`);

export async function validateAddress (reqData: AddressLookupRequest) {
  const resp = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(reqData),
  });

  return await resp.json();
}
