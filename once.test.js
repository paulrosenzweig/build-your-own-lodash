import assert from "node:assert";
import once from "./once.js";

describe("once", function () {
  it("should invoke `func` once", function () {
    let count = 0;
    const onceFn = once(() => ++count);

    onceFn();
    assert.strictEqual(onceFn(), 1);
    assert.strictEqual(count, 1);
  });

  it("should ignore recursive calls", function () {
    let count = 0;

    const onceFn = once(() => {
      onceFn();
      return ++count;
    });

    assert.strictEqual(onceFn(), 1);
    assert.strictEqual(count, 1);
  });

  it("should not throw more than once", function () {
    const onceFn = once(() => {
      throw new Error();
    });

    assert.throws(onceFn);

    onceFn();
    assert.ok(true);
  });
});
