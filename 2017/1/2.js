// Cast String to Array
export default ([...input]) => {
  // Calculate the number of positions ahead in the flat list
  const stepsAhead = input.length / 2

  // Loop over digit array
  return input.reduce((total, digit, index, {length}) => {
    /* Add `stepsAhead` to current index
       Modulus value by length of array - in order to emulate a circular list when calculating the position of the 'digit halfway around'
    */
    const otherDigitIndex = (index + stepsAhead) % length
    const otherDigit = input[otherDigitIndex]

    // If current digit is the same as its the 'digit halfway around', add digit to cumulative total
    return digit === otherDigit ? (+digit + total) : total
  }, 0)
}
