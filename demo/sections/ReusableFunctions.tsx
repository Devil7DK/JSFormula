import React from 'react';

export const ReusableFunctions: React.FC = () => (
    <section id="reusable-functions">
        <h1>
            JS Formula is able to build functions based on formulas. The
            function can then be called with a an object parameter and will
            return the output of the formula used to define the function.
        </h1>
        <p>
            JS Formula is Javascript utility that enables formula evaluation
            without the use of eval(). Users can perform evaluation on JSON
            objects using the built in mathmatical opperators +, - , / and * as
            well as define custom functions that the evaluator can use.
        </p>
        <h2>Example</h2>
        {/* prettier-ignore */}
        <pre>
var add4 = _eval.getFunction('4 +  &#123;x&#125;');
var result = add4(&#123;x: 10&#125;);
//result will be 14
        </pre>
    </section>
);
