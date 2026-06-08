import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slider } from "./slider"

/**
 * Slider — range slider on the one dark surface. The track is the hairline
 * `--input`; the filled range glows neon `--primary`. Thumbs are round
 * `--background` knobs with a primary ring on focus. Single or multi-thumb via
 * `value`/`defaultValue`. Drag the thumb in any story below.
 */
const meta = {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Slider. The number of thumbs is derived from `value`/`defaultValue` length. Supports horizontal and vertical orientation.",
      },
    },
  },
  argTypes: {
    min: { control: "number", description: "Minimum value.", table: { defaultValue: { summary: "0" } } },
    max: { control: "number", description: "Maximum value.", table: { defaultValue: { summary: "100" } } },
    step: { control: "number", description: "Step increment.", table: { defaultValue: { summary: "1" } } },
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "Track orientation.",
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
  args: {
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
    orientation: "horizontal",
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — drag the thumb, or drive bounds from Controls. */
export const Playground: Story = {
  render: (args) => <Slider {...args} defaultValue={[40]} className="w-72" />,
}

/** A single thumb at a fixed start value. */
export const SingleThumb: Story = {
  render: () => <Slider defaultValue={[25]} className="w-72" />,
}

/** Two thumbs — a min/max range selection. */
export const Range: Story = {
  render: () => <Slider defaultValue={[20, 70]} className="w-72" />,
}

/** Stepped — snaps to multiples of 10. */
export const Stepped: Story = {
  render: () => <Slider defaultValue={[50]} step={10} className="w-72" />,
}

/** Disabled. */
export const Disabled: Story = {
  render: () => <Slider defaultValue={[40]} disabled className="w-72" />,
}

/** Vertical orientation. */
export const Vertical: Story = {
  render: () => (
    <div className="h-44">
      <Slider defaultValue={[60]} orientation="vertical" />
    </div>
  ),
}

/** Controlled — the live value is echoed above the track. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState([40])
    return (
      <div className="flex w-72 flex-col gap-3">
        <p className="font-mono text-[11px] text-muted-foreground">value: {value[0]}</p>
        <Slider value={value} onValueChange={setValue} />
      </div>
    )
  },
}
