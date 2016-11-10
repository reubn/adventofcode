module.exports = input => {
  const houses = [];
  for (let elf = 1; elf <= input / 10; elf++) {
    for (let house = elf, elfDone = 0; house <= input / 10 && elfDone < 50; house += elf, elfDone++)
      houses[house] = houses[house] ? houses[house] + elf * 11 : elf * 11
    if(houses[elf] >= input) return elf
  }
}
