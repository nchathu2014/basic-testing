// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: -3, b: -2, action: Action.Subtract, expected: -1 },
  { a: 4, b: 12, action: Action.Subtract, expected: -8 },

  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: -3, b: -5, action: Action.Multiply, expected: 15 },
  { a: -6, b: -5, action: Action.Multiply, expected: 30 },

  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: -6, b: -3, action: Action.Divide, expected: 2 },
  { a: -6, b: 3, action: Action.Divide, expected: -2 },

  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: -2, b: -3, action: Action.Exponentiate, expected: -0.125 },
  { a: -2, b: 3, action: Action.Exponentiate, expected: -8 },
];

describe('simpleCalculator', () => {
  test('should perform addition correctly', () => {
    const additionCases = testCases.filter((tc) => tc.action === Action.Add);
    additionCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });

  test('should perform subtraction correctly', () => {
    const subtractionCases = testCases.filter(
      (tc) => tc.action === Action.Subtract,
    );
    subtractionCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });

  test('should perform multiplication correctly', () => {
    const multiplicationCases = testCases.filter(
      (tc) => tc.action === Action.Multiply,
    );
    multiplicationCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });

  test('should perform division correctly', () => {
    const divisionCases = testCases.filter((tc) => tc.action === Action.Divide);
    divisionCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });

  test('should perform exponentiation correctly', () => {
    const exponentiationCases = testCases.filter(
      (tc) => tc.action === Action.Exponentiate,
    );
    exponentiationCases.forEach(({ a, b, action, expected }) => {
      const input = { a, b, action };
      const result = simpleCalculator(input);
      expect(result).toBe(expected);
    });
  });
});
