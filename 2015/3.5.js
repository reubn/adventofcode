module.exports = input => {
  const startingPosition = [0, 0]
  const instructions = [[], []]
  input.split("").forEach((move, index) => instructions[index % 2].push(move))

  return Array.from(new Set([].concat.apply(["0,0"],
    instructions.map(deliverer => {
      let position = startingPosition.slice()
      return deliverer.map(move => {
        if (move === "^") position = [position[0], position[1] + 1]
        if (move === ">") position = [position[0] + 1, position[1]]
        if (move === "v") position = [position[0], position[1] - 1]
        if (move === "<") position = [position[0] - 1, position[1]]
        return position.join()
      })
    })
  ))).length
}
