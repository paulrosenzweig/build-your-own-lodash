import assert from "node:assert";
import throttle from "./06-throttle.js";

describe("throttle", () => {
  it("should throttle a function", (done) => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    throttled();
    throttled();

    assert.strictEqual(callCount, 1);

    setTimeout(() => {
      assert.strictEqual(callCount, 2);
      done();
    }, 128);
  });

  it("should not trigger a trailing call when invoked once", (done) => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    assert.strictEqual(callCount, 1);

    setTimeout(() => {
      assert.strictEqual(callCount, 1);
      done();
    }, 64);
  });

  it("should throttle calls right after a trailing invocation", (done) => {
    let callCount = 0;
    const throttled = throttle(() => {
      callCount++;
    }, 32);

    throttled();
    assert.strictEqual(callCount, 1);

    setTimeout(() => {
      throttled();
      assert.strictEqual(callCount, 1);
    }, 30);

    setTimeout(() => {
      throttled();
      assert.strictEqual(callCount, 2);
    }, 60);

    setTimeout(() => {
      assert.strictEqual(callCount, 3);
      done();
    }, 90);
  });

  it("subsequent calls should return the result of the first call", (done) => {
    const throttled = throttle((x) => x, 32);
    const results = [throttled("a"), throttled("b")];

    assert.deepStrictEqual(results, ["a", "a"]);

    setTimeout(() => {
      const results = [throttled("c"), throttled("d")];
      assert.deepStrictEqual(results, ["c", "c"]);
      done();
    }, 70);
  });

  it("should return most recent result for a throttled call", (done) => {
    const throttled = throttle((x) => x, 32);
    assert.strictEqual(throttled("a"), "a");

    setTimeout(() => {
      assert.strictEqual(throttled("b"), "a");
    }, 20);

    setTimeout(() => {
      assert.strictEqual(throttled("c"), "b");
      done();
    }, 40);
  });

  it("should trigger a second throttled call as soon as possible", (done) => {
    let callCount = 0;

    const throttled = throttle(() => {
      callCount++;
    }, 128);

    throttled();
    assert.strictEqual(callCount, 1);

    setTimeout(() => {
      throttled();
      assert.strictEqual(callCount, 1);
    }, 96);

    setTimeout(() => {
      assert.strictEqual(callCount, 2);
      done();
    }, 130);
  });
});
