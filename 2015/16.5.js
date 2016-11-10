module.exports = input => input.split("\n")
  .map(line => line.split(" ")
    .map((part, index, parts) => {
      if (!!index && index !== parts.length - 1) part = part.slice(0, -1)
      if (index % 2 !== 0) part = parseInt(part, 10)
      return part
    })
    .reduce((profile, current, index, parts) => {
      if (Object.prototype.toString.call(current) === "[object String]") {
        if (current !== "Sue") profile.props[current] = parts[index + 1]
        else profile.number = parts[index + 1]
      }
      return profile
    }, {
      props: {}
    }))
  .find(profile => {
    const aunty = {
      children: 3,
      cats: value => value > 7,
      samoyeds: 2,
      pomeranians: value => value < 3,
      akitas: 0,
      vizslas: 0,
      goldfish: value => value < 5,
      trees: value => value > 3,
      cars: 2,
      perfumes: 1
    }
    return Object.keys(profile.props).every(key => (Object.prototype.toString.call(aunty[key]) === "[object Function]" ? aunty[key] : value => value === aunty[key])(profile.props[key]))
  }).number
