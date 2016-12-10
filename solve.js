const fs = require('fs')

const file = process.argv[2]
const input = process.argv[3] || fs.readFileSync(`./${file.split('/').slice(0, 2).join('/')}/input`, 'utf8').trim()

const functionToRun = require(`./${file}`).default || require(`./${file}`)

const before = process.hrtime()
const answer = functionToRun(input)
const [seconds, nanoseconds] = process.hrtime(before)

console.log(answer)
console.info(`🎄  Solved in ${((seconds * 1e3) + (nanoseconds * 1e-6)).toFixed(2)}ms `)
