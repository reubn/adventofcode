export default input =>
  input
  // Split input into lines
  .split('\n')
  // Filter to only ones that support SSL
  .filter(line => {
    const {aba: abaFinal, bab: babFinal} =
    line
    // Split by sequence type
    .split(/\[|]/)
    // Seperate into hypernet and supernet matches
    .reduce(({aba, bab}, sequence, index) => {
      // Regex to match Area-Broadcast Accessors and Byte Allocation Blocks
      const pattern = /(.)(.)\1/g

      // If index is odd then must be in the hypernet
      const hypernet = index % 2

      let matches

      //  While we have matches, rerun regex, but look two letters before, to catch overlaps
      while((matches = pattern.exec(sequence)) !== null && (pattern.lastIndex -= 2)){
        const [a, b] = matches

        // If letters are not the same e.g. `aaaa`
        if(a !== b) (hypernet ? bab : aba).push(matches[0])
      }

      // If nothing was found then return unmodified groups
      return {aba, bab}
    }, {aba: [], bab: []})

    // If some of the ABAs match some of the BABs then this IP supports SSL
    return abaFinal.some(([a, b]) => babFinal.includes(`${b}${a}${b}`))
  })

  // Get the number of IPs that passed
  .length
