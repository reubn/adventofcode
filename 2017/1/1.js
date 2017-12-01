export default input => {
  // Split into Array
  const array = input.split('')

  // If number is equal to previous number, add number to cummulative total, assign `previous` to each number, ready for next element
  return array.reduce(({previous, total}, number) => ({previous: number, total: number === previous ? total + (+number) : total}), {previous: array[array.length-1], total: 0}).total
}
