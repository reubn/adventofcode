module.exports = input => {
  const skipBadRange = (match, dis) => ({i: "j", l: "m", o: "p"}[dis] + Array(match.length).join("a"))
  do {
    input = (parseInt(input, 36) + 1).toString(36)
     .replace(/0/g, "a") // Wrap Around
     .replace(/(i|l|o)(\w*)/, skipBadRange)}
  while (!/(.)\1.*(.)\2/.test(input) || !/(abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/.test(input))
  return input
}
