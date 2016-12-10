export default input => {
  const factory = {}
  const transfers =
    input
    // Split input into lines
    .split('\n')
    // Filter down to transfer instructions
    .reduce((transferList, line) => {
      // If this is a `value` instruction
      if(line.startsWith('v')){
        // Extract `value` and `location` from the line
        const [value, location] = line.substring(6).split(' goes to ')

        // If the location preexists, apend this value to it, otherwise create the location and populate with this value
        factory[location] = [...factory[location] || [], +value]

        // Return the unmodified transferList, as this is not a transfer
        return transferList
      }

      // Extract parameters from the line
      const [, location, lowLocation, highLocation] = /(.+?) gives low to (.+?) and high to (.+)/.exec(line)

      // Append the transfer instruction to the list
      return [...transferList, {location, lowLocation, highLocation}]
    }, [])

  let transferPosition = 0

  // While there are still transfers remaining
  while(transfers.length){
    // Get transfer parameters
    const {location, highLocation, lowLocation} = transfers[transferPosition]

    // Find loction in the factory, or assume it is empty
    const locationValues = factory[location] || []

    // If the location has both its values
    if(locationValues.length === 2){
      // Sort the values to get the low and the high values
      const [low, high] = locationValues.sort((a, b) => a - b)

      // Move the values to their destinations, if the destination does not exist, create it
      factory[highLocation] = [...factory[highLocation] || [], high]
      factory[lowLocation] = [...factory[lowLocation] || [], low]

      // Remove this location as it has already ran
      delete factory[location]

      // Remove the transfer instruction
      transfers.splice(transferPosition, 1)
    }

    // Move to the next transfer instruction. If we reach the end of the array, start back at the beginning
    transferPosition = (transferPosition + 1) % transfers.length
  }

  // Multiply the first 3 outputs first values together in order to solve the challenge
  return factory['output 0'][0] * factory['output 1'][0] * factory['output 2'][0]
}
