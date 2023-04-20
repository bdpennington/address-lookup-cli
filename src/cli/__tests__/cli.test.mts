import type { CommanderError } from 'commander';
import AddressLookupCLI from '../../cli/cli.mjs';
import makeValidateCommand from '../../cli/validate.mjs';
import { EXIT_CODES } from '../../constants.mjs';
import { vi, describe, it, expect } from 'vitest';
import * as fs from 'node:fs/promises';
import HttpClient from '../../http/client.mjs'

vi.mock('../../http/client.mjs', () => {
  return {
    default: {
      validateAddress: () => ([{
        input_index: 0,
        delivery_line_1: '143 E Main St',
        components: {
          city_name: 'Columbus',
          zipcode: '43215',
          plus4_code: '5370',
        },
      }]),
    },
  };
});

function cliFactory() {
  const CLIBuilder = new AddressLookupCLI();
  const CLI = CLIBuilder.program;
  const commands = [makeValidateCommand(CLI)]
  CLIBuilder.registerCommands(commands);
  return CLI;
}

HttpClient

function fail(): never { throw new Error('test shouldn\'t reach this point')}

describe('CLI Tests', () => {
  it('should instantiate the CLI', () => {
    const CLI = cliFactory();
    expect(CLI).toBeDefined();
  })

  it('prints to a file when outFile is set', async () => {
    const CLI = cliFactory();
    const inFileUrl = 'src/cli/__tests__/test_good_file_in.csv';
    const outFileUrl = 'src/cli/__tests__/test_good_file_out.txt';
    await CLI.parseAsync(['', '', 'validate', '-i', inFileUrl, '-o', outFileUrl]);
    const outFile = await fs.readFile(outFileUrl, 'utf-8');
    expect(outFile).toBe('143 e Maine Street, Columbus, 43215 -> 143 E Main St, Columbus, 43215-5370\n');
    await fs.rm(outFileUrl);
  })

  it('throws error when file input is not valid or cannot be accessed', async () => {
    const CLI = cliFactory();
    const writeMock = vi.fn();

    try {
      await CLI
      .exitOverride()
      .configureOutput({
        writeErr: writeMock,
      })
      .parseAsync(['', '', 'validate', '-i', 'not_real_file.csv']);
    } catch (err) {
      expect(writeMock).toHaveBeenCalledOnce();
      expect((err as CommanderError).exitCode).toBe(EXIT_CODES.FILE_ERROR);
      return;
    }
    // Fail if not returned
    fail();
  })

  it('throws error when no file input is provided', async () => {
    const CLI = cliFactory();
    const writeMock = vi.fn();

    try {
      await CLI
      .exitOverride()
      .configureOutput({
        writeErr: writeMock,
      })
      .parseAsync(['', '', 'validate']);
    } catch (err) {
      expect(writeMock).toHaveBeenCalledOnce();
      expect((err as CommanderError).exitCode).toBe(EXIT_CODES.INVALID_CLI_ARGS);
      return;
    }
    // Fail if not returned
    fail();
  })
});
