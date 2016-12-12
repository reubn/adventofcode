export default input => {
  // Initialise registers to 0, but initialise `c` to `1`
  const registers = {a: 0, b: 0, c: 1, d: 0}

  // Convert lines to instructions
  const instructions =
    input
    // Split input into lines
    .split('\n')
    // Convert line to instruction
    .map(line => {
      // Split by space
      const [command, x, y] = line.split(' ')

      // Create Instruction. If `x` is a number then cast it, otherwise leave it as a string
      return {command, x: Number.isInteger(+x) ? +x : x, y: Number.isInteger(+y) ? +y : y}
    })

  let position = 0

  // Until we reach the end of the instructions
  while(position < instructions.length){
    const {command, x, y} = instructions[position]

    // Copy `x` (either an integer or the value of a register) into register `y`
    if(command === 'cpy') registers[y] = Number.isInteger(x) ? x : registers[x]

    // Increase the value of register `x` by one
    if(command === 'inc') registers[x]++

    // Decrease the value of register `x` by one
    if(command === 'dec') registers[x]--

    // Jump to an instruction `y` away (positive means forward; negative means backward), but only if `x` is not zero
    if(command === 'jnz' && (Number.isInteger(x) ? x : registers[x] !== 0)) position += y

    // Otherwise increases teh position as usual
    else position++
  }

  // return the value of register `a`
  return registers.a
}
