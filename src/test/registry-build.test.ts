import { readFileSync, existsSync } from "node:fs"
import { describe, it, expect } from "vitest"

describe("registry build output", () => {
  it("emits a valid theme item", () => {
    const p = "public/r/theme.json"
    expect(existsSync(p)).toBe(true)
    const item = JSON.parse(readFileSync(p, "utf8"))
    expect(item.name).toBe("theme")
    expect(item.type).toBe("registry:style")
    expect(JSON.stringify(item.files)).toMatch(/--primary/)
  })
})
