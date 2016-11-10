// Interpritter function must be able to handle inputs as primative `Number`s as well as the disired format.
// e.g. a => (a.length ? a : [a])[0] for a format such as [[1], [2], [3], [4]]
module.exports = function sumToValue(numbers, sumTo, func=a=>a, initial=0, partial=[], results=[]){
  const sum = partial.reduce((a, b) => func(a) + func(b), initial)
  if (sum === sumTo) results.push(partial)
  if (sum < sumTo) for (let i = 0; i < numbers.length; i++) sumToValue(numbers.slice(i + 1), sumTo, func, initial, partial.concat([numbers[i]]), results)
  return results
}
