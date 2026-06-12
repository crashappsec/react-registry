import { readFileSync } from "node:fs"
import { describe, it, expect } from "vitest"

const css = readFileSync("src/registry/crashoverride/gibson-theme/globals.css", "utf8")
const corpCss = readFileSync("src/registry/crashoverride/theme/globals.css", "utf8")

describe("gibson theme tokens", () => {
  it("defines the phosphor-lime primary in dark and keeps Fandango in light", () => {
    expect(css).toMatch(/--primary:\s*oklch\(0\.93 0\.25 124\)/) // dark: phosphor lime
    expect(css).toMatch(/--primary:\s*oklch\(0\.46 0\.18 309\)/) // light: Fandango (corp light, verbatim)
  })
  it("uses the Gibson near-black indigo surface in dark", () => {
    expect(css).toMatch(/--background:\s*oklch\(0\.145 0\.02 274\)/)
    expect(css).toMatch(/--sidebar:\s*oklch\(0\.125 0\.018 274\)/)
  })
  it("uses the Gibson radius in dark", () => {
    expect(css).toMatch(/--radius:\s*0\.375rem/)
  })
  it("declares the three brand fonts", () => {
    expect(css).toMatch(/JetBrains Mono/)
    expect(css).toMatch(/Inter/)
    expect(css).toMatch(/Geist Mono/)
  })
  it("keys dark mode off both .dark and [data-theme=dark]", () => {
    expect(css).toMatch(/@custom-variant dark[\s\S]*data-theme="dark"/)
  })
  it("carries the corp light block verbatim so the in-app toggle stays usable", () => {
    const lightBlock = (source: string) => {
      const match = source.match(/\[data-theme="light"\],\s*\n\.light \{[\s\S]*?\n\}/)
      return match ? match[0] : null
    }
    const gibsonLight = lightBlock(css)
    expect(gibsonLight).not.toBeNull()
    expect(gibsonLight).toBe(lightBlock(corpCss))
  })
})
