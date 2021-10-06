import { TokenType } from './enums';
import { Operators } from './Operators';
import { CustomFunctions, OperatorToken, Token } from './types';
import { findClosingParan, findParameters, getFirstRegex } from './Utils';

export class Builder {
    private functions: CustomFunctions = {};
    private functionRegex: RegExp | null = null;

    private variableOpen = '{'; // TODO: Add options
    private variableEnd = '}'; // TODO: Add options
    private variableRegex = new RegExp('^' + this.variableOpen + '.*?' + this.variableEnd);
    private opporatorRegex = /^\+|^-|^\/|^\*|^\^/;

    private cacheEnabled = true; // TODO: Add options
    private cache: Record<string, Token> = {};

    /**
     *	Sets the functions that can be used in the formulas
     *
     *	@method setFunctions
     *	@param {Object} newFunctions A map of function names to functions
     */
    public setFunctions(newFunctions: CustomFunctions): void {
        const functionRegexs = [];
        let regexString: string;

        this.functions = newFunctions;

        for (const prop in this.functions) {
            if (Object.prototype.hasOwnProperty.call(this.functions, prop)) {
                functionRegexs.push('^' + prop + '\\(');
            }
        }

        if (!functionRegexs) {
            this.functionRegex = null;
        } else {
            regexString = functionRegexs.join('|');
            this.functionRegex = new RegExp(regexString);
        }
    }

    /**
     *	Takes a formula and parses it into a token array
     *
     *	@param {String} input The formula
     */
    public tokenize(input: string): Token[] {
        const tokens: Token[] = [];

        let curIndex = 0,
            token,
            regexMatch,
            curRemainingString,
            firstChar,
            nextMatPosition,
            funcName,
            paramsUnparsed,
            params,
            stripFirstParam,
            opperator,
            stripedRegex,
            closingParan;

        while (curIndex < input.length) {
            curRemainingString = input.substring(curIndex).trim();
            //This part of the code check for strings
            firstChar = input.substring(curIndex, curIndex + 1);
            //Handle cases were token is going to be a string
            if (firstChar === '"' || firstChar === "'") {
                nextMatPosition = input.indexOf(firstChar, curIndex + 1);
                if (nextMatPosition == -1) {
                    throw 'Quote miss match';
                }
                tokens.push({
                    type: TokenType.LIT,
                    val: input.substring(curIndex, curIndex + nextMatPosition + 2),
                });
                curIndex += curIndex + nextMatPosition + 2;
                //Handles cases were formula is wrapped in parenthis to override precedence
            } else if (firstChar === '(') {
                nextMatPosition = findClosingParan(curRemainingString);
                token = this.buildTreeFromFormula(curRemainingString.substring(1, nextMatPosition));
                if (token) {
                    tokens.push(token);
                }
                curIndex = curIndex + nextMatPosition + 2;
                //Handles cases were token is a variable
            } else if ((regexMatch = getFirstRegex(this.variableRegex, curRemainingString))) {
                stripedRegex = regexMatch.replace(this.variableOpen, '').replace(this.variableEnd, '');
                tokens.push({
                    type: TokenType.VAR,
                    val: stripedRegex,
                });
                curIndex = curIndex + 1 + regexMatch.length;
                //Handles cases were token is a function
            } else if (this.functionRegex && (regexMatch = getFirstRegex(this.functionRegex, curRemainingString))) {
                nextMatPosition = regexMatch.indexOf('(');
                funcName = regexMatch.substring(0, nextMatPosition);
                stripFirstParam = regexMatch.substring(nextMatPosition);
                closingParan = findClosingParan(curRemainingString);
                //paramsUnparsed = findParameters(stripFirstParam.substring(1, stripFirstParam.length - 1));
                paramsUnparsed = findParameters(curRemainingString.substring(nextMatPosition + 1, closingParan + 1));
                params = [];
                for (let i = 0, max = paramsUnparsed.length; i < max; i++) {
                    const newParam = this.buildTreeFromFormula(paramsUnparsed[i]);
                    if (newParam) {
                        params.push(newParam);
                    }
                }
                tokens.push({
                    type: TokenType.FUNC,
                    func: this.functions[funcName],
                    params: params,
                });
                curIndex = curIndex + 2 + closingParan;
                //Handles cases were token is an opperator
            } else if ((regexMatch = getFirstRegex(this.opporatorRegex, curRemainingString))) {
                //Handle negation use cases
                if (regexMatch == '-') {
                    if (tokens.length == 0 || tokens[tokens.length - 1].type === TokenType.OPP) {
                        nextMatPosition = curRemainingString.indexOf(' ');
                        if (nextMatPosition === -1) {
                            nextMatPosition = curRemainingString.length;
                        }
                        try {
                            tokens.push({
                                type: TokenType.LIT,
                                val: Number(curRemainingString.substring(0, nextMatPosition)),
                            });
                            curIndex = curIndex + 1 + nextMatPosition;
                        } catch (err) {
                            throw 'Invalid use of -; If you want to negate a variable or function times it by -1';
                        }
                        continue;
                    }
                }
                opperator = Operators[regexMatch];
                tokens.push(opperator);
                curIndex = curIndex + 1 + regexMatch.length;
                //Handles cases were the token is a number litteral
            } else {
                nextMatPosition = curRemainingString.indexOf(' ');
                if (nextMatPosition === -1) {
                    token = curRemainingString;
                    nextMatPosition = token.length;
                } else {
                    token = curRemainingString.substring(0, nextMatPosition);
                }

                if (isNaN(Number(token))) {
                    throw 'This is not an acceptable token: ' + token;
                }

                tokens.push({
                    type: TokenType.LIT,
                    val: Number(token),
                });
                curIndex = curIndex + 1 + nextMatPosition;
            }
        }

        return tokens;
    }

