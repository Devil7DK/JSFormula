import { CustomFunctions } from './CustomFunctions';

export type JSFormulaOptions = {
    cache?: boolean;
    functions?: CustomFunctions;
    variableOpen?: string;
    variableEnd?: string;
};
