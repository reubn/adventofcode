export default input => {
  const floors =
    input
    // Split input into lines
    .split('\n')
    // Count number of items on each floor
    .map(line => (line.match(/\sa\s/g) || []).length)

  // There are 4 extra items on the first floor
  floors[0] += 4

  let moves = 0
  let lowestFloor = 0

  // While all the items are not on the top floor
  while(floors[floors.length - 1] !== floors.reduce((a, b) => a + b, 0)){
    // It takes `2 * (n - 1) - 1` moves to move `n` items up a floor
    moves += (2 * (floors[lowestFloor] - 1)) - 1
    // Increase the item count of the floor above by the number of items on this floor - moving them
    floors[lowestFloor + 1] += floors[lowestFloor]

    // We have emptied this floor, so we can forget about it, therefore we set it to zero items
    floors[lowestFloor] = 0

    // and increase the lowest floor
    lowestFloor += 1
  }
  return moves
}
