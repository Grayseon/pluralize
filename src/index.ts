import rawPlurals from "./plurals.json"

export const s = Symbol("pluralize")
export const forcePlural = Symbol("forcePlural")
export const forceSingular = Symbol("forceSingular")

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
    if(value === forcePlural) {
      shouldPluralize = true
      return ""
    }

    if(value === forceSingular) {
      shouldPluralize = false
      return ""
    }

    if(Array.isArray(value) && value.length === 2) {
      return shouldPluralize ? value[1] : value[0]
    }

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

      if (rawWord === rawWord.toUpperCase()) {
        replacement = replacement.toUpperCase()
      } else if (rawWord[0] === rawWord[0].toUpperCase()) {
        replacement = replacement[0].toUpperCase() + replacement.slice(1)
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
