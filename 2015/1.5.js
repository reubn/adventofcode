module.exports = input => {
  let floor = 0
  input.split("")
       .forEach((instruction, index) => {
         if (instruction === "(") floor++;
         if (instruction === ")") floor--;
         if (floor === -1) return index + 1
       })
}
