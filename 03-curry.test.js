import assert from "node:assert";
import curry from "./03-curry.js";

describe("curry", () => {
  function fn(a, b, c, d) {
    return Array.prototype.slice.call(arguments);
  }

  it("should invoke the function when all arguments are given", () => {
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];

    assert.deepStrictEqual(curried(1)(2)(3)(4), expected);
  });

  it("should allow padding multiple arguments", () => {
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];

    assert.deepStrictEqual(curried(1, 2)(3, 4), expected);
  });

  it("should allow reusing partially curried functions", () => {
    const curried = curry(fn);
    const expected = [1, 2, 3, 4];
    const withTwo = curried(1)(2);

    assert.deepStrictEqual(withTwo(3)(4), expected);
    assert.deepStrictEqual(withTwo(3, 4), expected);
  });

  it("should allow specifying `arity`", () => {
    const curried = curry(fn, 3);
    const expected = [1, 2, 3];

    assert.deepStrictEqual(curried(1)(2)(3), expected);
  });

  it("should provide additional arguments after reaching the target arity", () => {
    const curried = curry(fn, 3);
    assert.deepStrictEqual(curried(1)(2, 3, 4), [1, 2, 3, 4]);
    assert.deepStrictEqual(curried(1, 2)(3, 4, 5), [1, 2, 3, 4, 5]);
    assert.deepStrictEqual(curried(1, 2, 3, 4, 5, 6), [1, 2, 3, 4, 5, 6]);
  });

  it("should create a function with a `length` of `0`", () => {
    for (const curried of [curry(fn, 4), curry(fn)]) {
      assert.strictEqual(curried.length, 0);
      assert.strictEqual(curried(1).length, 0);
      assert.strictEqual(curried(1, 2).length, 0);
    }
  });

  it("should use `this` binding of function", () => {
    const fn = function (a, b, c) {
      const value = this || {};
      return [value[a], value[b], value[c]];
    };

    const object = { a: 1, b: 2, c: 3 };
    const expected = [1, 2, 3];

    assert.deepStrictEqual(curry(fn.bind(object), 3)("a")("b")("c"), expected);
    assert.deepStrictEqual(curry(fn.bind(object), 3)("a", "b")("c"), expected);
    assert.deepStrictEqual(curry(fn.bind(object), 3)("a", "b", "c"), expected);
  });
});
