export default input =>
  input.split('\n') // Split into lines
    .reduce((total, line) => {
      const parts = line.split('\t') // Split by whitespace to get at numbers

      return total + (Math.max(...parts) - Math.min(...parts)) // Add difference between highest and lowest values to cummulative total
    }, 0)
