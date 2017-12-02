export default input => {
  const lines = input.split('\n')

  let sum = 0

  for(let lineIndex = 0; lineIndex < lines.length; lineIndex++){
    const line = lines[lineIndex]
    const parts = line.split(/\s/).reduce((array, part) => part ? [...array, +part] : array, []).sort((a, b) => b - a)

    let lineResult = 0

    for(let partBiggerIndex = 0; partBiggerIndex < parts.length; partBiggerIndex++){
      const biggerPart = parts[partBiggerIndex]

      for(let partSmallerIndex = parts.length - 1; partSmallerIndex > partBiggerIndex; partSmallerIndex--){
        const smallerPart = parts[partSmallerIndex]

        if(!(biggerPart % smallerPart)){
          lineResult = biggerPart / smallerPart
          break
        }
      }
      if(lineResult) break
    }
    sum += lineResult
  }

  return sum
}
