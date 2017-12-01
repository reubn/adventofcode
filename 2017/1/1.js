export default input => {
  let total = 0

  for(let position = 0; position < input.length; position++) // Loop over input
    if(input[position] === input[(position + 1) % input.length]) // If the current digit matches the next digit (wrap around for the last digit)...
      total += +input[position] // ...add it to the total, casting to number

  return total
}
