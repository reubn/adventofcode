module.exports = input =>
  input.split("")
  .reduce((floor, instruction) => {
    if (instruction === "(") floor++;
    if (instruction === ")") floor--;
    return floor
  }, 0)
