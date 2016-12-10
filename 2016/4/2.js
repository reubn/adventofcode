export default input =>
  // Split input into lines
  input.split('\n')
  .reduce((answer, line) => {
    // If we have already found the sector id, then skip
    if(answer) return answer

    /* Split line into the two main parts: the sector id and check sum, and the encrypted name
       We reverse the array to take advantage of the rest parameters, which can only be the last item
    */
    const [sectorIdAndCheckSum, ...nameParts] = line.split('-').reverse()

    // Destructure out the sector id
    const [sectorId] = sectorIdAndCheckSum.split('[')

    // Flattern array, while also reversing back to the right order
    const encryptedName = nameParts.reduce((array, part) => [...part, ...array], [])

    /* Decrypt the encrypted name
       1. Loop over letters in string
       2. Get charCode of letter, cast sectorId to integer, rotate by `sectorId` number of spaces, translate back into letter (`26` is number of characters in alphabet; `97` is charCode of `a`)
       3. Join back into string
    */
    const name = encryptedName.map(l => String.fromCharCode(97 + ((+sectorId + (l.charCodeAt(0) - 97)) % 26))).join``

    // If the name equals the name of 'the room where North Pole objects are stored' then return sectorId
    return name === 'northpoleobjectstorage' ? sectorId : false
  }, false)
