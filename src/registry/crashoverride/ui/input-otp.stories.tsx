import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./input-otp"

/**
 * InputOTP — one-time-passcode field: auto-advancing, paste-aware cells in the
 * brand mono voice. The active cell lights its border + ring with neon `--ring`
 * and shows a blinking caret. Compose `InputOTPSlot`s (by `index`) inside
 * `InputOTPGroup`s, optionally split by an `InputOTPSeparator`. Built on the
 * `input-otp` package. Type or paste a code in any story below.
 *
 * `InputOTP`'s real props are a discriminated union (`{ render }` xor
 * `{ children }`), which collides with Storybook's own `render` story field.
 * To keep typed, interactive controls we drive the docs/Playground through a
 * thin story-only wrapper (`OtpField`) that exposes the meaningful props and
 * renders a standard slot layout; the other stories use `InputOTP` directly.
 */
function OtpField({
  maxLength = 6,
  groups = 2,
  ...props
}: {
  maxLength?: number
  /** Split the cells into this many evenly-sized groups (joined by separators). */
  groups?: number
  disabled?: boolean
  pattern?: string
}) {
  const per = Math.ceil(maxLength / Math.max(1, groups))
  const chunks: number[][] = []
  for (let i = 0; i < maxLength; i += per) {
    chunks.push(Array.from({ length: Math.min(per, maxLength - i) }, (_, k) => i + k))
  }
  return (
    // aria-label names the underlying input-otp <input> so the field has an
    // accessible name (a real form pairs it with a visible Label).
    <InputOTP maxLength={maxLength} aria-label="One-time passcode" {...props}>
      {chunks.map((chunk, ci) => (
        <React.Fragment key={ci}>
          {ci > 0 && <InputOTPSeparator />}
          <InputOTPGroup>
            {chunk.map((index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
          </InputOTPGroup>
        </React.Fragment>
      ))}
    </InputOTP>
  )
}

const meta = {
  title: "Components/InputOTP",
  component: OtpField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn `input-otp` field. Set `maxLength` to the code length and render that many `InputOTPSlot`s. `onComplete` fires when every slot is filled. Use `pattern` to restrict input (e.g. digits only).",
      },
    },
  },
  argTypes: {
    maxLength: {
      control: "number",
      description: "Number of cells / code length.",
      table: { defaultValue: { summary: "6" } },
    },
    groups: {
      control: "number",
      description: "Split the cells into this many groups (joined by separators).",
      table: { defaultValue: { summary: "2" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the whole field (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
    pattern: {
      control: "text",
      description: "Allowed-character regex (e.g. `[0-9]*` for digits only).",
    },
  },
  args: {
    maxLength: 6,
    groups: 2,
    disabled: false,
  },
} satisfies Meta<typeof OtpField>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — six cells split into two groups by a separator. */
export const Playground: Story = {}

/** A single contiguous group of six cells. */
export const SingleGroup: Story = {
  args: { groups: 1 },
}

/** Four cells, digits only (numeric `pattern`). */
export const FourDigit: Story = {
  args: { maxLength: 4, groups: 1, pattern: "[0-9]*" },
}

/** Disabled. */
export const Disabled: Story = {
  args: { groups: 1, disabled: true },
}

/** Live — the entered value and a completion flag are echoed below. */
export const WithOnComplete: Story = {
  render: () => {
    const [value, setValue] = React.useState("")
    const [done, setDone] = React.useState(false)
    return (
      <div className="flex flex-col gap-3">
        <InputOTP
          maxLength={6}
          aria-label="One-time passcode"
          value={value}
          onChange={(v) => {
            setValue(v)
            if (v.length < 6) setDone(false)
          }}
          onComplete={() => setDone(true)}
        >
          <InputOTPGroup>
            {Array.from({ length: 6 }, (_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>
        <p className="font-mono text-[11px] text-muted-foreground">
          value: {value || "—"} {done && "· complete ✓"}
        </p>
      </div>
    )
  },
}
