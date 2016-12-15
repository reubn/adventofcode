import crypto from 'crypto'

export default input => {
  const validKeys = []

  // Lookup for memoisation
  const lookup = new Map()
  const md5memo = stuff => {
    // If value has been precalulated - return it
    if(lookup.has(stuff)) return lookup.get(stuff)

    // Hash value
    let value = crypto.createHash('md5').update(stuff).digest('hex')

    // Then hash 2016 more times
    for(let iteration = 2016; iteration; iteration--) value = crypto.createHash('md5').update(value).digest('hex')

    // Add value to the lookup
    lookup.set(stuff, value)

    // Return Value
    return value
  }

  // While we do not yet have 64 keys
  for(let index = 0; validKeys.length !== 64; index++){
    // Hash secret and index
    const hash = md5memo(input + index)

    // Match to find 3 characters
    const [containsThree, letter]= /(.)\1\1/.exec(hash) || []

    // If we have 3 in a row
    if(containsThree){
      // Compute next 1000 hashes, starting from the next index
      for(let pairOffset = 1; pairOffset !== 1000; pairOffset++){
        // Hash secret and index
        const pairHash = md5memo(input + (index + pairOffset))

        // Match to find 3 of the current character
        const containsFive= new RegExp(`${letter}{5}`).exec(pairHash)

        // If we have 5 in a row
        if(containsFive){
          // Add to key list
          validKeys.push({index, hash, letter, pairHash, pairOffset, pairIndex: (index + pairOffset)})

          // Break inner loop
          break
        }
      }
    }
  }

  // Return index of 64th key
  return validKeys.pop().index
}
