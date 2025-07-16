import { pluralize, s } from "./index.js"

const notifications = 1
const antelopes = 5

console.log(pluralize`you have ${notifications} notification${s} and ${antelopes} antelope${s}.`)