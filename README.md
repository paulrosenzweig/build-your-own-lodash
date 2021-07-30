# Build your own Lodash
Practice Javascript by writing implementations for Lodash functions.

## What is this repo?
[Lodash](https://lodash.com/) is a popular Javascript library that has many small utilities.
I thought it'd be fun to practice by reimplementing them with a test suite.

To make this repo, I pulled out a few interesting functions from Lodash, cleaned up the tests, and removed the body of the function.
In some cases I also simplified the functions to keep the focus on the core purpose of the function.

## How to use this

### Setup
Install the deps (just a testing tool)
```
yarn install
```

### Start implementing
1. Run the tests `yarn test-all`  
It will break on the first failure so you're not confronted with a wall of red text.
2. Implement the first function in `01-negate.js`  
The comment above the function describes the arguments and gives an example.
3. Rerun the tests and check if it works!


## Functions
These are ordered roughly in order of increasing complexity.
* negate
* once
* curry
* memoize
* throttle
* debounce
