const sumToValue = require("./util/sumToValue")
const shop = require("./util/shop")

module.exports = input => {
  const [hitPoints, damage, armor] = input.split("\n").map(line => +line.split(" ").pop())

  for(let cost = 356; cost > 0; cost--) {
    let weLoose = sumToValue(shop, cost, item => item.cost ? item.cost : item)
    .filter(inventory =>
       inventory.filter(item => item.type === "weapon").length === 1
    && inventory.filter(item => item.type === "armor").length <= 1
    && inventory.filter(item => item.type === "ring").length <= 2)
    .some(inventory => {
      const meInBattle = inventory.reduce((sums, item) => {sums.damage += item.damage; sums.armor += item.armor; return sums}, {hitPoints: 100, damage: 0, armor: 0})
      const bossInBattle = {hitPoints, damage, armor}

      let round = 0
      while (bossInBattle.hitPoints > 0 && meInBattle.hitPoints > 0) {
        if(round % 2 === 0) bossInBattle.hitPoints += bossInBattle.armor - meInBattle.damage || -1
        else meInBattle.hitPoints += meInBattle.armor - bossInBattle.damage || -1
        round++
      }
      if(meInBattle.hitPoints <= 0) return true
    })
    if(weLoose) return cost
  }
}
