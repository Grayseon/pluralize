import { pluralize, s } from "./index.js"

const notifications = 1
const antelopes = 5
const lunches = 2

console.log(pluralize`you have ${notifications} notification${s}, ${antelopes} antelope${s}, and ${lunches} lunch${s}.`)