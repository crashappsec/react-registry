import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "./input"

/**
 * Input — canonical text field on the one dark surface. Contrast comes from the
 * hairline `--input` border + the neon focus ring, never a background shift.
 * Pass `aria-invalid` to flip the border + ring to the destructive token.
 */
const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Text field with a hairline border and neon focus ring. Sharp brand radius, mono placeholder. Pair with Label / Field for help + errors. `aria-invalid` switches to the destructive token.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
      description: "Native input type.",
      table: { defaultValue: { summary: "text" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text (mono, muted).",
    },
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity, no pointer events).",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-invalid": {
      control: "boolean",
      description: "Mark invalid — flips border + ring to the destructive token.",
    },
    value: { control: "text", description: "Controlled value." },
  },
  args: {
    placeholder: "zero-test-org",
    type: "text",
    disabled: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — type into it and drive every prop from Controls. */
export const Playground: Story = {}

export const Default: Story = {
  args: { placeholder: "Search repositories…", type: "search" },
}

export const WithValue: Story = {
  args: { defaultValue: "compass-api" },
}

export const Password: Story = {
  args: { type: "password", defaultValue: "hunter2" },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "read-only" },
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "not-an-email" },
}

/**
 * Every state stacked for comparison. Each input carries an `aria-label` so the
 * bare fields have an accessible name (a real form pairs them with Label/Field).
 */
export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      <Input placeholder="Default" aria-label="Default state" />
      <Input defaultValue="With value" aria-label="With value state" />
      <Input disabled defaultValue="Disabled" aria-label="Disabled state" />
      <Input aria-invalid defaultValue="Invalid" aria-label="Invalid state" />
    </div>
  ),
}
