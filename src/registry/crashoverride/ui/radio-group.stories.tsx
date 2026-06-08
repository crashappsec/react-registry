import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"

/**
 * RadioGroup — single-select group on the one dark surface. Each item is a
 * hairline circle; the selected item draws its border + dot in the neon
 * `--primary`. Compose `RadioGroupItem`s (each paired with a Label) inside a
 * `RadioGroup`. Drive with `value`/`defaultValue` + `onValueChange`.
 */
const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix RadioGroup. Single selection across `RadioGroupItem`s; the selected dot glows Atomic lime. Pair each item with a Label for click-to-select.",
      },
    },
  },
  argTypes: {
    defaultValue: { control: "text", description: "Uncontrolled initial selected value." },
    disabled: {
      control: "boolean",
      description: "Disable the whole group.",
      table: { defaultValue: { summary: "false" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["vertical", "horizontal"],
      description: "Arrow-key navigation direction.",
      table: { defaultValue: { summary: "vertical" } },
    },
  },
  args: {
    defaultValue: "prod",
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const OPTIONS = [
  ["prod", "Production"],
  ["staging", "Staging"],
  ["dev", "Development"],
] as const

/** Fully interactive — click a row or use arrow keys to select. */
export const Playground: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {OPTIONS.map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`pg-${value}`} />
          <Label htmlFor={`pg-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

/** Default vertical layout. */
export const Vertical: Story = {
  render: () => (
    <RadioGroup defaultValue="staging">
      {OPTIONS.map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`v-${value}`} />
          <Label htmlFor={`v-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

/** Horizontal row. */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="prod" orientation="horizontal" className="grid-flow-col">
      {OPTIONS.map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`h-${value}`} />
          <Label htmlFor={`h-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

/** Disabled group. */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="prod" disabled>
      {OPTIONS.map(([value, label]) => (
        <div key={value} className="flex items-center gap-2">
          <RadioGroupItem value={value} id={`d-${value}`} />
          <Label htmlFor={`d-${value}`}>{label}</Label>
        </div>
      ))}
    </RadioGroup>
  ),
}

/** Controlled — the live selection is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("prod")
    return (
      <div className="flex flex-col gap-3">
        <RadioGroup value={value} onValueChange={setValue}>
          {OPTIONS.map(([v, label]) => (
            <div key={v} className="flex items-center gap-2">
              <RadioGroupItem value={v} id={`c-${v}`} />
              <Label htmlFor={`c-${v}`}>{label}</Label>
            </div>
          ))}
        </RadioGroup>
        <p className="font-mono text-[11px] text-muted-foreground">selected: {value}</p>
      </div>
    )
  },
}
