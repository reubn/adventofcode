export default input => input.split('\n').filter(line => {
  const split = line.split(' ').map(word => [...word].sort().join(''))
  return new Set(split).size === split.length
}).length
