import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "./textarea"

/**
 * Textarea — multi-line text input on the one dark surface. Hairline `--input`
 * border, neon focus ring, sharp brand radius, vertical resize. Pair with Label
 * / Field for help + errors. `aria-invalid` flips to the destructive token.
 */
const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical multi-line field. Vertical resize, mono placeholder, neon focus ring. `aria-invalid` switches the border + ring to the destructive token.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text", description: "Placeholder text (mono, muted)." },
    rows: { control: "number", description: "Visible rows." },
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-invalid": {
      control: "boolean",
      description: "Mark invalid — destructive border + ring.",
    },
    value: { control: "text", description: "Controlled value." },
  },
  args: {
    placeholder: "Describe the incident…",
    disabled: false,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — type into it and drag the resize handle. */
export const Playground: Story = {
  render: (args) => <Textarea {...args} className="w-80" />,
}

export const WithValue: Story = {
  render: () => (
    <Textarea
      className="w-80"
      aria-label="Incident notes"
      defaultValue={"SBOM verification failed on 3 of 12 artifacts.\nRe-run the scan after rotating the token."}
    />
  ),
}

export const Disabled: Story = {
  render: () => (
    <Textarea
      className="w-80"
      disabled
      aria-label="Incident notes (read-only)"
      defaultValue="This field is read-only."
    />
  ),
}

export const Invalid: Story = {
  render: () => (
    <Textarea className="w-80" aria-invalid aria-label="Incident notes" defaultValue="Too short." />
  ),
}
