module.exports = input => input
    .split("\n")
    .map(line => line.match(/(t.+?)\s(\d+?),(\d+?)\sthrough\s(\d+?),(\d+)/).map((value, index) => index > 1 ? parseInt(value, 10) : value))
    .map(inst => {
      return {
        operation: inst[1],
        start: {
          x: Math.min(inst[2], inst[4]),
          y: Math.min(inst[3], inst[5])
        },
        end: {
          x: Math.max(inst[2], inst[4]),
          y: Math.max(inst[3], inst[5])
        }
      }
    })
    .reduce((grid, block) => {
      for (let x = block.start.x; x <= block.end.x; x++) {
        for (let y = block.start.y; y <= block.end.y; y++) {
          if (grid[x] === undefined) grid[x] = [];
          if (grid[x][y] === undefined) grid[x][y] = 0;

          if (block.operation === "turn on") grid[x][y] = 1
          if (block.operation === "turn off") grid[x][y] = 0
          if (block.operation === "toggle") grid[x][y] ^= 1
        }
      }
      return grid
    }, [])
    .reduce((numberOn, x) => numberOn + x.filter(l => !!l).length, 0)
