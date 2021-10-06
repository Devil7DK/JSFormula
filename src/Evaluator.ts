import { TokenType } from './enums';
import { Token } from './types';

export class Evaluator {
    /**
     *	Evaluates a tree with a given object
     *
     *	@method evalTree
     *	@param {Object} tree The tree to be evaluated
     *	@param {Object} object The object that will be used to populate the variables
     *	@return {Object} The result of the tree evaluation with the given object
     */
    public evalTree(tree: Token, object?: Record<string, unknown>): number | string | Record<string, unknown> | undefined {
        if (tree.type === TokenType.FUNC) {
            const paramResults = [];
            for (let i = 0, max = tree.params.length; i < max; i++) {
                const result = this.evalTree(tree.params[i], object);
                if (result) {
                    paramResults.push(result);
                }
            }
            return tree.func.apply(this, paramResults);
        } else if (tree.type === TokenType.VAR && object) {
            return this.evalVar(tree.val, object);
        } else if (tree.type === TokenType.LIT) {
            return tree.val;
        }
    }

    /**
     *	Determines the value of a variable for the given object
     *
     *	@method evalVar
     *	@param {String} variable A string representing a variable Ex: x.y
     *	@param {Object} object The object that the variable will be evaluated against
     *	@return {Object} Value of the variable in the provided object
     */
    public evalVar(variable: string, object: Record<string, unknown>): Record<string, unknown> {
        const path = variable.split('.');
        let curObject = object;
        for (let i = 0, max = path.length; i < max; i++) {
            curObject = curObject[path[i]] as Record<string, unknown>;
        }
        return curObject;
    }
}
