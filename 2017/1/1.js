// Cast String to Array
export default ([...input]) => input.reduce(({previousDigit, total}, digit) => ({
  previousDigit: digit,
  total: digit === previousDigit ? (+digit + total) : total // If current digit is the same as the `previousDigit`, add digit to cumulative total
}), {
  previousDigit: input[input.length - 1], // Initalise with last digit of the array being the `previousDigit` for the first digit
  total: 0
}).total
