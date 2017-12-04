export default input => input.split('\n').filter(line => {
  const split = line.split(' ')
  return new Set(split).size === split.length
}).length
