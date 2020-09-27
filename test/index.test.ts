import { test, expect } from "@jest/globals";
import parseLCOV from "../source";

test("empty", () => {
  expect(parseLCOV()).toEqual([]);
});

const lcov = `
TN:
SF:source/file.ts
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
`

test("simple", () => {
  expect(parseLCOV(lcov)).toEqual([{
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
});
