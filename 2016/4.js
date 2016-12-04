export default input =>
  // Split input into lines
  input.split('\n')
  .reduce((total, line) => {
    /* Split line into the two main parts: the sector id and check sum, and the encrypted name
       We reverse the array to take advantage of the rest parameters, which can only be the last item
    */
    const [sectorIdAndCheckSum, ...nameParts] = line.split('-').reverse()

    // Destructure out the sector id and the check sum
    const [sectorId, checkSum] = sectorIdAndCheckSum.slice(0, -1).split('[')

    const calculatedCheckSum =
    // Convert object to array
    Object.entries(
      nameParts
      // Flattern array, while also reversing back to the right order
      .reduce((array, part) => [...part, ...array], [])
      // Add up the number of times a letter appears in the name
      .reduce((map, letter) => ({...map, [letter]: map[letter] ? map[letter] + 1 : 1}), {})
    )
    // Sort the letters
    .sort(([aLetter, aCount], [bLetter, bCount]) => {
      // If both letters appear the same number of times, break the tie by sorting alphabetically
      if(aCount === bCount) return aLetter.localeCompare(bLetter)

      // Otherwise, sort normally, by number of times the letter appears in the strirng
      return bCount - aCount
    })
    // Map to single array of letters
    .map(([letter]) => letter)
    // Join into a string
    .join``
    // Take the first 5 letter
    .slice(0, 5)

    // If the check sum give is the same as the correct one we calculated then increase the total by the sector id
    return checkSum === calculatedCheckSum ? total + +sectorId : total
  }, 0)
