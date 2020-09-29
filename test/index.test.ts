import { test, expect } from "@jest/globals";
import parseLCOV from "../source";

test("empty", () => {
  expect(parseLCOV()).toEqual([]);
});

const lcov = `
TN:
SF:source/file-a.ts
FN:5,functionA
FN:8,functionB
FNF:2
FNH:2
FNDA:2,functionA
FNDA:16,functionB
DA:1,1
LF:13
LH:13
BRDA:5,0,0,1
BRDA:9,1,0,-
BRF:3
BRH:3
end_of_record
TN:
SF:source/file-b.ts
FN:4,functionA
FN:7,functionB
FNF:1
FNH:1
FNDA:1,functionA
FNDA:15,functionB
DA:2,2
LF:12
LH:12
BRDA:4,1,1,1
BRDA:9,1,0,-
BRF:2
BRH:2
end_of_record
`

test("simple", () => {
  expect(parseLCOV(lcov)).toEqual([{
    title: "",
    file: "source/file-a.ts",
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
  }, {
    title: "",
    file: "source/file-b.ts",
    functions: {
      found: 1,
      hit: 1,
      details: [{
        line: 4,
        hit: 1,
        name: "functionA"
      }, {
        hit: 15,
        line: 7,
        name: "functionB"
      }]
    },
    branches: {
      found: 2,
      hit: 2,
      details: [{
        block: 1,
        branch: 1,
        line: 4,
        taken: 1
      }, {
        block: 1,
        branch: 0,
        line: 9,
        taken: 0
      }]
    },
    lines: {
      found: 12,
      hit: 12,
      details: [{
        hit: 2,
        line: 2
      }]
    }
  }]);
});
