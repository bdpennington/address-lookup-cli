import { program, Command } from 'commander';

/**
 * Main entrypoint for configuring and exposing CLI
 *
 * {@link https://github.com/tj/commander.js Commander docs}
 */
export default class AddressLookupCLI {
  private _cli: typeof program;

  constructor() {
    const _cli = new Command();
    this._cli = _cli.name('address-lookup').version('1.0.0', '-v, --version', 'output the current version').description('Address lookup tools for the Smarty Address Lookup API');
  }

  /**
   * Registers additional commands with main CLI
   * @param commands Commands to be added to CLI
   */
  public registerCommands(commands: Command[]) {
    for (const command of commands) {
      this._cli.addCommand(command);
    }
  }

  public get program() {
    return this._cli;
  }
}
