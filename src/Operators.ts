import { TokenType } from './enums';
import { OperatorToken } from './types';

export const Operators: Record<string, OperatorToken> = {
    '+': {
        precedence: 1,
        func: function (a: number, b: number) {
            return a + b;
        },
        arguments: 2,
        type: TokenType.OPP,
    },
    '-': {
        precedence: 1,
        func: function (a: number, b: number) {
            return a - b;
        },
        arguments: 2,
        type: TokenType.OPP,
    },
    '*': {
        precedence: 2,
        func: function (a: number, b: number) {
            return a * b;
        },
        arguments: 2,
        type: TokenType.OPP,
    },
    '/': {
        precedence: 2,
        func: function (a: number, b: number) {
            return a / b;
        },
        arguments: 2,
        type: TokenType.OPP,
    },
    '^': {
        precedence: 3,
        func: function (a: number, b: number) {
            return Math.pow(a, b);
        },
        arguments: 2,
        type: TokenType.OPP,
    },
};
