# Empora Work Sample

## Table of Contents

- [Empora Work Sample](#empora-work-sample)
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
  - [Thought Process Behind My Decisions](#thought-process-behind-my-decisions)
    - [Language](#language)
    - [Project Structure](#project-structure)
      - [Overview](#overview)
      - [Thought-Process](#thought-process)
    - [Testing Strategy](#testing-strategy)
    - [Other Notes](#other-notes)
      - [Overview](#overview-1)
      - [I Learned teh Things](#i-learned-teh-things)
      - [Final Comments](#final-comments)

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

## Thought Process Behind My Decisions

### Language

I chose TypeScript because of my familiarity with it, It's a great tool for static analysis, and as a result, it provides immediate feedback when I make mistakes.

### Project Structure

#### Overview

Project structure should feel pretty familiar

- `src/main.mts` is the script entry point
- `src/cli` contains the construction and configuration of the CLI, using [Commander](https://github.com/tj/commander.js)
- `src/http` contains stuff relevant to http calls to the Smarty API
- `src/types` contains most of the project's TypeScript types

The main driving factor for modularizing it the way I did was to make it easy to update existing commands, and add new ones.

#### Thought-Process

The most concise way I can describe how this project was developed (and how I approach problems generally) is that I first make a feature work, then I refactor one or more times to modularize it and clean it up. The best way to gain an understanding of my thought process is to look at the commit history.

Decisions about abstraction are made with the following criteria (in no particular order):

- Will it make the application easier to change/extensible
- Will it make the application cleaner and more readable
- Can I put like things together
- Am I repeating myself

I will not necessarily abstract away functionality just because I can. I've worked with projects that were written this way, and I find them unnecessarily  difficult to work with (i.e. I need six files open to understand some basic concept).

### Testing Strategy

While I have used TDD before, I choose not to develop that way because as I develop, I will constantly change the way a feature works, where it lives, etc. While I do plan ahead how I will develop something, plans change quickly when I run into unanticipated issues which necessitate a change in thinking. As mentioned above, I focus less initially on making something perfect the first time, and instead of just making it work.

That said, I am a firm proponent of testing generally when working with large projects, or with a team. There is ample evidence of its benefits, including developer experience, safety, and reliability, which of corse all lead to significant time and cost-savings for an organization.

If you look at the commit history, you will see that I only tested at the end of development. You can be sure that it is __not__ because testing is afterthought to me. Were this a larger project, I would generally write tests on a feature-by-feature basis, but because this is small, I felt it more appropriate to write user-focused integration tests following development.

See also: [Testing](#testing)

### Other Notes

#### Overview

I had a lot of fun working on this project and probably went a bit overboard developing it. I often wondered if others tasked with this work sample went so far as to build a fully installable CLI application, but the more I explored the idea, the more interested I became.

#### I Learned teh Things

I also like to use every opportunity I have to learn something. In this project, I learned:

- How to configure a npm package to install a binary
- Quite a bit about how the `Commander` library works.
- Used node's native `fetch` API (fetch isn't new, but was added natively to node 17), which for whatever reason, isn't typed for TypeScript, hence the `src/fetch.d.ts` file.

This project has given me to drive to write more utility CLIs, though I'll probably want to write them in Rust, because I enjoy the language and want to keep learning to use it more effectively (plus, you can do some cool stuff compiling to WebAssembly, especially now that more browsers have shipped native shared array buffer).

#### Final Comments

If you haven't given up reading yet, persisting through my verbosity, I hope you find my work interesting and engaging. If you decide you'd like to move forward with me, I look forward to discussing it further with you!

Thanks!
