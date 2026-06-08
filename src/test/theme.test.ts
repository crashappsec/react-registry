import { readFileSync } from "node:fs"
import { describe, it, expect } from "vitest"

const css = readFileSync("src/registry/crashoverride/theme/globals.css", "utf8")

describe("theme tokens", () => {
  it("defines the brand primary in dark (Atomic lime) and light (Fandango)", () => {
    expect(css).toMatch(/--primary:\s*oklch\(0\.93 0\.25 124\)/) // dark: Atomic lime
    expect(css).toMatch(/--primary:\s*oklch\(0\.46 0\.18 309\)/) // light: Fandango
  })
  it("uses the sharp brand radius", () => {
    expect(css).toMatch(/--radius:\s*0\.25rem/)
  })
  it("declares the three brand fonts", () => {
    expect(css).toMatch(/JetBrains Mono/)
    expect(css).toMatch(/Inter/)
    expect(css).toMatch(/Geist Mono/)
  })
  it("keys dark mode off both .dark and [data-theme=dark]", () => {
    expect(css).toMatch(/@custom-variant dark[\s\S]*data-theme="dark"/)
  })
})
