const sumToValue = require("./util/sumToValue.js")

module.exports = input => sumToValue(input.split("\n").map(line => parseInt(line, 10)), 150).length
