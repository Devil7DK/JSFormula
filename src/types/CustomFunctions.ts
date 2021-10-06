export type CustomFunction = (...params: any[]) => number;

export type CustomFunctions = Record<string, CustomFunction>;
