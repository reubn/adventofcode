export default input =>
  input.split('\n') // Split into lines
    .reduce((total, line) => {
      const parts = line.split(/\s+/) // Split by whitespace to get at numbers

      let lineResult = 0
      parts.find(dividend => // Loop over numbers
        parts.find(divisor => // Loop over numbers inside previous loop
          dividend !== divisor // If dividend is not equal to the divisor....
          && !(dividend % divisor) // ...and the remainder of the divison is zero...
          && (lineResult = dividend / divisor) // ...set the result for the line to the quotient
        )
      ) // Both loops will break when the first solution for the line is found

      return total + lineResult // Add quotient to cummulative total
    }, 0)
