module.exports = input => {
  let grid = input.split("\n").map(line => line.split("").map(char => (char === "#") ? true : false))
  const neighbours = [{y: -1, x: -1}, {y: -1, x: 0}, {y: -1, x: 1}, {y: 0, x: -1}, {y: 0, x: 1}, {y: 1, x: -1}, {y: 1, x: 0}, {y: 1, x: 1}]
  const corners = [{y: 0, x: 0}, {y: 0, x: grid.length - 1}, {y: grid.length - 1, x: 0}, {y: grid.length - 1, x: grid.length - 1}]
  corners.forEach(corner => grid[corner.y][corner.x] = true)

  for (let i = 0; i < 100; i++) {
    let newGrid = grid.map(row => row.slice())
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (corners.every(corner => !(corner.x === x && corner.y === y))) {
          let neighboursOn = neighbours.reduce((sum, neighbour) => sum + (grid[y + neighbour.y] ? (grid[y + neighbour.y][x + neighbour.x] ? 1 : 0) : 0), 0)
          if (grid[y][x]) {
            if (neighboursOn !== 3 && neighboursOn !== 2) newGrid[y][x] = false
          } else if (neighboursOn === 3) newGrid[y][x] = true
        }
      }
    }
    grid = newGrid
  }
  return grid.reduce((total, row) => total + row.reduce((sum, light) => sum + (light ? 1 : 0), 0), 0)
}
