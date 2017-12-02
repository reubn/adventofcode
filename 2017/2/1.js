export default input => {
  const lines = input.split('\n')

  let sum = 0

  for(let lineIndex = 0; lineIndex < lines.length; lineIndex++){
    const line = lines[lineIndex]
    const parts = line.split(/\s/)

    let highest = -Infinity
    let lowest = Infinity

    for(let partIndex = 0; partIndex < parts.length; partIndex++){
      const part = parts[partIndex]

      if(!part) break

      const cast = +part

      if(cast < lowest) lowest = cast
      if(cast > highest) highest = cast
    }

    sum += highest - lowest
  }

  return sum
}
