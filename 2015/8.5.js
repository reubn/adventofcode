module.exports = input => input.raw[0]
.split("\n")
.map(rawLine => rawLine.length - JSON.sringify(rawLine).length)
.reduce((a, b) => a + b, 0)
