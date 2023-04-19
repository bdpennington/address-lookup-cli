import { Command } from 'commander';
import type { CLIOptions } from '../types/cli.js';
import * as fs from 'node:fs/promises';
import neatCsv, { type Row } from 'neat-csv';
import HttpClient from '../http/client.mjs'
import { EXIT_CODES } from '../constants.mjs';
import type { AddressData, AddressLookupResponse } from '../types/smarty.js';
import { ObjValues } from '../types/helpers.js';

export default (program: Command) => {
  return program
    .createCommand('validate')
    .description('A CLI for validating addresses from Smarty Address Lookup API')
    .option('-i, --in-file <file>', 'input csv file')
    .option('-o, --out-file <file>', 'output file (if omitted, stdout is used)')
    .action(async (options: CLIOptions) => {
      if (!options.inFile) {
        program.error('No input-file specified.', { exitCode: EXIT_CODES.INVALID_CLI_ARGS });
      }
      let result: string, fileData: string, parsedCsvData: Row[];

      try {
        fileData = await fs.readFile(options.inFile, 'utf-8');
      } catch (err) {
        handleErrorAndExit(program, err, EXIT_CODES.FILE_ERROR, 'Unknown error reading file');
        return;
      }

      try {
        parsedCsvData = await neatCsv(fileData);
      } catch (err) {
        handleErrorAndExit(program, err, EXIT_CODES.CSV_PARSER_ERROR, 'Unknown error parsing CSV');
        return;
      }

      const isValid = isCsvResultValid(parsedCsvData);
      if (!isValid) {
        const err = new Error('Malformed CSV. Ensure each row has a "Street", "City", and "Zip Code" column');
        handleErrorAndExit(program, err, EXIT_CODES.CSV_PARSER_ERROR)
      }

      const addressData: AddressData[] = parsedCsvData.map(row => ({
        street: row.Street ?? '',
        city: row.City ?? '',
        zipcode: row['Zip Code'] ?? '',
        candidates: 1,
      }));

      try {
        const http = HttpClient;
        const resp = await http.validateAddress(addressData);
        result = formatValidationOutput(addressData, resp);
      } catch (err) {
        handleErrorAndExit(program, err, EXIT_CODES.API_ERROR, 'Unknown error calling API');
        return;
      }

      if (options.outFile) {
        try {
          await fs.writeFile(options.outFile, result ?? 'No results found');
        } catch (err) {
          handleErrorAndExit(program, err, EXIT_CODES.FILE_ERROR, 'Unknown error writing file');
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

function isCsvResultValid(result: Row[]) {
  const requiredColumns = ['Street', 'City', 'Zip Code'];
  const missingColumns = requiredColumns.filter(column => !result.some(row => row[column] !== undefined));
  if (missingColumns.length > 0) {
    return false;
  }
  return true;
}

function handleErrorAndExit(program: Command, err: unknown, exitCode: ObjValues<typeof EXIT_CODES>, defaultMessage = 'Unknown error') {
  if (err instanceof Error) {
    program.error(err.message, { exitCode });
  }
  program.error(defaultMessage, { exitCode });
}
