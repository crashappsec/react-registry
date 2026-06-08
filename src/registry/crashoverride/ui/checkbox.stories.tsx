import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Checkbox } from "./checkbox"
import { Label } from "./label"

/**
 * Checkbox — square control on the one dark surface. Unchecked is a hairline
 * box; checked fills with the neon `--primary` and shows the dark check glyph.
 * Supports an `indeterminate` state. Drive with `checked` + `onCheckedChange`
 * or `defaultChecked`.
 */
const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Checkbox. Checked fills with Atomic lime; supports an `indeterminate` tri-state. Neon focus ring, sharp brand radius.",
      },
    },
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
      description: "Controlled checked state (`true` / `false` / `\"indeterminate\"`).",
    },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial checked state.",
    },
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    defaultChecked: false,
    disabled: false,
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — click to toggle, or drive `checked` from Controls. */
export const Playground: Story = {}

export const Checked: Story = {
  args: { defaultChecked: true },
}

export const Unchecked: Story = {
  args: { defaultChecked: false },
}

export const Indeterminate: Story = {
  args: { checked: "indeterminate" },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Checkbox disabled />
      <Checkbox disabled defaultChecked />
    </div>
  ),
}

/** With a clickable label — clicking either toggles the box. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" defaultChecked />
      <Label htmlFor="terms">Verify SBOM on every build</Label>
    </div>
  ),
}

/** Controlled — the live value is echoed below the control. */
export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(true)
    return (
      <div className="flex items-center gap-3">
        <Checkbox
          id="ctrl"
          checked={checked}
          onCheckedChange={(v) => setChecked(v === true)}
        />
        <Label htmlFor="ctrl">{checked ? "enabled" : "disabled"}</Label>
      </div>
    )
  },
}
