const { pluralize, s, and } = require("@grayseon/pluralize")

const notifications = 1
const antelopes = 5
const lunches = 2
const scarves = 4
const berries = 10
const things = ["i am tired"]
const animals = ["cat", "dog", "tiger"]

console.log(
  pluralize`you have ${notifications} notification${s} (this${s} notification${s} is${s} important), ${antelopes} antelope${s}, ${lunches} lunch${s}, ${berries} berry${s}, and ${scarves} scarf${s}. this${s} scarf${s} is${s} mine. ${things.length} more thing${s}: ${things.join(", ")}.
i will now proceed to list ${animals.length} animal${s}: ${and(animals)}`,
)
