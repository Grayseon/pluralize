# Pluralize

Make pluralizing English words waaay simpler. No more hard "check(s)" or `"challenge"+(challenges.length === 1 ? "" : "s")`!

## Simple usage

```javascript
import { pluralize, s } from "@grayseon/pluralize"
// or const { pluralize, s } = require("@grayseon/pluralize")

let notifications = 5
console.log(pluralize`You have ${notifications} notification${s}.`)
            ^ tag                ^ any number                 ^ where the "s" would go
// You have 5 notifications.

notifications = 1
console.log(pluralize`You now have ${notifications} notification${s}.`)
// You have 1 notification.
```

## Rare cases

Pluralize will respect irregular plurals, like "scarfs" being "scarves".

```javascript
///...
const scarves = 3

console.log(pluralize`There are ${scarves} scarf${s}.`)
// There are 3 scarves.
```

You can chain as many plural modifiers as you want. It will only be reset once another number is specified.

```javascript
///...
const scarves = 3
const notifications = 1

console.log(pluralize`There are ${scarves} scarf${s}. (This${s} scarf${s} is${s} mine.) You have ${notifications} notification${s}. (This${s} notification${s} is${s} important.)`)
// There are 4 scarves. (These scarves are mine.) You have 1 notification. (This notification is important.)
                        ^ maintains capitalization and ignores special characters
```

## "and" joiner

You can use the `and` function to write out a list and add an "and" before the last value, like in English lists.

```javascript
import { and } from "@grayseon/pluralize"
// or const { and } = require("@grayseon/pluralize")

const countries = ["Russia", "Canada", "the United States"]

console.log(`The top 3 countries by land area are: ${and(countries)}`)
```

You can also pass the separator and conjugation for special cases (like a super comma).

```javascript
const dates = ["January 1, 2025", "July 2, 2025", "December 31, 2025"]

console.log(
  `The beginning, middle, and end dates for 2025 are: ${and(dates, "; ", "; and, last but not least, ")}.`,
)
// The beginning, middle, and end dates for 2025 are: January 1, 2025; July 2, 2025; and, last but not least, December 31, 2025
```
