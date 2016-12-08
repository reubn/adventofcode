// Define width and height of the screen
const width = 50
const height = 6

// Generate screen filled with `0`s We fill then map to avoid inadvertantly chnaging other pixels, as the filled values will all be linked
const display = Array(height).fill(0).map(() => Array(width).fill(false))

// turn on all of the pixels in a rectangle at the top-left of the screen which is `w` wide and `h` tall.
const rect = (screen, instruction) => {
  // Split into the two parameters
  const [w, h] = instruction.split('x')

  // Iterate over all pixels affected by the change, and turn them on
  for(let x = 0; x < w; x++) for(let y = 0; y < h; y++) screen[y][x] = true

  return screen
}

// shift all of the pixels in row `row` (0 is the top row) right by `amount` pixels. Pixels that would fall off the right end appear at the left end of the row.
const rowRotate = (screen, instruction) => {
  // Remove first two characters in order to remove `y=`, then split into the two parameters
  const [row, amount] = instruction.substring(2).split(' by ')

  // Move the end element to the front `amount` times
  for(let shift = 0; shift < amount; shift++){
    screen[row].unshift(screen[row].pop())
  }

  return screen
}

// shift all of the pixels in column `column` (0 is the left column) down by `amount` pixels. Pixels that would fall off the bottom appear at the top of the column.
const columnRotate = (screen, instruction) => {
  // Remove first two characters in order to remove `x=`, then split into the two parameters
  const [column, amount] = instruction.substring(2).split(' by ')

  // Construct an array of all the pixels in the column
  const projection = screen.map(row => row[column])

  // Move the end element to the front `amount` times
  for(let shift = 0; shift < amount; shift++){
    projection.unshift(projection.pop())
  }

  // Replace the affected pixels with their new values
  return screen.map((row, index) => {
    row[column] = projection[index]
    return row
  })
}

export default input =>
input
// Split input into lines ioxxoj[asdfgh]zxcvb
.split('\n')
// Apply various operations to the screen
.reduce((screen, line) => {
  /* rect AxB
      ^
  */
  if(line[1] === 'e') return rect(screen, line.split(' ')[1])

  /* rotate row y=A by B
            ^
  */
  if(line[7] === 'r') return rowRotate(screen, line.split('w ')[1])

  // Otherwise must be a column rotate
  return columnRotate(screen, line.split('n ')[1])
}, display)
// Add up turned-on pixels
.reduce((sum, row) => sum + row.filter(pixel => pixel).length, 0)
