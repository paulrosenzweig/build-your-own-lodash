import assert from "node:assert";
import negate from "./01-negate.js";

function isEven(n) {
  return n % 2 === 0;
}

describe("negate", () => {
  it("should create a function that negates the result of `func`", () => {
    const isOdd = negate(isEven);

    assert.strictEqual(isOdd(1), true);
    assert.strictEqual(isOdd(2), false);
  });

  it("should create a function that accepts multiple arguments", () => {
    const evenNumberOfArgs = (...args) => isEven(args.length);
    const oddNumberOfArgs = negate(evenNumberOfArgs);

    assert.strictEqual(oddNumberOfArgs(1, 1), false);
    assert.strictEqual(oddNumberOfArgs(1, 1, 1), true);
  });
});
