import * as rawPlurals from "./plurals.json"

export const s = Symbol("pluralize")

export function stitch(strings: string[], values: unknown[]) {
  return strings.reduce(
    (result, str, i) => result + str + (values[i] ?? ""),
    "",
  )
}

export function pluralize(strings: string[], ...values: unknown[]) {
  const plurals = rawPlurals as Record<string, string>
  if (!values.includes(s)) {
    throw new TypeError("Pluralization is unnecessary; it was never called.")
  }

  let shouldPluralize = true
  const updatedStrings = [...strings]

  const updatedValues = values.map((value, i) => {
    if (value === s) {
      if (!shouldPluralize) return ""

      const segmentBefore = updatedStrings[i]
      const match = segmentBefore.match(/([A-Za-z]+)\s*$/)
      const rawWord = match?.[1] ?? ""
      const base = rawWord.toLowerCase()

      let replacement = plurals[base]

      if (!replacement) {
        if (/[ctp]h$/i.test(base)) {
          replacement = base + "es"
        } else if (/y$/i.test(base)) {
          replacement = base.slice(0, -1) + "ies"
        } else {
          replacement = base + "s"
        }
      }

      updatedStrings[i] = segmentBefore.slice(0, -rawWord.length) + replacement
      return ""
    }

    const numeric = Number(value)
    if (!isNaN(numeric)) {
      shouldPluralize = numeric !== 1
    }

    return value
  })

  return stitch(updatedStrings, updatedValues)
}

export function and(
  values: string[],
  separator = ", ",
  conjunction = ", and ",
) {
  if (values.length <= 1) return values.join("")
  return values.slice(0, -1).join(separator) + conjunction + values.at(-1)
}
