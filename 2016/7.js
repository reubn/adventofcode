const pattern = /(.)(.)\2\1/

export default input =>
  input
  // Split input into lines ioxxoj[asdfgh]zxcvbn
  .split('\n')
  // Filter to only ones that support TLS
  .filter(line => {
    const {h: hypernet, s: supernet} =
    line
    // Split by sequence type
    .split(/\[|]/)
    // Seperate into hypernet and supernet
    .reduce(({h, s}, section, index) => {
      // If index is odd then must be in the hypernet, so add it to the group
      if(index % 2) return {h: [...h, section], s}
      // Otherwise add to the supernet group
      return {h, s: [...s, section]}
    }, {h: [], s: []})

    // Join the sequence into one string
    const hypernetSequences = hypernet.join('|')

    // Run the regex, and get the letters matched
    const [hypernetValid, hypernetA, hypernetB] = pattern.exec(hypernetSequences) || []

    // If the match was found, and the letters are not the same e.g. `aaaa`, then skip
    if(hypernetValid && hypernetA !== hypernetB) return false

    // Join the sequence into one string
    const supernetSequences = supernet.join('|')

    // Run the regex, and get the letters matched
    const [supernetValid, supernetA, supernetB] = pattern.exec(supernetSequences) || []

    // If the match was found, and the letters are not the same e.g. `aaaa`, then return true
    if(supernetValid && supernetA !== supernetB) return true

    // If nothing matched, then return false
    return false
  })

  // Get the number of IPs that passed
  .length
