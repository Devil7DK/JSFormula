import { TokenType } from '~/enums';

export type FunctionToken = {
    type: TokenType.FUNC;
    func: (...params: unknown[]) => number;
    params: Token[];
};

export type LiteralToken = {
    type: TokenType.LIT;
    val: number | string;
};

export type OperatorToken = {
    precedence: number;
    func: (a: number, b: number) => number;
    arguments: number;
    type: TokenType.OPP;
};

export type VariableToken = {
    type: TokenType.VAR;
    val: string;
};

export type Token = FunctionToken | LiteralToken | OperatorToken | VariableToken;
