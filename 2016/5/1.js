import crypto from 'crypto'

export default doorID => {
  // Set code as empty string
  let code = ''

  // While the code length is less than 8, increase number and try to find hash again
  for(let number = 0; code.length !== 8; number++){
    // Hash the door ID and the interation, and output as a hex string
    const hash = crypto.createHash('md5').update(doorID + number).digest('hex')

    // If the hash begins with 5 0's, then add the 6th digit to the code
    if(hash.startsWith('00000')) code += hash[5]
  }

  // Return the code
  return code
}
