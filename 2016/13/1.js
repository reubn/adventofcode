export default input => {
  // Coordinates were trying to reach
  const {x: goalX, y: goalY} = {x: 31, y: 39}

  // Possible direction deltas you can move in
  const directions = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}]

  /* Is a coordinate an open space or a wall
     Calculate using `x*x + 3*x + 2*x*y + y + y*y` formula
     Convert to binary
     Split into array
     Count `1`s
     Even or Odd
     Negate
  */
  const isOpen = ({x, y}) => !(((x**2) + (3*x) + (2*x*y) + y + (y**2) + +input).toString(2).split('').reduce((popcount, bit) => popcount + +bit, 0) % 2)

  // Coordinates visited
  const visited = new Map()

  // Prime moves with 1, 1 move
  let moves = [{x: 1, y: 1, cumulativeSteps: 0}]

  // Shortest route to goal
  let shortest = Infinity

  // While we have moves left to try
  while(moves.length){
    // Remove current move from list
    const {x: currentX, y: currentY, cumulativeSteps} = moves.pop()

    // If we are at the goal coordinates and this route is shorter than the current shortest route, set the shortest to this route length
    if(currentX === goalX && currentY === goalY && shortest > cumulativeSteps) shortest = cumulativeSteps
    else {
      // Add the current coordinates to the map
      visited.set(`${currentX},${currentY}`, cumulativeSteps)

      // Add new possible moves to list
      moves = directions.reduce((goodMoves, {x: directionX, y: directionY}) => {
        // Calculate new coordinates
        const {x: newX, y: newY, cumulativeSteps: newCumulativeSteps} = {x: currentX + directionX, y: currentY + directionY, cumulativeSteps: cumulativeSteps + 1}

        // Negative Space is not allowed
        const notNegative = newX > -1 && newY > -1

        // Is this a untried coordinate, or is it worth backtracking along previously visited coordinates
        const isWorthMovingTo = !(visited.has(`${newX},${newY}`) && visited.get(`${newX},${newY}`) <= newCumulativeSteps)

        // Are the new coordinates a good choice, if so add them to the moves array
        if(isOpen({x: newX, y: newY}) && notNegative && isWorthMovingTo) return [...goodMoves, {x: newX, y: newY, cumulativeSteps: newCumulativeSteps}]

        // Otherwise return unmodified array
        return goodMoves
      }, moves)
    }
  }

  // Return shortest path length
  return shortest
}
