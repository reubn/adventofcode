export default input => {
  const {x: endX, y: endY} =
  // Split into instructions
  input.split(', ')
  // Interpret instruction
  .reduce(({x, y, direction: startingDirection}, [leftOrRight, ...distanceDigits]) => {
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

    // Depending on newDirection, increase x and y to get new coordinates
    if(newDirection === 0) return {x, y: y + distance, direction: newDirection}
    if(newDirection === 1) return {x: x + distance, y, direction: newDirection}
    if(newDirection === 2) return {x, y: y - distance, direction: newDirection}

    return {x: x - distance, y, direction: newDirection}
  }, {x: 0, y: 0, direction: 0})

  // Return the number of along movements, plus the number of up-down movements
  return Math.abs(endX) + Math.abs(endY)
}
