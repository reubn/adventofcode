module.exports = input => {
  const reindeers = input.split("\n")
    .map(line => {
      const parts = line.split(" ")
        .map((part, index) => index === 3 || index === 6 || index === 13 ? parseInt(part, 10) : part)
      return {
        name: parts[0],
        speed: parts[3],
        flyFor: parts[6],
        restFor: parts[13],
        _: {
          distance: 0,
          score: 0,
          timeBeforeRest: parts[6],
          state: true
        }
      }
    })
  for (var tick = 0; tick < 2503; tick++) {
    reindeers.map(reindeer => {
      if (reindeer._.state) reindeer._.distance += reindeer.speed
      if (--reindeer._.timeBeforeRest === 0) {
        reindeer._.state = reindeer._.state ? false : true
        reindeer._.timeBeforeRest = reindeer._.state ? reindeer.flyFor : reindeer.restFor
      }
      return reindeer
    })
    .reduce((groups, reindeer) => {
      const search = groups.find(group => group[0]._.distance === reindeer._.distance)
      if(search) search.push(reindeer)
      else groups.push([reindeer])
      return groups
    }, [])
    .sort((a, b) => b[0]._.distance - a[0]._.distance)
    [0].forEach(reindeer => reindeer._.score++)
  }
  return reindeers.sort((a, b) => b._.score - a._.score)[0]._.score
}
