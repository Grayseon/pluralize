//const { it, expect, describe } = require("vitest")
import { it, expect, describe } from "vitest"
import { pluralize, s, and } from "@grayseon/pluralize"

const notifications = 1
const antelopes = 5
const lunches = 2
const scarves = 4
const berries = 10
const things = ["i am tired"]
const animals = ["cat", "dog", "tiger"]

const output = pluralize`you have ${notifications} notification${s} (this${s} notification${s} is${s} important), ${antelopes} antelope${s}, ${lunches} lunch${s}, ${berries} berry${s}, and ${scarves} scarf${s}. this${s} scarf${s} is${s} mine. ${things.length} more thing${s}: ${things.join(", ")}.
i will now proceed to list ${animals.length} animal${s}: ${and(animals)}`

describe("pluralization", () => {
  it("should pluralize regularly and persist the pluralization state", () => {
    expect(output).toContain(
      `you have ${notifications} notification (this notification is important), ${antelopes} antelopes, `,
    )
  })
  it("should append -es onto [ctp]h$ words", () => {
    expect(output).toContain(`${lunches} lunches, `)
  })
  it("should append -ies onto y$ words", () => {
    expect(output).toContain(`${berries} berries, and`)
  })
  it("should use irregular plurals correctly", () => {
    expect(output).toContain(`${scarves} scarves. these scarves are mine.`)
  })
  it("should support dynamic numbers", () => {
    expect(output).toContain(
      `${things.length} more thing: ${things.join(", ")}.`,
    )
  })
  it("should support joining with and", () => {
    expect(output).toContain(
      "i will now proceed to list 3 animals: cat, dog, and tiger",
    )
  })
})
