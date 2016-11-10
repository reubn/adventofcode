module.exports = input => {
  const distinctMolecules = new Set()
  const [reactionList, moleculeString] = input.split("\n\n")

  const reactions = reactionList
    .split("\n")
    .reduce((list, line) => {
      const [reactant, , product] = line.split(" ")
      if (list[reactant]) list[reactant].push(product)
      else list[reactant] = [product]
      return list
    }, {})

  const molecule = Object.keys(reactions)
    .reduce((formulaArray, reactant) => {
      return [].concat.apply([], formulaArray.map(formula => formula
        .split(reactant)
        .reduce((result, formulaPart, index) => {
          if (!!index) result.push(reactant)
          result.push(formulaPart)
          return result
        }, [])))
    }, [moleculeString])

  molecule
    .forEach((element, elementIndex) => {
      if (reactions[element]) {
        reactions[element]
          .forEach(product => distinctMolecules.add(molecule.map((reactant, reactantIndex) => reactantIndex === elementIndex ? product : reactant).join("")))
      }
    })

  return distinctMolecules.size
}
