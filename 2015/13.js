const permute = require("./util/permute")

module.exports = input => input.split("\n")
.reduce((guests, line) => {
  const parts = line
  .replace("gain ", "")
  .replace("lose ", "-")
  .split(" ")
  .map((part, index) => index === 2 ? parseInt(part, 10) : (index === 9 ? part.slice(0, -1) : part))
  const preOne = guests.find(guest => guest.name === parts[0])
  if (preOne) preOne.relations[parts[9]] = preOne.relations[parts[9]] ? preOne.relations[parts[9]] + parts[2] : parts[2]
  else guests.push({name: parts[0], relations: {[parts[9]]: parts[2]}})

  const preTwo = guests.find(guest => guest.name === parts[9])
  if (preTwo) preTwo.relations[parts[0]] = preTwo.relations[parts[0]] ? preTwo.relations[parts[0]] + parts[2] : parts[2]
  else guests.push({name: parts[9], relations: {[parts[0]]: parts[2]}})

  return guests
}, [])
 .reduce(permute, [])
 .map(seating => seating
   .reduce((store, seat) => ({happiness: store.happiness + seat.relations[store.last] || 0, last: seat.name}), {happiness: 0, last: seating.slice(0).pop().name}))
.sort((a, b) => b.happiness - a.happiness)[0].happiness
