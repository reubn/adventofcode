export default input =>
  input
  // Split input into lines
  .split('\n')
  // Package the letter and the position, so that they can be related later on, e.g. `advent` => `[{letter: 'a', position: 0}, {letter: 'd', position: 1}...]`
  .reduce((tokens, [...letters]) => [...tokens, ...letters.map((letter, position) => ({letter, position}))], [])
  // For each position in the string, total up how many times each letter appears
  .reduce((totals, {letter, position}) => {
    // If this is the first time we reach the position, create an object prepopulated with the letter value as 1, as it cannot be anything else
    if(!totals[position]) totals[position] = {[letter]: 1}
    // Otherwise, either increment the letter's count, or set it to one if this is the first time we have reached this letter
    else totals[position][letter] = totals[position][letter] ? totals[position][letter] + 1 : 1

    return totals
  }, [])
  // Convert from an object to an array, for iterating over
  .map(object => Object.entries(object))
  // Sort the arrays by the number of times each letter appears, and then return the most used letter for that position
  .map(array => array.sort(([, a], [, b]) => b - a)[0][0])
  // Join to form a string
  .join``
