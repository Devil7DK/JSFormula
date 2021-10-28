import React from 'react';

import { CodeBlock } from '#/components';

export const HowToUse: React.FC = () => (
    <section id="getting-started">
        <h1>Getting Started</h1>
        <ul>
            <li>
                Install <code>jsformula</code> package from NPM.
                <CodeBlock language="shell">npm install jsformula</CodeBlock>
            </li>
            <li>
                Import <code>JSFormula</code> class from <code>jsformula</code> package
                <CodeBlock language="javascript">{"import { JSFormula } from 'jsformula';"}</CodeBlock>
            </li>
            <li>
                Create new instance of <code>JSFormula</code> class.
                <CodeBlock language="javascript">const calculator = new JSFormula();</CodeBlock>
            </li>
            <li>
                Call the <code>calculate</code> method with your formula as string to evaluate the formula and return the result.
                <CodeBlock language="javascript">calculator.calculate("1 + (2 * 3)"); // Returns 7</CodeBlock>
            </li>
        </ul>
        <h2>Using Variables</h2>
        <p>
            If you want to use variables in your formulas make sure to wrap the variable in curly braces. And pass an object containing the
            variables as second argument.
        </p>
        <CodeBlock language="javascript">
            {'const obj = {a: 10, b: 20};'}
            {'calculator.calculate("{a} + {b}", obj); // Returns 30'}
        </CodeBlock>
        <p>To access nested attributes, place a dot in between the variable names.</p>
        <CodeBlock language="javascript">
            {'const obj = {a: {x: 10, y: 5}, b: {x: 20, y: 2}};'}
            {'calculator.calculate("{a.x} * {a.y} + {b.x} * {b.y}", obj); // Returns 60'}
        </CodeBlock>
        <h2>Custom Functions</h2>
        <p>
            To use your own functions in JSFormula create a object with the function name you want to use in formula as key and the function
            as value, and pass it to the JSFormula constructor (see available options). object.
        </p>
        <CodeBlock language="javascript">
            {'const customFunctions = {'}
            {'    sin: function(x) {'}
            {'        return Math.sin(x)'}
            {'    },'}
            {'    pow: function(x, y) {'}
            {'        return Math.pow(x, y)'}
            {'    }'}
            {'}'}
            {''}
            {'const calculator = new JSFormula({ functions: customFunctions });'}
            {'calculator.calculate("pow(5,2)"); // Returns 25'}
            {'calculator.calculate("sin(25)"); // Returns -0.13235175009777303'}
        </CodeBlock>
    </section>
);
