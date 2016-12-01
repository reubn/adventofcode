export default input => {
  const {x: endX, y: endY} =
  // Split into instructions
  input.split(', ')
  // Interpret instruction
  .reduce(({x, y, direction: startingDirection}, [leftOrRight, ...distanceDigits]) => {
    //  Join digits and cast
    const distance = +distanceDigits.join``

    // Translate Left or Right into NSEW delta. Left is -1; Right is 1
    const directionDelta = leftOrRight === 'L' ? -1 : 1

    /* Combine delta with previous direction
       `delta + 4` deals turns negative to positive, e.g. -1 + 4 = 3
       `startingDirection + positiveDelta` adds delta to current direction, e.g. 1 + 3 = 4
       `unboundDirection % 4` bounds between 0-4 (NSEW), e.g. 4 % 4 = 0
    */
    const newDirection = (startingDirection + directionDelta + 4) % 4

    /* If newDirection is South or West (`newDirection > 1`) then we will be moving negatively along the grid
       Combine this sign with the distance to be moved
    */
    const signedDistance = newDirection > 1 ? -1 : 1 * distance

    /* Determine which axis will be affected with `newDirection % 2`. If newDirection is North or South, then we are affecting the y-axis; West or East, the x-axis
       Mask distances: i.e. if we are not affecting the axis, set it delta to 0, otherwise set its delta to the signedDistance
    */
    const {x: xDelta, y: yDelta} = newDirection % 2 ? {x: signedDistance, y: 0} : {x: 0, y: signedDistance}

    // Return combined deltas along with the current direction
    return {x: x + xDelta, y: y + yDelta, direction: newDirection}
  }, {x: 0, y: 0, direction: 0})

  // Return the number of along movements, plus the number of up-down movements (Manhatten Distance)
  return Math.abs(endX) + Math.abs(endY)
}
