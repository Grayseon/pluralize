const plurals = require("./plurals.json")
const s = "__@@PLURALIZE"

function stitch(strings, values) {
  return strings.reduce(
    (result, str, i) => result + str + (values[i] ?? ""),
    ""
  )
}

function pluralize(strings, ...values) {
  if (!values.includes(s)) {
    throw new TypeError("Pluralization is unnecessary; it was never called.")
  }

  let pluralized = true
  const pluralizedStrings = [...strings]

  const pluralizedValues = values.map((value, i) => {
    const parsedValue = parseFloat(value)
    if (!isNaN(parsedValue)) {
      pluralized = parsedValue !== 1
    }

    if (value === s) {
      if (!pluralized) return ""

      const before = pluralizedStrings[i]
      const m = before.match(/([A-Za-z]+)\s*$/)
      const rawWord = m ? m[1] : ""
      const word = rawWord.toLowerCase()

      if (plurals[word]) {
        pluralizedStrings[i] =
          before.slice(0, before.length - rawWord.length) + plurals[word]
        return ""
      }

      if (/[ctp]h$/i.test(word)) return "es"
      if (/y$/i.test(word)) pluralizedStrings[i] = before.slice(0, before.length - rawWord.length) + word.slice(0, -1) + "ie"
      return "s"
    }

    return value
  })

  return stitch(pluralizedStrings, pluralizedValues)
}

module.exports = { pluralize, s }
