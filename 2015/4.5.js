const md5 = require("./util/md5")

module.exports = input => {
  let answer = false
  let number = 1

  while (answer === false) {
    if (md5(`${input}${number}`).startsWith("000000")) answer = number
    number++
  }
  return answer
}
