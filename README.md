<div align="center">
  <h1>parse-lcov</h1>
  <a href="https://npmjs.com/package/parse-lcov">
    <img alt="NPM" src="https://img.shields.io/npm/v/parse-lcov.svg">
  </a>
  <a href="https://github.com/bconnorwhite/parse-lcov">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/parse-lcov.svg">
  </a>
  <a href='https://coveralls.io/github/bconnorwhite/parse-lcov?branch=master'>
    <img alt="Coverage Status" src="https://img.shields.io/coveralls/github/bconnorwhite/parse-lcov.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/parse-lcov">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/parse-lcov?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Parse LCOV.

Full specification: http://ltp.sourceforge.net/coverage/lcov/geninfo.1.php

## Installation

```bash
yarn add parse-lcov
```

```bash
npm install parse-lcov
```

## API

### Usage

```ts
import parseLCOV from "parse-lcov";

const lcov = `
TN:
SF:source/file.ts
FN:5,functionA
FN:8,functionB
...
`;

parseLCOV(lcov);

/* Sample Output:
[{
    title: "",
    file: "source/file.ts",
    functions: {
      found: 2,
      hit: 2,
      details: [{
        line: 5,
        hit: 2,
        name: "functionA"
      }, {
        hit: 16,
        line: 8,
        name: "functionB"
      }]
    },
    branches: {
      found: 3,
      hit: 3,
      details: [{
        block: 0,
        branch: 0,
        line: 5,
        taken: 1
      }, {
        block: 1,
        branch: 0,
        line: 9,
        taken: 0
      }]
    },
    lines: {
      found: 13,
      hit: 13,
      details: [{
        hit: 1,
        line: 1
      }]
    }
  }]);
*/
```

### Types
```ts
import parseLCOV, { LCOVRecord, FunctionsDetails, BranchesDetails, LinesDetails } from "parse-lcov";

function parseLCOV(string?: string): LCOVRecord[];

type LCOVRecord = {
  title: string;
  file: string;
  functions: LCOVStats & {
    details: FunctionsDetails[];
  };
  branches: LCOVStats & {
    details: BranchesDetails[];
  };
  lines: LCOVStats & {
    details: LinesDetails[];
  };
}

type LCOVStats = {
  found: number;
  hit: number;
}

type FunctionsDetails = {
  name: string;
  line: number;
  hit?: number;
}

type BranchesDetails = {
  line: number;
  block: number;
  branch: number;
  taken: number;
};

type LinesDetails = {
  line: number;
  hit: number;
}
```

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/parse-lcov.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/parse-lcov.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)
