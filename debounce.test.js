import assert from "node:assert";
import debounce from "./debounce.js";

describe("debounce", () => {
  it("should debounce a function", (done) => {
    let callCount = 0;

    const debounced = debounce(() => {
      ++callCount;
    }, 32);

    debounced();
    debounced();
    debounced();
    assert.strictEqual(callCount, 0);

    setTimeout(() => {
      assert.strictEqual(callCount, 1);

      debounced();
      debounced();
      debounced();
      assert.strictEqual(callCount, 1);
    }, 128);

    setTimeout(() => {
      assert.strictEqual(callCount, 2);
      done();
    }, 256);
  });

  it("subsequent debounced calls return the last `func` result", (done) => {
    const debounced = debounce((x) => x, 32);
    debounced("a");

    setTimeout(() => {
      assert.strictEqual(debounced("b"), "a");
    }, 64);

    setTimeout(() => {
      assert.strictEqual(debounced("c"), "b");
      done();
    }, 128);
  });

  it("should not immediately call `func` when `wait` is `0`", (done) => {
    let callCount = 0;
    const debounced = debounce(() => {
      ++callCount;
    }, 0);

    debounced();
    debounced();
    assert.strictEqual(callCount, 0);

    setTimeout(() => {
      assert.strictEqual(callCount, 1);
      done();
    }, 5);
  });
});
