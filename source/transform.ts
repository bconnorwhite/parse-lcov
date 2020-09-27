import { LineType } from "./line";
import { LCOVRecord } from "./record";

const transformers: {
  [lineType in LineType]: (record: LCOVRecord, data: string[]) => any;
} = {
  TN: (record, data) => {
    record.title = data[0];
  },
  SF: (record, data) => {
    record.file = data[0];
  },
  // Functions
  FNF: (record, data) => {
    record.functions.found = parseInt(data[0]);
  },
  FNH: (record, data) => {
    record.functions.hit = parseInt(data[0]);
  },
  FN: (record, data) => {
    const [line, name] = data;
    record.functions.details.push({
      name,
      line: parseInt(line)
    });
  },
  FNDA: (record, data) => {
    const [hit, name] = data;
    record.functions.details.some(((item) => {
      if(item.name === name && item.hit === undefined) {
        item.hit = parseInt(hit);
        return true;
      } else {
        return undefined;
      }
    }));
  },
  // Branches
  BRF: (record, data) => {
    record.branches.found = parseInt(data[0]);
  },
  BRH: (record, data) => {
    record.branches.hit = parseInt(data[0]);
  },
  BRDA: (record, data) => {
    const [line, block, branch, taken] = data;
    record.branches.details.push({
      line: parseInt(line),
      block: parseInt(block),
      branch: parseInt(branch),
      taken: taken === "-" ? 0 : parseInt(taken)
    });
  },
  // Lines
  LF: (record, data) => {
    record.lines.found = parseInt(data[0]);
  },
  LH: (record, data) => {
    record.lines.hit = parseInt(data[0]);
  },
  DA: (record, data) => {
    const [line, hit] = data;
    record.lines.details.push({
      line: parseInt(line),
      hit: parseInt(hit)
    });
  }
}

export function transform(record: LCOVRecord, lineType: LineType | undefined, data: string[]) {
  if(lineType) {
    transformers[lineType](record, data);
  }
}
