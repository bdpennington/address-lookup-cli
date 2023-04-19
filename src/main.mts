#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { program } from 'commander';
import type { CLIOptions } from './types/cli.js';
import * as fs from 'node:fs/promises';
import neatCsv from 'neat-csv';
import { validateAddress } from './http/client.js';
import type { AddressData } from './types/smarty.js';

dotenv.config();

program
  .name('address-lookup')
  .version('1.0.0', '-v, --version', 'output the current version')
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
      const resp = await validateAddress(addressData);
      console.log('data', resp);
    }
    if (options.outFile) {
      await fs.writeFile(options.outFile, 'text to write');
      return;
    }
    console.info('no outfile specified, writing to stdout');
  });

const run = async () => {
  await program.parseAsync(process.argv);
  process.exit(0);
};

run();
