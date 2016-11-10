module.exports = (input, a=0) => {
  let pointer = 0;
  const registers = {a: a, b: 0}
  const instructions = input
    .split("\n")
    .map(line => line.split(" ").map((value, index, {length}) => (length === 2 ? [value, +value || value] : [value, value.slice(0, -1), +value])[index]))
  const commands = {
    hlf: register => registers[register] /= 2,
    tpl: register => registers[register] *= 3,
    inc: register => registers[register] += 1,
    jmp: offset => offset,
    jie: (register, offset) => !(registers[register] % 2) ? offset : 1,
    jio: (register, offset) => registers[register] === 1 ? offset : 1
  }
  do {
    let [command, register, offset] = instructions[pointer]
    let execution = commands[command](register, offset);
    pointer += (command[0] === "j" ? execution : 1)
  } while (pointer < instructions.length)
  return registers.b
}
