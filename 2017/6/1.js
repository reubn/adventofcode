export default input => {
  const memory = input.split('\t').map(Number)
  const seen = new Set()
  let cycles = 0

  while(!seen.has(memory.join())){
    seen.add(memory.join())
    cycles++

    let {biggest, biggestIndex} = memory.reduce(({biggestIndex=0, biggest=-Infinity}, value, index) =>
      (value > biggest
        || (value === biggest
        && index < biggestIndex))
        ? {biggestIndex: index, biggest: value}
        : {biggestIndex, biggest}, {})

    memory[biggestIndex] = 0

    while(biggest){
      biggestIndex = (biggestIndex + 1) % memory.length

      memory[biggestIndex]++
      biggest--
    }
  }

  return cycles
}
