import { isEnd, parseLine } from "./line";
import { newRecord, LCOVRecord, FunctionsDetails, BranchesDetails, LinesDetails } from "./record";
import { transform } from "./transform";

export default function parseLCOV(string = "") {
  const lines = string.split("\n");
  let record = newRecord();
  return lines.reduce((retval, line) => {
    if(isEnd(line)) {
      retval.push({ ...record });
      record = newRecord();
    } else {
      const { type, data } = parseLine(line);
      transform(record, type, data);
    }
    return retval;
  }, [] as LCOVRecord[]);
}

export {
  FunctionsDetails,
  BranchesDetails,
  LinesDetails
}
