
type LCOVStats = {
  found: number;
  hit: number;
}

export type FunctionsDetails = {
  name: string;
  line: number;
  hit?: number;
}

export type BranchesDetails = {
  line: number;
  block: number;
  branch: number;
  taken: number;
};

export type LinesDetails = {
  line: number;
  hit: number;
}

export type LCOVRecord = {
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

export function newRecord(): LCOVRecord {
  return {
    title: "",
    file: "",
    functions: {
      found: 0,
      hit: 0,
      details: []
    },
    branches: {
      found: 0,
      hit: 0,
      details: []
    },
    lines: {
      found: 0,
      hit: 0,
      details: []
    }
  }
}
