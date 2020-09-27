
export type LineType = "TN" | "SF" | "FN" | "FNDA" | "FNF" | "FNH" | "BRDA" | "BRF" | "BRH" | "DA" | "LF" | "LH";

const linesTypes = [
  "TN", "SF", "FN", "FNDA", "FNF", "FNH", "BRDA", "BRF", "BRH", "DA", "LF", "LH"
];

export function isLineType(string: string): string is LineType {
  return linesTypes.includes(string);
}

export type End = "end_of_record";

export function isEnd(string: string): string is End {
  return string === "end_of_record";
}

export type Line = {
  type?: LineType;
  data: string[];
}

export function parseLine(line: string): Line {
  const [type, data] = line.split(":");
  return {
    type: isLineType(type) ? type : undefined,
    data: (data ?? "").split(",")
  }
}
