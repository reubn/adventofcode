export default input => {
  const array = input.split('\n')
  let position = 0
  let steps = 0

  while(position < array.length){
    const current = +array[position]

    if(current >= 3) array[position]--
    else array[position]++

    position += current
    steps++
  }

  return steps
}
