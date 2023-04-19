# Empora Work Sample

## Setup Steps

### Requirements

Because this CLI makes use of node's native fetch API, it requires node 18 or higher.

### Installation

Install deps

```bash
# with npm
npm install

# with pnpm
pnpm install
```

### Environment Variables

Create a `.env` file at the project root and add the following:

```
SMARTY_AUTH_ID=your_auth_id
SMARTY_AUTH_TOKEN=your_auth_token
SMARTY_LICENSE=your_license
SMARTY_API_HOST=us-street.api.smartystreets.com
```

## Build

```bash
# with npm
npm run prepare

# with pnpm
pnpm run prepare
```

## Install/Run the CLI

You can install this CLI application globally on your system with from the root directory of this project.

```bash
# install globally
npm install -g

# then you can run it via
address-lookup [options] [command]
```

Or, if you don't want to install it system-wide, you can just run it with node.

```bash
node .bin/index.js [options] [command]
```

## Usage

### Main CLI interface

```
$ address-lookup --help
Usage: address-lookup [options] [command]

Address lookup tools for the Smarty Address Lookup API

Options:
  -v, --version       output the current version
  -h, --help          display help for command

Commands:
  validate [options]  A CLI for validating addresses from Smarty Address Lookup API
  help [command]      display help for command
```

### Using the Validate Command

```
$ address-lookup validate -h
Usage: address-lookup validate [options]

A CLI for validating addresses from Smarty Address Lookup API

Options:
  -i, --in-file <file>   input csv file
  -o, --out-file <file>  output file (if omitted, stdout is used)
  -h, --help             display help for command
```

### Adding Additional Commands

To register new commands:

1. Create a new file in `src/cli.mts` to define a command. See `src/cli/validate.mts` for an example.
2. Add it to the `commands` array in `src/main.mts`.
3. Build and reinstall the CLI as described in the [Setup Steps](#setup-steps) section.
