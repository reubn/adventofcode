export default input => {
  const memory = input.split('\t').map(Number)
  const seen = new Map()
  let cycles = 0

  while(!seen.has(memory.join())){
    seen.set(memory.join(), seen.size)
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

  return cycles - seen.get(memory.join())
}
