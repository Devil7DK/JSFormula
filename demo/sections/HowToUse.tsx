import React from 'react';

export const HowToUse: React.FC = () => (
    <section id="how-to-use">
        <h1>How to Use</h1>
        <p>
            JS Formula can evaluate formulas and return the result. If you want
            to use variables in your formulas make sure to wrap the variable in
            curly braces. To access nested attributes, place a dot in between
            the variable names. When you evaluate your formula, place the object
            with the variables as the second argument.
        </p>
        <p>
            To use your own functions in JS Formula create a key to function
            JSON object, and set it as the function set by calling the
            setFunctions method. After following these steps you can access your
            functions in the formula using the key you used in the JSON object.
        </p>
        <h2>Example</h2>
        <p>
            JS Formula can evaluate formulas and return the result. If you want
            to use variables in your formulas make sure to wrap the variable in
            curly braces. To access nested attributes, place a dot in between
            the variable names. When you evaluate your formula, place the object
            with the variables as the second argument.
        </p>
        {/* prettier-ignore */}
        <pre>
var functions = &#123;
    'sin' : function(x) &#123;
        return Math.sin(x)
    &#125;,
    'pow' : function(x,y) &#123;
        return Math.pow(x,y)
    &#125;
&#125;
_eval.setFunctions(functions)
var formula = '&#123;x&#125; + 5';
var obj = &#123;x:20&#125;;
var results = _eval(formula,obj);
//results will be 25
        </pre>
    </section>
);
