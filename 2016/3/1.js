export default input =>
  input
  // Split input into lines
  .split('\n')
  // Filter out invalid triangles
  .filter(line => {
    const [sideOne, sideTwo, sideThree] =
    line
    // Split by whitespace
    .split(' ')
    // Remove empty strings from array due to splitting
    .filter(s => s)
    // Cast to integers
    .map(d => +d)
    // Order side lengths accendingly
    .sort((a, b) => a - b)

    // If the sum of the two smaller lengths is bigger than the larger side then we have a valid triangle
    return sideOne + sideTwo > sideThree
  })
  // Return number of valid triangles
  .length
