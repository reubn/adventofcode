export default input => {
  // Split into Array
  const array = input.split('')

  // Calculate number of array elements ahead in infinitely long list
  const stepsAhead = array.length / 2

  // Loop over array
  return array.reduce((total, number, index, {length}) => {
    // Calculate index for opposite element in circular list
    const comparisonIndex = (length + index + stepsAhead) % length
    const comparisonValue = array[comparisonIndex]

    // If current number is the same as its opposite number, add number to cummulative total
    return number === comparisonValue ? total + (+number) : total
  }, 0)
}
