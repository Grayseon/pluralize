const { pluralize, s } = require("./index.js")

const notifications = 1
const antelopes = 5
const lunches = 2
const scarves = 4

console.log(
  pluralize`you have ${notifications} notification${s}, ${antelopes} antelope${s}, ${lunches} lunch${s}, and ${scarves} scarf${s}. this${s} scarf${s} will come in handy soon!`
)
