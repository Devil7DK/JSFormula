import { Builder } from './Builder';
import { Evaluator } from './Evaluator';
import { CustomFunctions } from './types';

/**
 *	This is an object that has one method, noConflict. No conflict is used to return
 *	a function that performs calculations and has function properties to set functions, enable/disable caching
 *	and set the delimiters for variables
 *
 */
export class JSFormulaCalculator {
    private builder: Builder;
    private evaluator: Evaluator;

    constructor() {
        this.builder = new Builder();
        this.evaluator = new Evaluator();
    }

    /**
     *	A wrapper method that retreves a tree for a given formula and evaluates it against
     *	the given object. This is the functions that gets called by _eval
     *
     *	@method calculate
     *	@param {String} input The formula used to retrieve the tree
     *	@param {string} object The object that will be used to populate the variables
     *	@return {Object} The result of the formula with the object used to populate variable values
     */
    public calculate(input: string, object?: Record<string, unknown>): number {
        const tree = this.builder.buildTreeFromFormula(input);
        return this.evaluator.evalTree(tree, object) as number; // TODO: Set correct typing
    }

    /**
     *	Builds an executable function which accepts an object as a parameter
     *
     *	@method buildFunction
     *	@param {String} formula The formula that will be evaluated
     *	@return {Function} an executable function which accepts an object as a parameter
     */
    public buildFunction(formula: string): (object: Record<string, unknown>) => number {
        const tree = this.builder.buildTreeFromFormula(formula);
        return (object: Record<string, unknown>) => {
            return this.evaluator.evalTree(tree, object) as number; // TODO: Set correct typing
        };
    }

    /**
     *	Sets the functions that can be used in the formulas
     *
     *	@method setFunctions
     *	@param {Object} newFunctions A map of function names to functions
     */
    public setFunctions(newFunctions: CustomFunctions): void {
        this.builder.setFunctions(newFunctions);
    }
}

export { CustomFunctions };