    /**
     *	Reorders the tokens into postfix based on the precedence of the operators
     *
     *	@method infixToPostFix
     *	@param {Array} tokens An array of tokens
     *	@return {Array} The tokens reorder based on the precedence of the operators
     */
    private infixToPostFix(tokens: Token[]): Token[] {
        const stack: OperatorToken[] = [];
        const postFix: Token[] = [];

        let curToken, topOpperator, curStackLength;

        for (let i = 0, max = tokens.length; i < max; i++) {
            curToken = tokens[i];
            if (curToken.type !== TokenType.OPP) {
                postFix.push(curToken);
            } else {
                if (stack.length === 0) {
                    stack.push(curToken);
                } else {
                    topOpperator = stack[stack.length - 1];
                    while (topOpperator && topOpperator.precedence >= curToken.precedence) {
                        const token = stack.pop();
                        if (token) {
                            postFix.push(token);
                        }

                        curStackLength = stack.length;
                        if (curStackLength > 0) {
                            topOpperator = stack[stack.length - 1];
                        } else {
                            topOpperator = null;
                        }
                    }
                    stack.push(curToken);
                }
            }
        }

        while ((curToken = stack.pop())) {
            postFix.push(curToken);
        }

        return postFix;
    }

    /**
     *	Builds a tree with the tokens.
     *
     *	@method buildTree
     *	@param {Array} postFix An array of tokens
     *	@return {Object} A tree that can be evaluated by the evalTree method
     */
    public buildTree(postFix: Token[]): Token {
        postFix = postFix.slice(0); //Copy it as to not modify the original array

        let i = 0,
            max = postFix.length,
            currentToken,
            numArgs,
            params;

        while (i < max) {
            currentToken = postFix[i];
            if (currentToken.type !== TokenType.OPP) {
                i++;
            } else {
                params = [];
                numArgs = currentToken.arguments;
                while (numArgs > 0) {
                    try {
                        params.push(postFix[i - numArgs]);
                        numArgs--;
                    } catch (err) {
                        throw 'Malformed Expression';
                    }
                }
                postFix.splice(i - currentToken.arguments, currentToken.arguments + 1, {
                    type: TokenType.FUNC,
                    params: params,
                    func: currentToken.func as (...params: unknown[]) => number,
                });
                i = i - 1;
                max = postFix.length;
            }
        }

        if (postFix.length !== 1) {
            throw 'Malformed Expression';
        }

        return postFix[0];
    }

    /**
     *	A wrapper method that handles tokenizing the input, rearranging the tokens into postfix,
     *	and building the tree. It also handles caching trees based on the input if the caching feature is enabled (the default)
     *
     *	@method buildTreeFromFormula
     *	@param {String} input The formula used to build the tree
     *	@return {Object} A tree that can be evaluated by the evalTree method
     */
    public buildTreeFromFormula(input: string): Token {
        if (this.cacheEnabled) {
            if (this.cache[input]) {
                return this.cache[input];
            }
        }

        const tokens = this.tokenize(input);
        const postFix = this.infixToPostFix(tokens);

        const tree = this.buildTree(postFix);
        if (this.cacheEnabled) {
            this.cache[input] = tree;
        }

        return tree;
    }
}
