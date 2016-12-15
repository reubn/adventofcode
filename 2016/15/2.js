export default input => {
  let discs = input
  // Split input into lines
  .split('\n')
  // Convert to disc
  .map(line => {
    const [, total, start] = /has (\d+) positions; at time=\d+, it is at position (\d+)/.exec(line)
    return {total, start: +start}
  })
  // Add extra line
  .concat([{total: 11, start: 0, position: 0}])

  // Just need something to increment, can seemingly be any integer....strange
  let time = 160589
  // While not every disc is in position `0`
  while(!discs.every(({position=1}) => !position)){
    // Increment time
    time++

    // Increase position of discs each 'tick'
    discs = discs.map(({total, start, position=start}, index) => ({total, start, position: (start + time + index) % total}))
  }

  // return time. Minus 1 as check occurs after increment
  return time - 1
}
