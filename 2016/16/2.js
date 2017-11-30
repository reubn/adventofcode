export default input => {
  const length = 35651584
  let data = [...input].map(bit => bit === '1')
  while(data.length < length) data = [...data, false, ...data.reverse().map(bit => !bit)]

  let checkSum = data.slice(0, length)
    console.log('DONE FP', checkSum.length)
  do{
    console.log(checkSum.length)
    checkSum = checkSum.reduce(([filling, ...otherPairs], bit) => {
      if(!filling) return [[bit], ...otherPairs]
      if(filling.length === 2) return [[bit], filling, ...otherPairs]
      return [[...filling, bit], ...otherPairs]
    }, [])
    .map(([a, b]) => a === b).reverse()
  } while(!(checkSum.length % 2))
  return checkSum.map(bit => bit ? 1 : 0).join``
}
