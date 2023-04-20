import { program, Command } from 'commander';

export default class AddressLookupCLI {
  private _cli: typeof program;

  constructor() {
    const _cli = new Command();
    this._cli = _cli
      .name('address-lookup')
      .version('1.0.0', '-v, --version', 'output the current version')
      .description('Address lookup tools for the Smarty Address Lookup API');
  }

  public registerCommands(commands: Command[]) {
    for (const command of commands) {
      this._cli.addCommand(command);
    }
  }

  public get program() {
    return this._cli;
  }
}
