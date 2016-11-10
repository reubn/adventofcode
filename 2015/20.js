module.exports = input => {
  const houses = []
  for (let elf = 1; elf <= input / 10; elf++) {
    for (let house = elf; house < input / 10; house += elf)
      houses[house] = houses[house] ? houses[house] + elf * 10 : elf * 10
    if(houses[elf] >= input) return elf
  }
}
