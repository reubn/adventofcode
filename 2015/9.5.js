const permute = require("./util/permute")

module.exports = input => input
  .split("\n")
    .reduce((list, line) => {
      const parts = line.split(" ").map((part, index) => index === 4 ? parseInt(part, 10) : part)
      const preOne = list.find(obj => obj.name === parts[0])
      if (preOne) preOne[parts[2]] = parts[4]
      else list.push({name: parts[0], [parts[2]]: parts[4]})

      const preTwo = list.find(obj => obj.name === parts[2])
      if (preTwo) preTwo[parts[0]] = parts[4]
      else list.push({name: parts[2], [parts[0]]: parts[4]})

      return list
    }, [])
    .reduce(permute, [])
    .map(perm => perm.reduce((store, place) => ({count: store.count + place[store.last] || 0, last: place.name}), {count: 0, last: null}))
    .sort((a, b) => b.count - a.count)[0].count
