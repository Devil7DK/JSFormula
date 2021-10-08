(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({
1: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
var react_dom_1 = __fusereq(4);
var react_dom_1d = __fuse.dt(react_dom_1);
var App_1 = __fusereq(5);
react_dom_1d.default.render(react_1d.default.createElement(App_1.App, null), document.getElementById('root'));

},
5: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
var sections_1 = __fusereq(9);
exports.App = () => {
  return react_1d.default.createElement("div", {
    className: "sections-container"
  }, react_1d.default.createElement(sections_1.Intro, null), react_1d.default.createElement(sections_1.HowToUse, null), react_1d.default.createElement(sections_1.TryIt, null), react_1d.default.createElement(sections_1.WhySpecial, null), react_1d.default.createElement(sections_1.ReusableFunctions, null));
};

},
9: function(__fusereq, exports, module){
exports.__esModule = true;
Object.assign(exports, __fusereq(12));
Object.assign(exports, __fusereq(13));
Object.assign(exports, __fusereq(14));
Object.assign(exports, __fusereq(15));
Object.assign(exports, __fusereq(16));

},
12: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
exports.HowToUse = () => react_1d.default.createElement("section", {
  id: "how-to-use"
}, react_1d.default.createElement("h1", null, "How to Use"), react_1d.default.createElement("p", null, "\n            JS Formula can evaluate formulas and return the result. If you want\n            to use variables in your formulas make sure to wrap the variable in\n            curly braces. To access nested attributes, place a dot in between\n            the variable names. When you evaluate your formula, place the object\n            with the variables as the second argument.\n        "), react_1d.default.createElement("p", null, "\n            To use your own functions in JS Formula create a key to function\n            JSON object, and set it as the function set by calling the\n            setFunctions method. After following these steps you can access your\n            functions in the formula using the key you used in the JSON object.\n        "), react_1d.default.createElement("h2", null, "Example"), react_1d.default.createElement("p", null, "\n            JS Formula can evaluate formulas and return the result. If you want\n            to use variables in your formulas make sure to wrap the variable in\n            curly braces. To access nested attributes, place a dot in between\n            the variable names. When you evaluate your formula, place the object\n            with the variables as the second argument.\n        "), react_1d.default.createElement("pre", null, "\nvar functions = {\n    'sin' : function(x) {\n        return Math.sin(x)\n    },\n    'pow' : function(x,y) {\n        return Math.pow(x,y)\n    }\n}\n_eval.setFunctions(functions)\nvar formula = '{x} + 5';\nvar obj = {x:20};\nvar results = _eval(formula,obj);\n//results will be 25\n        "));

},
13: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
exports.Intro = () => react_1d.default.createElement("section", {
  id: "intro"
}, react_1d.default.createElement("h1", null, "JS Formula"), react_1d.default.createElement("p", null, "\n            JS Formula is Javascript utility that enables formula evaluation\n            without the use of eval(). Users can perform evaluation on JSON\n            objects using the built in mathmatical opperators +, - , / and * as\n            well as define custom functions that the evaluator can use.\n        "), react_1d.default.createElement("a", {
  href: "#tryit"
}, "Try it out!"));

},
14: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
exports.ReusableFunctions = () => react_1d.default.createElement("section", {
  id: "reusable-functions"
}, react_1d.default.createElement("h1", null, "\n            JS Formula is able to build functions based on formulas. The\n            function can then be called with a an object parameter and will\n            return the output of the formula used to define the function.\n        "), react_1d.default.createElement("p", null, "\n            JS Formula is Javascript utility that enables formula evaluation\n            without the use of eval(). Users can perform evaluation on JSON\n            objects using the built in mathmatical opperators +, - , / and * as\n            well as define custom functions that the evaluator can use.\n        "), react_1d.default.createElement("h2", null, "Example"), react_1d.default.createElement("pre", null, "\nvar add4 = _eval.getFunction('4 +  {x}');\nvar result = add4({x: 10});\n//result will be 14\n        "));

},
15: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
var react_simple_code_editor_1 = __fusereq(18);
var react_simple_code_editor_1d = __fuse.dt(react_simple_code_editor_1);
var index_1 = __fusereq(19);
var prismjs_1 = __fusereq(20);
__fusereq(21);
__fusereq(22);
__fusereq(23);
const functions = {
  pow: function (x, y) {
    return Math.pow(x, y);
  },
  max: function (values) {
    if (!values) {
      return 0;
    } else {
      let max = Number.MIN_VALUE;
      values.forEach(function (x) {
        if (x > max) {
          max = x;
        }
      });
      return max;
    }
  },
  len: function (a) {
    return a.length;
  },
  sum: function (a) {
    let total = 0;
    a.forEach(function (x) {
      total += x;
    });
    return total;
  }
};
const calculator = new index_1.JSFormulaCalculator();
calculator.setFunctions(functions);
exports.TryIt = () => {
  const [jsonInput, setJsonInput] = react_1.useState('{"a":[1,2,3,4]}');
  const [formulaInput, setFormulaInput] = react_1.useState('sum({a}) / len({a})');
  const [result, setResult] = react_1.useState();
  return react_1d.default.createElement("div", {
    className: "horizontal-sections"
  }, react_1d.default.createElement("section", {
    id: "tryit"
  }, react_1d.default.createElement("h1", null, "Try it!"), react_1d.default.createElement("b", null, "JSON Object"), react_1d.default.createElement(react_simple_code_editor_1d.default, {
    value: jsonInput,
    onValueChange: setJsonInput,
    highlight: code => prismjs_1.highlight(code, prismjs_1.languages.json, 'json'),
    padding: 10,
    style: {
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12
    }
  }), react_1d.default.createElement("b", null, "Formula"), react_1d.default.createElement(react_simple_code_editor_1d.default, {
    value: formulaInput,
    onValueChange: setFormulaInput,
    highlight: code => prismjs_1.highlight(code, prismjs_1.languages.js, 'js'),
    padding: 10,
    style: {
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12
    }
  }), react_1d.default.createElement("button", {
    onClick: () => setResult(calculator.calculate(formulaInput, JSON.parse(jsonInput)).toString())
  }, "\n                    Calculate\n                "), result && react_1d.default.createElement("div", null, "Result: ", result)), react_1d.default.createElement("section", null, react_1d.default.createElement("h1", null, "Functions Included for Demo"), Object.keys(functions).map(functionName => {
    if (Object.prototype.hasOwnProperty.call(functions, functionName)) {
      const functionString = functions[functionName].toString();
      return react_1d.default.createElement("details", {
        key: functionName
      }, react_1d.default.createElement("summary", null, functionName), react_1d.default.createElement("pre", null, functionString));
    } else {
      return null;
    }
  })));
};

},
16: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(3);
var react_1d = __fuse.dt(react_1);
var react_simple_code_editor_1 = __fusereq(18);
var react_simple_code_editor_1d = __fuse.dt(react_simple_code_editor_1);
var index_1 = __fusereq(19);
var prismjs_1 = __fusereq(20);
__fusereq(21);
__fusereq(22);
__fusereq(23);
const functions = {
  pow: function (x, y) {
    return Math.pow(x, y);
  },
  max: function (values) {
    if (!values) {
      return 0;
    } else {
      let max = Number.MIN_VALUE;
      values.forEach(function (x) {
        if (x > max) {
          max = x;
        }
      });
      return max;
    }
  },
  len: function (a) {
    return a.length;
  },
  sum: function (a) {
    let total = 0;
    a.forEach(function (x) {
      total += x;
    });
    return total;
  }
};
const calculator = new index_1.JSFormulaCalculator();
calculator.setFunctions(functions);
exports.WhySpecial = () => {
  const [jsonInput, setJsonInput] = react_1.useState('{"x":5,"y":{"z":20, "t":{"q":3}}}');
  const [formulaInput, setFormulaInput] = react_1.useState('pow({x},{y.t.q}) + {x} - {y.z} / {y.t.q}');
  const [result, setResult] = react_1.useState();
  const [error, setError] = react_1.useState();
  const onCompareClick = () => {
    let obj, cachedTime, uncachedTime, start, end, i;
    try {
      if (jsonInput) {
        obj = JSON.parse(jsonInput);
      } else {
        obj = {};
      }
      start = Date.now();
      for (i = 0; i < 10000; i++) {
        calculator.calculate(formulaInput, obj);
      }
      end = Date.now();
      uncachedTime = end - start;
      start = Date.now();
      for (i = 0; i < 10000; i++) {
        calculator.calculate(formulaInput, obj);
      }
      end = Date.now();
      cachedTime = end - start;
      setError(undefined);
      setResult('Uncached time: ' + uncachedTime + ' milliseconds, cached time: ' + cachedTime + ' milliseconds');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error!');
      }
      setResult(undefined);
    }
  };
  return react_1d.default.createElement("section", {
    id: "why-special"
  }, react_1d.default.createElement("h1", null, "Why is JS Formula special?"), react_1d.default.createElement("p", null, "\n                What sets JS Formula appart from other JavaScript formula\n                evaluators is how it evaluates the formula. JS Formula does not\n                just simply evaluate formula's, but instead builds a Formula\n                object that can be traversed and evaluated. By taking this\n                approach, the Formula object can be cached, which provides\n                significant performance increase the next time the same formula\n                string is asked to be evaluated, even with different objects.\n            "), react_1d.default.createElement("h2", null, "Compare Your Self!"), react_1d.default.createElement("p", null, "\n                The function you enter here will be evaluate 10,000 times by\n                both the uncached version and the cached version. It will then\n                output how long it took to evaluate the 10,000 formulas for each\n                version. The functions in the previous demo are still available.\n            "), react_1d.default.createElement("b", null, "JSON Object"), react_1d.default.createElement(react_simple_code_editor_1d.default, {
    value: jsonInput,
    onValueChange: setJsonInput,
    highlight: code => prismjs_1.highlight(code, prismjs_1.languages.json, 'json'),
    padding: 10,
    style: {
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12
    }
  }), react_1d.default.createElement("b", null, "Formula"), react_1d.default.createElement(react_simple_code_editor_1d.default, {
    value: formulaInput,
    onValueChange: setFormulaInput,
    highlight: code => prismjs_1.highlight(code, prismjs_1.languages.js, 'js'),
    padding: 10,
    style: {
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: 12
    }
  }), react_1d.default.createElement("button", {
    onClick: onCompareClick
  }, "Compare"), result && react_1d.default.createElement("div", null, "Result: ", result), error && react_1d.default.createElement("div", null, "Error: ", error));
};

},
19: function(__fusereq, exports, module){
exports.__esModule = true;
var Builder_1 = __fusereq(24);
var Evaluator_1 = __fusereq(25);
var types_1 = __fusereq(26);
class JSFormulaCalculator {
  constructor() {
    this.builder = new Builder_1.Builder();
    this.evaluator = new Evaluator_1.Evaluator();
  }
  calculate(input, object) {
    const tree = this.builder.buildTreeFromFormula(input);
    return this.evaluator.evalTree(tree, object);
  }
  buildFunction(formula) {
    const tree = this.builder.buildTreeFromFormula(formula);
    return object => {
      return this.evaluator.evalTree(tree, object);
    };
  }
  setFunctions(newFunctions) {
    this.builder.setFunctions(newFunctions);
  }
}
exports.JSFormulaCalculator = JSFormulaCalculator;
exports.CustomFunctions = types_1.CustomFunctions;

},
24: function(__fusereq, exports, module){
exports.__esModule = true;
var enums_1 = __fusereq(27);
var Operators_1 = __fusereq(28);
var Utils_1 = __fusereq(29);
class Builder {
  constructor() {
    this.functions = {};
    this.functionRegex = null;
    this.variableOpen = '{';
    this.variableEnd = '}';
    this.variableRegex = new RegExp('^' + this.variableOpen + '.*?' + this.variableEnd);
    this.opporatorRegex = /^\+|^-|^\/|^\*|^\^/;
    this.cacheEnabled = true;
    this.cache = {};
  }
  setFunctions(newFunctions) {
    const functionRegexs = [];
    let regexString;
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
  tokenize(input) {
    const tokens = [];
    let curIndex = 0, token, regexMatch, curRemainingString, firstChar, nextMatPosition, funcName, paramsUnparsed, params, stripFirstParam, opperator, stripedRegex, closingParan;
    while (curIndex < input.length) {
      curRemainingString = input.substring(curIndex).trim();
      firstChar = input.substring(curIndex, curIndex + 1);
      if (firstChar === '"' || firstChar === "'") {
        nextMatPosition = input.indexOf(firstChar, curIndex + 1);
        if (nextMatPosition == -1) {
          throw 'Quote miss match';
        }
        tokens.push({
          type: enums_1.TokenType.LIT,
          val: input.substring(curIndex, curIndex + nextMatPosition + 2)
        });
        curIndex += curIndex + nextMatPosition + 2;
      } else if (firstChar === '(') {
        nextMatPosition = Utils_1.findClosingParan(curRemainingString);
        token = this.buildTreeFromFormula(curRemainingString.substring(1, nextMatPosition));
        if (token) {
          tokens.push(token);
        }
        curIndex = curIndex + nextMatPosition + 2;
      } else if (regexMatch = Utils_1.getFirstRegex(this.variableRegex, curRemainingString)) {
        stripedRegex = regexMatch.replace(this.variableOpen, '').replace(this.variableEnd, '');
        tokens.push({
          type: enums_1.TokenType.VAR,
          val: stripedRegex
        });
        curIndex = curIndex + 1 + regexMatch.length;
      } else if (this.functionRegex && (regexMatch = Utils_1.getFirstRegex(this.functionRegex, curRemainingString))) {
        nextMatPosition = regexMatch.indexOf('(');
        funcName = regexMatch.substring(0, nextMatPosition);
        stripFirstParam = regexMatch.substring(nextMatPosition);
        closingParan = Utils_1.findClosingParan(curRemainingString);
        paramsUnparsed = Utils_1.findParameters(curRemainingString.substring(nextMatPosition + 1, closingParan + 1));
        params = [];
        for (let i = 0, max = paramsUnparsed.length; i < max; i++) {
          const newParam = this.buildTreeFromFormula(paramsUnparsed[i]);
          if (newParam) {
            params.push(newParam);
          }
        }
        tokens.push({
          type: enums_1.TokenType.FUNC,
          func: this.functions[funcName],
          params: params
        });
        curIndex = curIndex + 2 + closingParan;
      } else if (regexMatch = Utils_1.getFirstRegex(this.opporatorRegex, curRemainingString)) {
        if (regexMatch == '-') {
          if (tokens.length == 0 || tokens[tokens.length - 1].type === enums_1.TokenType.OPP) {
            nextMatPosition = curRemainingString.indexOf(' ');
            if (nextMatPosition === -1) {
              nextMatPosition = curRemainingString.length;
            }
            try {
              tokens.push({
                type: enums_1.TokenType.LIT,
                val: Number(curRemainingString.substring(0, nextMatPosition))
              });
              curIndex = curIndex + 1 + nextMatPosition;
            } catch (err) {
              throw 'Invalid use of -; If you want to negate a variable or function times it by -1';
            }
            continue;
          }
        }
        opperator = Operators_1.Operators[regexMatch];
        tokens.push(opperator);
        curIndex = curIndex + 1 + regexMatch.length;
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
          type: enums_1.TokenType.LIT,
          val: Number(token)
        });
        curIndex = curIndex + 1 + nextMatPosition;
      }
    }
    return tokens;
  }
  infixToPostFix(tokens) {
    const stack = [];
    const postFix = [];
    let curToken, topOpperator, curStackLength;
    for (let i = 0, max = tokens.length; i < max; i++) {
      curToken = tokens[i];
      if (curToken.type !== enums_1.TokenType.OPP) {
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
    while (curToken = stack.pop()) {
      postFix.push(curToken);
    }
    return postFix;
  }
  buildTree(postFix) {
    postFix = postFix.slice(0);
    let i = 0, max = postFix.length, currentToken, numArgs, params;
    while (i < max) {
      currentToken = postFix[i];
      if (currentToken.type !== enums_1.TokenType.OPP) {
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
          type: enums_1.TokenType.FUNC,
          params: params,
          func: currentToken.func
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
  buildTreeFromFormula(input) {
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
exports.Builder = Builder;

},
25: function(__fusereq, exports, module){
exports.__esModule = true;
var enums_1 = __fusereq(27);
class Evaluator {
  evalTree(tree, object) {
    if (tree.type === enums_1.TokenType.FUNC) {
      const paramResults = [];
      for (let i = 0, max = tree.params.length; i < max; i++) {
        const result = this.evalTree(tree.params[i], object);
        if (result) {
          paramResults.push(result);
        }
      }
      return tree.func.apply(this, paramResults);
    } else if (tree.type === enums_1.TokenType.VAR && object) {
      return this.evalVar(tree.val, object);
    } else if (tree.type === enums_1.TokenType.LIT) {
      return tree.val;
    }
  }
  evalVar(variable, object) {
    const path = variable.split('.');
    let curObject = object;
    for (let i = 0, max = path.length; i < max; i++) {
      curObject = curObject[path[i]];
    }
    return curObject;
  }
}
exports.Evaluator = Evaluator;

},
26: function(__fusereq, exports, module){
exports.__esModule = true;
Object.assign(exports, __fusereq(30));
Object.assign(exports, __fusereq(31));

},
27: function(__fusereq, exports, module){
exports.__esModule = true;
Object.assign(exports, __fusereq(32));

},
28: function(__fusereq, exports, module){
exports.__esModule = true;
var enums_1 = __fusereq(27);
exports.Operators = {
  '+': {
    precedence: 1,
    func: function (a, b) {
      return a + b;
    },
    arguments: 2,
    type: enums_1.TokenType.OPP
  },
  '-': {
    precedence: 1,
    func: function (a, b) {
      return a - b;
    },
    arguments: 2,
    type: enums_1.TokenType.OPP
  },
  '*': {
    precedence: 2,
    func: function (a, b) {
      return a * b;
    },
    arguments: 2,
    type: enums_1.TokenType.OPP
  },
  '/': {
    precedence: 2,
    func: function (a, b) {
      return a / b;
    },
    arguments: 2,
    type: enums_1.TokenType.OPP
  },
  '^': {
    precedence: 3,
    func: function (a, b) {
      return Math.pow(a, b);
    },
    arguments: 2,
    type: enums_1.TokenType.OPP
  }
};

},
29: function(__fusereq, exports, module){
function getFirstRegex(regex, string) {
  if (regex) {
    const results = regex.exec(string);
    if (results) {
      return results[0];
    }
  }
  return null;
}
exports.getFirstRegex = getFirstRegex;
function findParameters(input) {
  const params = [];
  let curPos = 0, unclosedParams = 0, curChar, len = input.length;
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
exports.findParameters = findParameters;
function findClosingParan(input) {
  let numberOfUnclosed = 0, currentChar;
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
exports.findClosingParan = findClosingParan;

},
30: function(__fusereq, exports, module){
},
31: function(__fusereq, exports, module){
},
32: function(__fusereq, exports, module){
var TokenType;
(function (TokenType) {
  TokenType[TokenType["FUNC"] = 1] = "FUNC"
  TokenType[TokenType["VAR"] = 2] = "VAR"
  TokenType[TokenType["LIT"] = 3] = "LIT"
  TokenType[TokenType["OPP"] = 4] = "OPP"
})(TokenType || (TokenType = {}))
exports.TokenType = TokenType;

}
})
//# sourceMappingURL=app.01d7862e4.js.map