module.exports = input => input.split("\n")
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
      timeBeforeRest: parts[6],
      state: true
    }
  }
})
.map(reindeer => {
  for(var tick = 0; tick < 2503; tick++) {
    if(reindeer._.state) reindeer._.distance += reindeer.speed
    if (--reindeer._.timeBeforeRest === 0) {
      reindeer._.state = reindeer._.state ? false : true
      reindeer._.timeBeforeRest = reindeer._.state ? reindeer.flyFor : reindeer.restFor
    }
  }
  return reindeer._.distance
})
.sort((a, b) => b - a)[0]
