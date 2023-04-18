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
address-lookup <options>
```

Or, if you don't want to install it system-wide, you can just run it with node.

```bash
node .bin/index.js
```

## Usage

```
Usage: address-lookup [options]

A CLI for validating addresses from Smarty Address Lookup API

Options:
  -v, --version          output the current version
  -i, --in-file <file>   input csv file
  -o, --out-file <file>  output file
  -h, --help             display help for command
```
