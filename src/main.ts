#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { program } from 'commander';
import type { CLIOptions } from './types/cli.js';
import * as fs from 'node:fs/promises';

dotenv.config();

program
  .name('address-lookup')
  .version('1.0.0', '-v, --version', 'output the current version')
  .description('A CLI for fetching addresses from Smarty Address Lookup API')
  .option('-i, --in-file <file>', 'input csv file')
  .option('-o, --out-file <file>', 'output file (if omitted, stdout is used)')
  .action(async (options: CLIOptions) => {
    console.log('cli options', options);
    if (options.inFile) {
      const data = await fs.readFile(options.inFile, 'utf-8');
      console.log('data', data);
    }
    if (options.outFile) {
      await fs.writeFile(options.outFile, 'text to write');
      return;
    }
    console.log('no outfile specified, writing to stdout');
  });

const run = async () => {
  await program.parseAsync(process.argv);
  process.exit(0);
};

run();
