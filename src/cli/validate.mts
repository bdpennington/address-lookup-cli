import { Command } from 'commander';
import type { CLIOptions } from '../types/cli.js';
import * as fs from 'node:fs/promises';
import neatCsv from 'neat-csv';
import HttpClient from '../http/client.mjs'
import { EXIT_CODES } from '../constants.mjs';
import type { AddressData, AddressLookupResponse } from '../types/smarty.js';

export default (program: Command) => {
  return program
    .createCommand('validate')
    .description('A CLI for validating addresses from Smarty Address Lookup API')
    .option('-i, --in-file <file>', 'input csv file')
    .option('-o, --out-file <file>', 'output file (if omitted, stdout is used)')
    .action(async (options: CLIOptions) => {
      if (!options.inFile) {
        program.error('No input-file specified.', { exitCode: EXIT_CODES.INVALID_CLI_ARGS })
      }
      let result: string, fileData: string;

      try {
        fileData = await fs.readFile(options.inFile, 'utf-8');
      } catch (err) {
        if (err instanceof Error) {
          program.error(err.message, { exitCode: EXIT_CODES.FILE_ERROR })
        }
        program.error('Unknown error reading file', { exitCode: EXIT_CODES.UNKNOWN_ERROR });
      }
      const parsedCsvData = await neatCsv(fileData);
      const addressData: AddressData[] = parsedCsvData.map(row => ({
        street: row.Street ?? '',
        city: row.City ?? '',
        zipcode: row['Zip Code'] ?? '',
        candidates: 1,
      }))
      try {
        const http = HttpClient;
        const resp = await http.validateAddress(addressData);
        result = formatValidationOutput(addressData, resp);
      } catch (err) {
        if (err instanceof Error) {
          program.error(err.message, { exitCode: EXIT_CODES.API_ERROR })
        }
        program.error('Unknown error calling API', { exitCode: EXIT_CODES.UNKNOWN_ERROR });
      }
      if (options.outFile) {
        try {
          await fs.writeFile(options.outFile, result ?? 'No results found');
        } catch (err) {
          if (err instanceof Error) {
            program.error(err.message, { exitCode: EXIT_CODES.FILE_ERROR })
          }
          program.error('Unknown error writing file', { exitCode: EXIT_CODES.UNKNOWN_ERROR });
        } finally {
          return;
        }
      }
      // Print to stdout if no output file is specified
      console.info(result);
    });
};

function formatValidationOutput(initialData: AddressData[], finalData: AddressLookupResponse) {
  return initialData.map((addressData, inputIndex) => {
    const formattedInitialAddress = `${addressData.street}, ${addressData.city}, ${addressData.zipcode}`;
    const result = finalData.find((addressData) => addressData.input_index === inputIndex);
    if (!result) {
      return `${formattedInitialAddress} -> Invalid Address\n`;
    }
    const formattedFinalAddress = `${result.delivery_line_1}, ${result.components.city_name}, ${result.components.zipcode ?? ''}-${result.components.plus4_code ?? ''}`;
    return `${formattedInitialAddress} -> ${formattedFinalAddress}\n`;
  }).join('');
}
