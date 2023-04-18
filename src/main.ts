#!/usr/bin/env node

import * as dotenv from 'dotenv';
import { program } from 'commander';

dotenv.config();
console.log('env', process.env);

program
  .name('address-lookup')
  .version('1.0.0', '-v, --version', 'output the current version')
  .description('A CLI for fetching addresses from Smarty Address Lookup API')
  .option('-i --in-file', 'input csv file')
  .option('-o, --out-file', 'output file');

program.parse();

const run = async () => {
  console.log('argv', process.argv);
  await program.parseAsync(process.argv);
  process.exit(0);
};

run();
