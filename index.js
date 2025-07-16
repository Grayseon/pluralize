function stitch(strings, values) {
  let result = ""

  strings.forEach((string, i) => {
    result += string
    result += values[i] ?? ''
  })

  return result
}

export const s = "__@@PLURALIZE"

export function pluralize(strings, ...values) {
  if (!values.includes(s)) throw new TypeError("Pluralization is unnecessary; it was never called.")

  //const stitched = stitch(strings, values)

  let pluralized = true
  const pluralizedValues = values.map((value) => {
    const parsedValue = parseFloat(value)
    if (parsedValue === 1) {
      pluralized = false
    } else if (value === s) {
      const oldPluralized = pluralized
      pluralized = true
      if (oldPluralized) { return "s" } else { return "" }
    }
    return value
  })

  return stitch(strings, pluralizedValues)
}