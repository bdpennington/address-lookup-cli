/**
 * Smarty Address Lookup API Request
 *
 * {@link https://www.smarty.com/docs/cloud/us-street-api API Docs}
 */
export type AddressLookupRequest = AddressData[];

/**
 * Smarty Address Lookup API Request Address Object
 *
 * {@link https://www.smarty.com/docs/cloud/us-street-api API Docs}
 */
export type AddressData = {
  street: string;
  city: string;
  zipcode: string;
  candidates: 1;
};

/**
 * Smarty Address Lookup API Response
 *
 * {@link https://www.smarty.com/docs/cloud/us-street-api API Docs}
 */
export type AddressLookupResponse = AddressCandidate[];

/**
 * Smarty Address Lookup API Candidate
 *
 * {@link https://www.smarty.com/docs/cloud/us-street-api API Docs}
 */
export type AddressCandidate = {
  input_index: number;
  candidate_index: number;
  delivery_line_1: string;
  last_line: string;
  delivery_point_barcode: string;
  components: AddressComponent;
};

/**
 * Smarty Address Lookup API Address Component
 *
 * {@link https://www.smarty.com/docs/cloud/us-street-api API Docs}
 */
export type AddressComponent = {
  primary_number?: string;
  street_name?: string;
  street_suffix?: string;
  city_name?: string;
  state_abbreviation?: string;
  zipcode?: string;
  plus4_code?: string;
  delivery_point?: string;
  delivery_point_check_digit?: string;
};
