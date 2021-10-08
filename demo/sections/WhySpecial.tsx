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

const calculator = new JSFormulaCalculator();
calculator.setFunctions(functions);

export const WhySpecial: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>(
        '{"x":5,"y":{"z":20, "t":{"q":3}}}'
    );
    const [formulaInput, setFormulaInput] = useState<string>(
        'pow({x},{y.t.q}) + {x} - {y.z} / {y.t.q}'
    );
    const [result, setResult] = useState<string>();
    const [error, setError] = useState<string>();

    const onCompareClick = () => {
        let obj, cachedTime, uncachedTime, start, end, i;

        try {
            if (jsonInput) {
                obj = JSON.parse(jsonInput);
            } else {
                obj = {};
            }
            // TODO: Implement options in JSFormulaCalculator and uncommend following line
            //calculator.setCacheEnabled(false);
            start = Date.now();
            for (i = 0; i < 10000; i++) {
                calculator.calculate(formulaInput, obj);
            }
            end = Date.now();
            uncachedTime = end - start;

            // TODO: Implement options in JSFormulaCalculator and uncommend following line
            //calculator.setCacheEnabled(true);
            start = Date.now();
            for (i = 0; i < 10000; i++) {
                calculator.calculate(formulaInput, obj);
            }
            end = Date.now();
            cachedTime = end - start;

            setError(undefined);
            setResult(
                'Uncached time: ' +
                    uncachedTime +
                    ' milliseconds, cached time: ' +
                    cachedTime +
                    ' milliseconds'
            );
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Unknown error!');
            }
            setResult(undefined);
        }
    };

    return (
        <section id="why-special">
            <h1>Why is JS Formula special?</h1>
            <p>
                What sets JS Formula appart from other JavaScript formula
                evaluators is how it evaluates the formula. JS Formula does not
                just simply evaluate formula's, but instead builds a Formula
                object that can be traversed and evaluated. By taking this
                approach, the Formula object can be cached, which provides
                significant performance increase the next time the same formula
                string is asked to be evaluated, even with different objects.
            </p>
            <h2>Compare Your Self!</h2>
            <p>
                The function you enter here will be evaluate 10,000 times by
                both the uncached version and the cached version. It will then
                output how long it took to evaluate the 10,000 formulas for each
                version. The functions in the previous demo are still available.
            </p>
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
            <button onClick={onCompareClick}>Compare</button>
            {result && <div>Result: {result}</div>}
            {error && <div>Error: {error}</div>}
        </section>
    );
};
