export default input =>
  input.split('\n') // Split into lines
    .reduce((total, line) => {
      const parts = line.split(/\s/) // Split by whitespace to get at numbers
        .reduce((array, part) => part ? [...array, +part] : array, []) // Filter out empty elements where multiple whitespace characters existed, then cast to number


      return total + (Math.max(...parts) - Math.min(...parts)) // Add difference between highest and lowest values to cummulative total
    }, 0)
