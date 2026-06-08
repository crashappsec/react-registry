import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "./select"

/**
 * Select — dropdown select matching the Input voice. The trigger is a hairline
 * box with a neon focus ring; the content floats on the `--popover` surface.
 * Selected items carry the neon check; the highlighted item lifts to `--accent`.
 * Open the trigger in any story below — selecting works live.
 */
const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Select. Compose `SelectTrigger` + `SelectValue` with a `SelectContent` of `SelectItem`s. Drive with `value`/`defaultValue` + `onValueChange`.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disable the whole select.",
      table: { defaultValue: { summary: "false" } },
    },
    defaultValue: {
      control: "text",
      description: "Uncontrolled initial value.",
    },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1"]

/** Fully interactive — open it and pick a region. */
export const Playground: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-56" aria-label="Region">
        <SelectValue placeholder="Pick a region" />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

/** A preselected value. */
export const WithValue: Story = {
  render: () => (
    <Select defaultValue="eu-west-1">
      <SelectTrigger className="w-56" aria-label="Region">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}

/** Grouped + labelled options with a separator, and one disabled item. */
export const Grouped: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-56" aria-label="Environment">
        <SelectValue placeholder="Pick an environment" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Production</SelectLabel>
          <SelectItem value="prod-us">prod · us-east-1</SelectItem>
          <SelectItem value="prod-eu">prod · eu-west-1</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Non-production</SelectLabel>
          <SelectItem value="staging">staging</SelectItem>
          <SelectItem value="dev" disabled>
            dev (offline)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

/** Controlled — selection is echoed live below the trigger. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>("")
    return (
      <div className="flex w-56 flex-col gap-2">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger aria-label="Region">
            <SelectValue placeholder="Pick a region" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="font-mono text-[11px] text-muted-foreground">
          selected: {value || "—"}
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Select disabled defaultValue="us-east-1">
      <SelectTrigger className="w-56" aria-label="Region">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {REGIONS.map((r) => (
          <SelectItem key={r} value={r}>
            {r}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
}
