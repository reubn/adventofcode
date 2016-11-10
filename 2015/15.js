module.exports = input => {
  const ingredients = input.split("\n")
.map(line => {
  const parts = line.split(" ")
  .map((part, index) => {
    if(index % 2 === 0) {
      if(index !== 10) part = part.slice(0, -1)
      if(!!index) part = parseInt(part, 10)
    }
    return part
  })
  return {
    name: parts[0],
    capacity: parts[2],
    durability: parts[4],
    flavor: parts[6],
    texture: parts[8]
  }
})
  let highestScore = 0;
  for (let firstAmount = 0; firstAmount <= 100; firstAmount++)
    for (let secondAmount = 0; secondAmount <= 100 - firstAmount; secondAmount++)
      for (let thirdAmount = 0; thirdAmount <= 100 - firstAmount - secondAmount; thirdAmount++) {
        let amounts = [firstAmount, secondAmount, thirdAmount, 100 - firstAmount - secondAmount - thirdAmount]

        let totals = ["capacity", "durability", "flavor", "texture"]
        .map(property => ingredients
          .reduce((sum, ingredient, index) => sum + ingredient[property] * amounts[index], 0))

        if(totals.every(total => total > 0)) {
          let score = totals.reduce((product, total) => product * total, 1)
          if(highestScore < score) highestScore = score
        }
      }
  return highestScore
}
