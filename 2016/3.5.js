export default input =>
  input
  // Split input into lines
  .split('\n')
  // Group 3-long columns into arrays
  .reduce((columns, line) => {
    line
    // Split by whitespace
    .split(' ')
    // Remove empty strings from array due to splitting
    .filter(s => s)
    // Cast to integers
    .map(d => +d)
    // Place side length into correct triangle
    .forEach((d, i) => {
      // If the current triangle is full then create new triangle
      if(columns[i][columns[i].length - 1].length === 3) columns[i].push([d])
      // Otherwise, add the side length to the triangle
      else columns[i][columns[i].length - 1].push(d)
    })

    return columns
  }, [[[]], [[]], [[]]])
  // Flatten arrays of triangles
  .reduce((flat, group) => [...flat, ...group], [])
  // Sort side lengths accendingly
  .map(group => group.sort((a, b) => a - b))
  // Filter out invalid triangles. If the sum of the two smaller lengths is bigger than the larger side then we have a valid triangle
  .filter(([sideOne, sideTwo, sideThree]) => sideOne + sideTwo > sideThree)
  // Return number of valid triangles
  .length
