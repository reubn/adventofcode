const sumToValue = require("./util/sumToValue.js")

module.exports = input => sumToValue(input.split("\n").map(line => parseInt(line, 10)), 150)
  .map(sum => sum.length)
  .reduce((store, sum, index, sums) => {
    if (sum < store.smallest) {
      store.smallest = sum
      store.numberOf = sums.filter(a => a === store.smallest).length
    }
    return store
  }, {smallest: Infinity, numberOf: 0}).numberOf
