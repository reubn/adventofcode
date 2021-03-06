export default input => {
  /* Keypad layout in indexed by y, then x
     e.g.       1
              2 3 4
            5 6 7 8 9   =>   [[0, 0, 'D', 0, 0], [0, 'A', 'B', 'C', 0], [5, 6, 7, 8, 9], [0, 2, 3, 4, 0], [0, 0, 1, 0, 0]]
              A B C
                D
  */
  const keyPad = [[0, 0, 'D', 0, 0], [0, 'A', 'B', 'C', 0], [5, 6, 7, 8, 9], [0, 2, 3, 4, 0], [0, 0, 1, 0, 0]]

  const {code: endCode} =
  // Split input into lines
  input.split('\n')
  // Interpret instruction
  .reduce(({code: startingCode, coordinates: startingCoordinates}, [...directions]) => {
    // Loop over directions contained in instruction
    const {x: digitX, y: digitY} = directions.reduce(({x, y}, direction) => {
      // Look up direction and calculate the new coordinates appropriately
      const {x: newX, y: newY} = ({
        U: {x, y: y + 1},
        D: {x, y: y - 1},
        L: {x: x - 1, y},
        R: {x: x + 1, y}
      })[direction]

      // Check if there is a digit at the new coordinates. If there is then return the coordinates, otherwise return the previous coordinates (as if this letter has been ignored)
      return keyPad[newY] && keyPad[newY][newX] ? {x: newX, y: newY}: {x, y}
    }, startingCoordinates)

    // Append the resulting digit from this line to the code, and also return the current coordinates
    return {code: startingCode + keyPad[digitY][digitX], coordinates: {x: digitX, y: digitY}}
  }, {code: '', coordinates: {x: 0, y: 2}})

  return endCode
}
