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

    // If newDirection is South or West (`newDirection > 1`) then we will be moving negatively along the grid
    const movementSign = newDirection > 1 ? -1 : 1

    // Combine this sign with the distance to be moved
    const signedDistance = movementSign * distance

    /* Determine which axis will be affected with `newDirection % 2`. If newDirection is North or South, then we are affecting the y-axis; West or East, the x-axis
       `true` means that the x-axis will be affected, `false` means that the y-axis will be affected
    */
    const axisAffected = newDirection % 2

    // Mask distances: i.e. if we are not affecting the axis, set it delta to 0, otherwise set its delta to the signedDistance
    const {x: xDelta, y: yDelta} = axisAffected ? {x: signedDistance, y: 0} : {x: 0, y: signedDistance}

    // Combine deltas
    const {x: newX, y: newY} = {x: x + xDelta, y: y + yDelta}

    const startCoordinate = axisAffected ? x : y
    const endCoordinate = axisAffected ? newX : newY

    // For each block between start and end coordinates, move, and check if we have already been here
    for(let p = startCoordinate; p !== endCoordinate; p+=movementSign){
      // Construct check string
      const checkString = axisAffected ? `${p},${y}` : `${x},${p}`

      // If we have already found duplicate then skip, otherwise check if we have arrived at a duplicate. If we have, return coordinates and set visited to null
      if(!visited || visited.has(checkString)) return {...(axisAffected ? {x: p, y} : {x, y: p}), visited: null}

      // We haven't found a duplicate, so add these coordinates to the set
      visited.add(checkString)
    }

    return {x: newX, y: newY, direction: newDirection, visited}
  }, {x: 0, y: 0, direction: 0, visited: new Set([])})

  // Return the number of along movements, plus the number of up-down movements (Manhatten Distance)
  return Math.abs(endX) + Math.abs(endY)
}
