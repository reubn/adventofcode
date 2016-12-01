export default input => {
  const {x: endX, y: endY} =
  // Split into instructions
  input.split(', ')
  // Interpret instruction
  .reduce(({x, y, direction: startingDirection, visited}, [leftOrRight, ...distanceDigits]) => {
    // If we have already found duplicate then we can skip all further processing
    if(!visited) return {x, y, visited: null}

    //  Join digits and cast
    const distance = +distanceDigits.join``

    // Translate Left or Right into NSEW delta
    const directionDelta = leftOrRight === 'L' ? -1 : 1

    /* Combine delta with previous direction
       `delta + 4` deals turns negative to positive, e.g. 1 + 4 = 5
       `startingDirection + positiveDelta` adds delta to current direction, e.g. 1 + 5 = 6
       `unboundDirection % 4` bounds between 0-4 (NSEW), e.g. 6 % 4 = 2
    */
    const newDirection = (startingDirection + directionDelta + 4) % 4

    // Depending on newDirection, increase x and y to get new coordinates. Also if we are moving negatively on the grid (S or W), then set blockSize to -1
    let newCoordinates = {x, y: y + distance}
    if(newDirection === 1) newCoordinates = {x: x + distance, y}
    else if(newDirection === 2) newCoordinates = {x, y: y - distance, blockSize: -1}
    else if(newDirection === 3) newCoordinates = {x: x - distance, y, blockSize: -1}

    const {x: newX, y: newY, blockSize=1} = newCoordinates

    // Which axis are we moving along?
    if(newX !== x){
      // Moving along the x-axis
      // For each block between start and end positions
      for(let p = x; p !== newX; p+=blockSize){
        const visitedCheckString = `${p},${y}`

        // If we have found duplicate then skip, otherwise check if we have arrived at a duplicate
        if(!visited || visited.has(visitedCheckString)) return {x: p, y, visited: null}

        // We havent found a duplicate, so add these coordinates to the set
        visited.add(visitedCheckString)
      }
    } else {
      // Moving along the y-axis
      // For each block between start and end positions
      for(let p = y; p !== newY; p+=blockSize){
        const visitedCheckString = `${x},${p}`

        // If we have found duplicate then skip, otherwise check if we have arrived at a duplicate
        if(!visited || visited.has(visitedCheckString)) return {x, y: p, visited: null}

        // We havent found a duplicate, so add these coordinates to the set
        visited.add(visitedCheckString)
      }
    }

    return {x: newX, y: newY, direction: newDirection, visited}
  }, {x: 0, y: 0, direction: 0, visited: new Set([])})

  // Return the number of along movements, plus the number of up-down movements
  return Math.abs(endX) + Math.abs(endY)
}
