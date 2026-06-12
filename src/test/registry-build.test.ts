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

  it("emits a valid gibson-theme item that shares the corp tokens.css", () => {
    const p = "public/r/gibson-theme.json"
    expect(existsSync(p)).toBe(true)
    const item = JSON.parse(readFileSync(p, "utf8"))
    expect(item.name).toBe("gibson-theme")
    expect(item.type).toBe("registry:style")
    expect(JSON.stringify(item.files)).toMatch(/--primary/)
    // Gibson dark surface is present; the shared brand-core tokens layer rides along.
    expect(JSON.stringify(item.files)).toMatch(/0\.145 0\.02 274/)
    const targets = item.files.map((f: { target: string }) => f.target)
    expect(targets).toContain("app/globals.css")
    expect(targets).toContain("app/tokens.css")
  })
})
