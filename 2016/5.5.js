import crypto from 'crypto'

export default doorID => {
  // Create and array with 8 0's in it
  const code = Array(8).fill(0)

  // While there are no empty spaces in the code, increase number and try to find hash again
  for(let number = 0; code.includes(0); number++){
    // Hash the door ID and the interation, and output as a hex string
    const hash = crypto.createHash('md5').update(doorID + number).digest('hex')

    // If the hash begins with 5 0's, the position given by the hash is valid, and we have no already found a digit for that position; add the 7th digit to the code, in the position specified
    if(hash.startsWith('00000') && hash[5] < 8 && !code[hash[5]]) code[hash[5]] = hash[6]
  }

  // Join the array together to for a string
  return code.join``
}
