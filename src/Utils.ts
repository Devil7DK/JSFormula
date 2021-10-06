/**
 *	Returns the first Regex match or null if none is found
 *
 *	@method getFirstRegex
 *	@param {RegExp} regex Regular expression to compare against the string
 *	@param {String} string The string to find a match in
 *	@return {String} The first regex match or null if none is found
 */
export function getFirstRegex(regex: RegExp, string: string): string | null {
    if (regex) {
        const results = regex.exec(string);
        if (results) {
            return results[0];
        }
    }

    return null;
}

/**
 *	Returns an array of formulas inside a comma delimited parentheses
 *
 *	@method findParameters
 *	@param {String} input Contents inside of parentheses including wrapping parentheses
 *	@return {Array} Array of formulas
 */
export function findParameters(input: string): string[] {
    const params = [];

    let curPos = 0,
        unclosedParams = 0,
        curChar,
        len = input.length;

    while (curPos < len) {
        curChar = input[curPos];
        if (curChar === '(') {
            unclosedParams++;
            curPos++;
        } else if (curChar === ')') {
            unclosedParams--;
            if (unclosedParams == -1) {
                input = input.substring(0, curPos);
                break;
            }
            curPos++;
        } else if (curChar === ',' && unclosedParams == 0) {
            params.push(input.substring(0, curPos));
            input = input.substring(curPos + 1);
            len = input.length;
            curPos = 0;
        } else {
            curPos++;
        }
    }
    params.push(input);

    return params;
}

/**
 *	Returns the index of the closing parentheses in a string
 *
 *	@method findClosingParan
 *	@param {String} input Contents inside of parentheses including wrapping parentheses
 *	@return {Integer} Index of the closing parenthesis
 */
export function findClosingParan(input: string): number {
    let numberOfUnclosed = 0,
        currentChar;
    for (let i = 0, max = input.length; i < max; i++) {
        currentChar = input[i];
        if (currentChar === '(') {
            numberOfUnclosed++;
        } else if (currentChar === ')') {
            numberOfUnclosed--;
            if (numberOfUnclosed === 0) {
                return i;
            }
        }
    }

    throw 'No Closing Parentheses found';
}
