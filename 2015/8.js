module.exports = input => input.raw[0]
.split("\n")
.map(rawLine => rawLine.length - eval(rawLine).length)
.reduce((a, b) => a + b, 0)
