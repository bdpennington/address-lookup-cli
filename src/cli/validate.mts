import { Command } from 'commander';
import type { CLIOptions } from '../types/cli.js';
import * as fs from 'node:fs/promises';
import neatCsv from 'neat-csv';
import HttpClient from '../http/client.mjs'
import type { AddressData } from '../types/smarty.js';

export default (program: Command) => {
  return program
    .createCommand('validate')
    .description('A CLI for validating addresses from Smarty Address Lookup API')
    .option('-i, --in-file <file>', 'input csv file')
    .option('-o, --out-file <file>', 'output file (if omitted, stdout is used)')
    .action(async (options: CLIOptions) => {
      if (options.inFile) {
        const fileData = await fs.readFile(options.inFile, 'utf-8');
        const parsedData = await neatCsv(fileData);
        const addressData: AddressData[] = parsedData.map(row => ({
          street: row.Street ?? '',
          city: row.City ?? '',
          zipcode: row['Zip Code'] ?? '',
          candidates: 1,
        }))
        try {
          const http = HttpClient;
          const resp = await http.validateAddress(addressData);
          console.info(resp);
        } catch (err) {
          if (err instanceof Error) {
            program.error(err.message, { exitCode: 1 })
          }
          program.error('Unknown error', { exitCode: 99 });
        }
      }
      if (options.outFile) {
        await fs.writeFile(options.outFile, 'text to write');
        return;
      }
      console.info('no outfile specified, writing to stdout');
    });
};
