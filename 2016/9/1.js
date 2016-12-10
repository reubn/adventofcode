export default input => {
  let length = 0

  // While there are still characters in the data
  while(input.length){
    // If we have not found a marker
    if(!input.startsWith('(')){
      // Increase the length of the decompressed data
      length += 1

      // Remove the affected data from the string
      input = input.substring(1)
    } else {
      // Otherwise, we must have a marker

      // Extract the marker from the data
      const marker = input.substring(0, input.indexOf(')') + 1)

      // Extract the reach of the marker and the number of times to repeat the string
      const [reach, times] = marker.slice(1, -1).split('x')

      // Increase the length of the decompressed data by the react multiplied by the number of times to repeat the region
      length += reach * times

      // Remove the affected data from the string
      input = input.substring(marker.length + +reach)
    }
  }

  return length
}
