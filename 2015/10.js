module.exports = (input, interations=40) => [...Array(interations)]
.reduce(previous => previous
  .match(/(\d)\1{0,}/g)
  .map(match => `${match.length}${match[0]}`)
  .join("")
, input).length
