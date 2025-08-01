const plurals = require("./plurals.json")
const s = Symbol("pluralize") //"__@@PLURALIZE"

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
      if (/y$/i.test(word))
        pluralizedStrings[i] =
          before.slice(0, before.length - rawWord.length) +
          word.slice(0, -1) +
          "ie"
      return "s"
    }

    const parsedValue = parseFloat(value)
    if (!isNaN(parsedValue)) {
      pluralized = parsedValue !== 1
    }

    return value
  })

  return stitch(pluralizedStrings, pluralizedValues)
}

function and(values, separator = ", ", conjunction = ", and ") {
  if (!Array.isArray(values)) throw new Error("Expected values to be an array")
  if (!typeof separator === "string" || !typeof conjunction === "string")
    throw new Error("Expected separator and conjunction to both be strings")

  return (
    values.slice(0,-1).join(separator) +
    conjunction +
    values[values.length-1]
  )
}

module.exports = { pluralize, s, and }
