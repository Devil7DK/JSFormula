import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';

import { CustomFunctions, JSFormulaCalculator } from '~/index';

import { highlight, languages } from 'prismjs';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';

const functions: CustomFunctions = {
    pow: function (x: number, y: number) {
        return Math.pow(x, y);
    },
    max: function (values: number[]) {
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
    len: function (a: number[]) {
        return a.length;
    },
    sum: function (a: number[]) {
        let total = 0;
        a.forEach(function (x) {
            total += x;
        });
        return total;
    },
};

const calculator = new JSFormulaCalculator({ functions });
const obj = { a: { x: 10, y: 5 }, b: { x: 20, y: 2 } };
console.log(calculator.calculate('{a.x} * {a.y} + {b.x} / {b.y}', obj));

{
    const customFunctions = {
        sin: function (x) {
            return Math.sin(x);
        },
        pow: function (x, y) {
            return Math.pow(x, y);
        },
    };

    const calculator = new JSFormulaCalculator({ functions: customFunctions });
    console.log(calculator.calculate('pow(5,2)'));
    console.log(calculator.calculate('sin(25)'));
}

export const TryIt: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>('{"a":[1,2,3,4]}');
    const [formulaInput, setFormulaInput] = useState<string>('sum({a}) / len({a})');
    const [result, setResult] = useState<string>();

    return (
        <div className="horizontal-sections">
            <section id="tryit">
                <h1>Try it!</h1>
                <b>JSON Object</b>
                <Editor
                    value={jsonInput}
                    onValueChange={setJsonInput}
                    highlight={(code) => highlight(code, languages.json, 'json')}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
                <b>Formula</b>
                <Editor
                    value={formulaInput}
                    onValueChange={setFormulaInput}
                    highlight={(code) => highlight(code, languages.js, 'js')}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 12,
                    }}
                />
                <button onClick={() => setResult(calculator.calculate(formulaInput, JSON.parse(jsonInput)).toString())}>Calculate</button>
                {result && <div>Result: {result}</div>}
            </section>
            <section>
                <h1>Functions Included for Demo</h1>
                {Object.keys(functions).map((functionName) => {
                    if (Object.prototype.hasOwnProperty.call(functions, functionName)) {
                        const functionString = functions[functionName].toString();
                        return (
                            <details key={functionName}>
                                <summary>{functionName}</summary>
                                <pre>{functionString}</pre>
                            </details>
                        );
                    } else {
                        return null;
                    }
                })}
            </section>
        </div>
    );
};
