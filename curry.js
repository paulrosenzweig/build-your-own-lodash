// var convert = require('./convert'),
//     func = convert('curry', require('../curry'));

// func.placeholder = require('./placeholder');
// module.exports = func;

export default function curry(f, arity = f.length) {
  const helper =
    (args) =>
    (...moreArgs) => {
      const allArgs = args.concat(moreArgs);
      if (allArgs.length >= arity) {
        return f(...allArgs);
      }
      return helper(allArgs);
    };
  return helper([]);
}
