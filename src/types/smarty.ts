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
  zipcode?: `${number}`;
  plus4_code?: `${number}`;
  delivery_point?: string;
  delivery_point_check_digit?: string;
};

// Example response from Smarty Address Lookup API:
// [
//   {
//     input_index: 0,
//     candidate_index: 0,
//     delivery_line_1: '1 Santa Claus Ln',
//     last_line: 'North Pole AK 99705-9901',
//     delivery_point_barcode: '997059901010',
//     components: {
//       primary_number: '1',
//       street_name: 'Santa Claus',
//       street_suffix: 'Ln',
//       city_name: 'North Pole',
//       state_abbreviation: 'AK',
//       zipcode: '99705',
//       plus4_code: '9901',
//       delivery_point: '01',
//       delivery_point_check_digit: '0',
//     },
//     metadata: {
//       record_type: 'S',
//       zip_type: 'Standard',
//       county_fips: '02090',
//       county_name: 'Fairbanks North Star',
//       carrier_route: 'C004',
//       congressional_district: 'AL',
//       rdi: 'Commercial',
//       elot_sequence: '0001',
//       elot_sort: 'A',
//       latitude: 64.75233,
//       longitude: -147.35297,
//       coordinate_license: 1,
//       precision: 'Rooftop',
//       time_zone: 'Alaska',
//       utc_offset: -9,
//       dst: true,
//     },
//     analysis: {
//       dpv_match_code: 'Y',
//       dpv_footnotes: 'AABB',
//       dpv_cmra: 'N',
//       dpv_vacant: 'N',
//       dpv_no_stat: 'Y',
//       active: 'Y',
//       footnotes: 'L#',
//     },
//   },
//   {
//     input_index: 1,
//     candidate_index: 0,
//     addressee: 'Apple Inc',
//     delivery_line_1: '1 Infinite Loop',
//     // truncated for brevity
//   },
// ];
