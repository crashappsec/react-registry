import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "./label"
import { Input } from "./input"
import { Checkbox } from "./checkbox"

/**
 * Label — form field label in the brand's mono, uppercase, wide-tracked voice.
 * Built on Radix Label, so clicking the label focuses the control referenced by
 * its `htmlFor`. Pair with Input / Textarea / Checkbox / Field.
 */
const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Uppercase mono label with wide tracking. Clicking it focuses the associated control via `htmlFor`. Use to caption any form control.",
      },
    },
  },
  argTypes: {
    htmlFor: {
      control: "text",
      description: "id of the control this label targets (click-to-focus).",
    },
    children: {
      control: "text",
      description: "Label text.",
    },
  },
  args: {
    children: "Work email",
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — edit the label text from Controls. */
export const Playground: Story = {}

/** A label wired to an input — click the label to focus the field. */
export const WithInput: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="org">Organisation</Label>
      <Input id="org" placeholder="zero-test-org" />
    </div>
  ),
}

/** A label wired to a checkbox — click the label to toggle it. */
export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="notify" />
      <Label htmlFor="notify">Email me on status changes</Label>
    </div>
  ),
}
