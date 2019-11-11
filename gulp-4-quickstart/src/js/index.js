const logA = require('./modules/cjs').logA
const readJson = require('../data/test')
logA()
console.log(readJson.firstName)
