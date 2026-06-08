import type { Meta, StoryObj } from "@storybook/react-vite"
import { Field } from "./field"
import { Input } from "./input"
import { Textarea } from "./textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"

/**
 * Field — composes a Label, a control, and help/error text into one accessible
 * field. Wrap any control (Input, Textarea, Select…) as the single child. When
 * `htmlFor`/`id` match, the label targets the control and `aria-describedby` /
 * `aria-invalid` are wired onto the child automatically.
 */
const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Label + control + message wrapper. Supplying `error` flips the message colour and marks the wrapped control invalid; otherwise `hint` shows muted help text. `required` adds a destructive asterisk.",
      },
    },
  },
  argTypes: {
    label: { control: "text", description: "Field label (rendered in the Label voice)." },
    hint: { control: "text", description: "Help text shown below when there is no error." },
    error: {
      control: "text",
      description: "Error message — flips message colour and marks the control invalid.",
    },
    required: {
      control: "boolean",
      description: "Append a destructive `*` to the label.",
      table: { defaultValue: { summary: "false" } },
    },
    htmlFor: {
      control: "text",
      description: "id of the control — links the label and derives the message id.",
    },
  },
  args: {
    label: "Work email",
    htmlFor: "email",
    hint: "We only use this for status alerts.",
    required: true,
    // Every story supplies its own control via `render`; this satisfies the
    // required `children` prop on the meta args type.
    children: null,
  },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — toggle `error`, `required` and edit the hint from Controls. */
export const Playground: Story = {
  render: (args) => (
    <Field {...args} className="w-80">
      <Input id={args.htmlFor} type="email" placeholder="you@crashoverride.com" />
    </Field>
  ),
}

/** Hint state — muted help text below the control. */
export const WithHint: Story = {
  args: { error: undefined },
  render: (args) => (
    <Field {...args} className="w-80">
      <Input id={args.htmlFor} type="email" placeholder="you@crashoverride.com" />
    </Field>
  ),
}

/** Error state — message turns destructive and the input is marked invalid. */
export const WithError: Story = {
  args: { error: "Enter a valid email address.", hint: undefined },
  render: (args) => (
    <Field {...args} className="w-80">
      <Input id={args.htmlFor} type="email" defaultValue="not-an-email" />
    </Field>
  ),
}

/** Wrapping a Textarea. */
export const WithTextarea: Story = {
  args: { label: "Incident notes", htmlFor: "notes", hint: "Markdown supported.", required: false },
  render: (args) => (
    <Field {...args} className="w-80">
      <Textarea id={args.htmlFor} placeholder="What happened?" />
    </Field>
  ),
}

/** Wrapping a Select. */
export const WithSelect: Story = {
  args: { label: "Region", htmlFor: "region", hint: "Where the service runs.", required: false, error: undefined },
  render: (args) => (
    <Field {...args} className="w-80">
      <Select>
        <SelectTrigger id={args.htmlFor}>
          <SelectValue placeholder="Pick a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us-east-1">us-east-1</SelectItem>
          <SelectItem value="eu-west-1">eu-west-1</SelectItem>
          <SelectItem value="ap-south-1">ap-south-1</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
}
