import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "./switch"
import { Label } from "./label"

/**
 * Switch — on/off toggle. Off is the hairline `--input` track; on fills with
 * the neon `--primary`. The thumb rides on `--background` so it reads in either
 * state. Drive with `checked` + `onCheckedChange` or `defaultChecked`.
 */
const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Switch. The track fills with Atomic lime when on; neon focus ring. Use for instant binary settings (no submit).",
      },
    },
  },
  argTypes: {
    checked: { control: "boolean", description: "Controlled on/off state." },
    defaultChecked: {
      control: "boolean",
      description: "Uncontrolled initial state.",
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
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — click to flip, or drive `checked` from Controls. */
export const Playground: Story = {}

export const On: Story = {
  args: { defaultChecked: true },
}

export const Off: Story = {
  args: { defaultChecked: false },
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  ),
}

/** With a clickable label. */
export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="alerts" defaultChecked />
      <Label htmlFor="alerts">Slack alerts</Label>
    </div>
  ),
}

/** Controlled — the live value is echoed beside the control. */
export const Controlled: Story = {
  render: () => {
    const [on, setOn] = React.useState(false)
    return (
      <div className="flex items-center gap-3">
        <Switch id="ctrl" checked={on} onCheckedChange={setOn} />
        <Label htmlFor="ctrl">{on ? "on" : "off"}</Label>
      </div>
    )
  },
}
