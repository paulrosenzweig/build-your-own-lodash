import assert from "node:assert";
import memoize from "./memoize.js";

describe("memoize", function () {
  it("should memoize results based on the first argument given", () => {
    const memoized = memoize((a, b, c) => a + b + c);

    assert.strictEqual(memoized(1, 2, 3), 6);
    assert.strictEqual(memoized(1, 3, 5), 6);
  });

  it("should support a `resolver`", () => {
    const fn = (a, b, c) => a + b + c;
    const memoized = memoize(fn, fn);

    assert.strictEqual(memoized(1, 2, 3), 6);
    assert.strictEqual(memoized(1, 3, 5), 9);
  });

  it("should check cache for own properties", () => {
    const props = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];

    const memoized = memoize((x) => x);
    const actual = props.map(memoized);

    assert.deepStrictEqual(actual, props);
  });

  it("should cache the `__proto__` key", () => {
    const array = [];
    const key = "__proto__";

    for (const resolver of [(x) => x, undefined]) {
      let count = 0;

      const memoized = memoize(() => {
        count++;
        return array;
      }, resolver);

      memoized(key);
      memoized(key);

      assert.strictEqual(count, 1);
    }
  });

  it("should work with an immutable cache", () => {
    class ImmutableMap {
      constructor(pairs) {
        this.m = new Map(pairs);
      }
      get(k) {
        return this.m.get(k);
      }
      has(k) {
        return this.m.has(k);
      }
      set(key, value) {
        return new ImmutableMap([...this.m.entries(), [key, value]]);
      }
    }

    const oldCache = memoize.Cache;
    memoize.Cache = ImmutableMap;

    var memoized = memoize(function (object) {
      return object.id;
    });

    var key1 = { id: "a" },
      key2 = { id: "b" };

    memoized(key1);
    memoized(key2);

    var cache = memoized.cache;
    assert.strictEqual(cache.has(key1), true);
    assert.strictEqual(cache.has(key2), true);

    memoize.Cache = oldCache;
  });
});
