module.exports = input =>
input.split("\n")
    .map(present => {
      const dimensions = present
        .split("x")
        .map(s => parseInt(s, 10))
        .sort((a, b) => a - b)

      const l = dimensions[0]
      const w = dimensions[1]
      const h = dimensions[2]

      return (3*l*w + 2*w*h + 2*h*l)
    })
    .reduce((a, b) => a + b)
