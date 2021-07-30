import assert from "node:assert";
import once from "./once.js";

describe("once", () => {
  it("should invoke `func` once", () => {
    let count = 0;
    const onceFn = once(() => ++count);

    onceFn();
    assert.strictEqual(onceFn(), 1);
    assert.strictEqual(count, 1);
  });

  it("should ignore recursive calls", () => {
    let count = 0;

    const onceFn = once(() => {
      onceFn();
      return ++count;
    });

    assert.strictEqual(onceFn(), 1);
    assert.strictEqual(count, 1);
  });

  it("should not throw more than once", () => {
    const onceFn = once(() => {
      throw new Error();
    });

    assert.throws(onceFn);

    onceFn();
    assert.ok(true);
  });
});
