export default input => {
  const stepsAhead = input.length / 2 // Calculate the number of positions ahead in the flat list
  let total = 0

  for(let position = 0; position < input.length; position++) // Loop over input
    if(input[position] === input[(position + stepsAhead) % input.length]) // If the current digit matches the 'digit halfway around'...
      total += +input[position] // ...add it to the total

  return total
}
