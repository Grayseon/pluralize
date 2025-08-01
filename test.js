const { pluralize, s } = require("./index.js")

const notifications = 1
const antelopes = 5
const lunches = 2
const scarves = 4
const berries = 10

console.log(
  pluralize`you have ${notifications} notification${s} (this${s} notification${s} is${s} important), ${antelopes} antelope${s}, ${lunches} lunch${s}, ${berries} berry${s}, and ${scarves} scarf${s}. this${s} scarf${s} is${s} mine.`
)
