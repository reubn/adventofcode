module.exports = input => {
  let position = [0, 0]
  return Array.from(new Set(
    [position].concat(input.split(""))
    .map(move => {
      if (move === "^") position = [position[0], position[1] + 1]
      if (move === ">") position = [position[0] + 1, position[1]]
      if (move === "v") position = [position[0], position[1] - 1]
      if (move === "<") position = [position[0] - 1, position[1]]
      return position.join()
    }))).length
}
