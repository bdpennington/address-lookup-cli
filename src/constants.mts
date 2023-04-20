/**
 * Valid exit codes used by CLI application
 */
export const EXIT_CODES = {
  OK: 0,
  API_ERROR: 1,
  INVALID_CLI_ARGS: 2,
  FILE_ERROR: 3,
  CSV_PARSER_ERROR: 4,
  UNKNOWN_ERROR: 99,
} as const;
