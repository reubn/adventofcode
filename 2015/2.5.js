module.exports = input => input.split("\n")
    .map(present => {
      const dimensions = present
        .split("x")
        .map(s => parseInt(s, 10))
        .sort((a, b) => a - b)

      const l = dimensions[0]
      const w = dimensions[1]
      const h = dimensions[2]

      return (2*(l+w) + (l*w*h))
    })
    .reduce((a, b) => a + b)
