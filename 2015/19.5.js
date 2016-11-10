module.exports = input => {
  const [reactionList, medicine] = input.split("\n\n")
  const reactions = reactionList
    .split("\n")
    .reduce((list, line) => {
      const [to, , from] = line.split(" ")
      list.push({from, to})
      return list
    }, [])
    .sort((a, b) => b.from.length = a.from.length)
    .concat({from: "e", to: ""})

  let moleculeString = medicine
  let steps = 0
  while (moleculeString !== "") {
    reactions.forEach(({from, to}) => {
      if(moleculeString.includes(from)) {
        moleculeString = moleculeString.replace(from, to)
        if(from !== "e") steps++
      }
    })
  }

  return steps
}
