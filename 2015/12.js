module.exports = input => input.match(/(-?\d+)/g).reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0)
