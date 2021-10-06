import { CustomFunctions, JSFormulaCalculator } from './index';

describe('Test without variables', function () {
    const calculator = new JSFormulaCalculator();

    it('Add 2 numbers', function () {
        expect(5 + 4).toEqual(calculator.calculate('5 + 4'));
    });

    it('Subtract 2 numbers', function () {
        expect(5 - 4).toEqual(calculator.calculate('5 - 4'));
    });

    it('Multiply 2 numbers', function () {
        expect(7 * 8).toEqual(calculator.calculate('7 * 8'));
    });

    it('Divide 2 numbers', function () {
        expect(25 / 5).toEqual(calculator.calculate('25 / 5'));
    });
});

describe('Precedence Tests', function () {
    const calculator = new JSFormulaCalculator();

    it('Start correct order', function () {
        expect((Math.pow(2, 3) * 4) / 16 + 3 - 4).toEqual(calculator.calculate('2 ^ 3 * 4 / 16 + 3 - 4'));
    });

    it('Correct order flip previous', function () {
        expect((Math.pow(2, 3) / 4) * 16 - 3 + 4).toEqual(calculator.calculate('2 ^ 3 / 4 * 16 - 3 + 4'));
    });

    it('Reverse Order', function () {
        expect(2 + 3 - (4 / 16) * Math.pow(3, 4)).toEqual(calculator.calculate('2 + 3 - 4 / 16 * 3 ^ 4'));
    });

    it('Reversed Fliped', function () {
        expect(2 - 3 + (4 * 16) / Math.pow(3, 4)).toEqual(calculator.calculate('2 - 3 + 4 * 16 / 3 ^ 4'));
    });
});

describe('Precedence Tests with parentheses', function () {
    const calculator = new JSFormulaCalculator();

    it('Start correct order', function () {
        expect((Math.pow(2, 3) * 4) / 16 + (3 - 4)).toEqual(calculator.calculate('2 ^ 3 * 4 / 16 + (3 - 4)'));
    });

    it('Correct order flip previous', function () {
        expect(Math.pow(2, 3) / (4 * 16) - 3 + 4).toEqual(calculator.calculate('2 ^ 3 / (4 * 16) - 3 + 4'));
    });

    it('Reverse Order', function () {
        expect((2 + 3 - 4 / 16) * Math.pow(3, 4)).toEqual(calculator.calculate('(2 + 3 - 4 / 16) * 3 ^ 4'));
    });

    it('Reversed Fliped', function () {
        expect(((2 - 3 + 4) * 16) / Math.pow(3, 4)).toEqual(calculator.calculate('(2 - 3 + 4) * 16 / 3 ^ 4'));
    });
});

describe('Test with variables', function () {
    const calculator = new JSFormulaCalculator();

    const obj = {
        x: 10,
        y: 2.5,
        z: {
            x: 5,
            y: 25,
            z: {
                x: 40,
                y: 30,
            },
        },
    };

    it('Formula 1 test', function () {
        expect(obj.x + obj.y + obj.z.x).toEqual(calculator.calculate('{x} + {y} + {z.x}', obj));
    });

    it('Formula 2 test', function () {
        expect(obj.x - obj.y + obj.z.x).toEqual(calculator.calculate('{x} - {y} + {z.x}', obj));
    });

    it('Formula 3 test', function () {
        expect(Math.pow(obj.x, obj.y + obj.z.x)).toEqual(calculator.calculate('{x} ^ ({y} + {z.x})', obj));
    });

    it('Formula 4 test', function () {
        expect(obj.x - obj.z.z.x / (obj.z.x + obj.y * obj.z.y)).toEqual(calculator.calculate('{x} - {z.z.x} / ({z.x} + {y} * {z.y})', obj));
    });
});

describe('Test with Functions', function () {
    const calculator = new JSFormulaCalculator();

    const functions: CustomFunctions = {
        sin: function (x: number) {
            return Math.sin(x);
        },
        cos: function (x: number) {
            return Math.cos(x);
        },
        count: function (a: number[]) {
            return a.length;
        },
        sum: function (a: number[]) {
            const total = a.reduce((x, y) => {
                return x + y;
            }, 0);
            return total;
        },
    };

    const obj = {
        x: 5,
        a: [1, 2, 3, 4],
    };

    calculator.setFunctions(functions);

    it('Formula 1 test', function () {
        expect(functions.count(obj.a)).toEqual(calculator.calculate('count({a})', obj));
    });

    it('Formula 1 test', function () {
        expect(functions.sum(obj.a) / functions.count(obj.a)).toEqual(calculator.calculate('sum({a}) / count({a})', obj));
    });

    it('Formula 1 test', function () {
        expect(Math.pow(functions.sin(obj.x), 2) + Math.pow(functions.cos(obj.x), 2)).toEqual(calculator.calculate('sin({x}) ^ 2 + cos({x}) ^ 2', obj));
    });
});

describe('Test negations', function () {
    const calculator = new JSFormulaCalculator();

    const obj = {
        x: 5,
        y: 10,
    };

    it('Formula 1 test', function () {
        expect(1 - -5).toEqual(calculator.calculate('1 - -5', obj));
    });

    it('Formula 1 test', function () {
        expect(1 - -1 * obj.x).toEqual(calculator.calculate('1 - -1 * {x}', obj));
    });
});
