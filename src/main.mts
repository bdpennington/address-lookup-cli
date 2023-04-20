#!/usr/bin/env node
import AddressLookupCLI from './cli/cli.mjs';
import makeValidateCommand from './cli/validate.mjs';
import { EXIT_CODES } from './constants.mjs';

const CLIBuilder = new AddressLookupCLI();
const CLI = CLIBuilder.program;

// Add any additional commands here to register them with the main CLI
const commands = [makeValidateCommand(CLI)];

CLIBuilder.registerCommands(commands);

const run = async () => {
  await CLI.parseAsync(process.argv);
  process.exit(EXIT_CODES.OK);
};

run();
