# Address Lookup CLI

## Table of Contents

- [Address Lookup CLI](#address-lookup-cli)
  - [Table of Contents](#table-of-contents)
  - [Setup Steps](#setup-steps)
    - [Requirements](#requirements)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
  - [Build](#build)
  - [Install/Run the CLI](#installrun-the-cli)
  - [Usage](#usage)
    - [Main CLI interface](#main-cli-interface)
    - [Using the Validate Command](#using-the-validate-command)
    - [Adding Additional Commands to CLI](#adding-additional-commands-to-cli)
  - [Testing](#testing)
    - [Methodology](#methodology)
    - [Where Tests \& Mocks Live](#where-tests--mocks-live)
    - [Running Tests](#running-tests)
  - [Other Useful Scripts](#other-useful-scripts)

## Setup Steps

### Requirements

Because this CLI makes use of node's native fetch API, it requires node 18 or higher. An `.nvmrc` file is included -- type `nvm use` to set the correct node version.

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

You can install this CLI application globally. From the root directory of this project, run:

```bash
# install globally
npm install -g

# then you can run it via
address-lookup [options] [command]
```

Or, if you don't want to install it system-wide, you can just run the build with node.

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

### Adding Additional Commands to CLI

To register new commands:

1. Create a new file in `src/cli` to define a command. See `src/cli/validate.mts` for an example.
2. Add it to the `commands` array in `src/main.mts`.
3. Build and reinstall the CLI as described in the [Setup Steps](#setup-steps) section.

## Testing

This package uses [Vitest](https://vitest.dev/) to run tests.

It was chosen because it's extremely fast and easy to configure. It is powered by [Vite](https://vitejs.dev/), a native ESM-based dev server. As a result, this allows tests to be run without being bundled, transpiled, etc., avoiding parts of the common build toolchain that extends the times it takes for code to be served.

Vitest comes with a Jest-compatible `expect API` and `mocking API`, so those already familiar with Jest will experience little to no learning curve.

### Methodology

Tests should be conducted in a way that simulates how an end-user would interact with a component.

It is not necessary, and in fact counterproductive, to try to test line-by-line, or individual methods of a component.

### Where Tests & Mocks Live

Tests should live with the files they operate on. If not already there, create a `__tests__` directory in the same place as the file you're testing and include your tests there.

Similarly, mocks should live in a `__mocks__` directory in the same place as the services they're mocking. This is particularly important, as when you ask Vitest to mock a file, it will first look for a `__mocks__` directory in the same place as the file it's mocking.

See the example tree structure below.

```
./
|-- components
|   |-- __tests__
|   |   `-- component.test.mts
|   `-- component.mts
|-- services
|   |-- __mocks__
|   |   `-- service.mts
|   `-- service.mts
```

### Running Tests

```bash
# with npm
npm run test

# with pnpm
pnpm run test
```

## Other Useful Scripts

Code formatting is handled by [Prettier](https://prettier.io/). Linting is handled by [ESLint](https://eslint.org/).

To run:

```bash
pnpm run format

pnpm run lint
```
