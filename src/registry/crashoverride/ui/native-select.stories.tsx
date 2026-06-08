import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { NativeSelect } from "./native-select"

/**
 * NativeSelect — a lightly-styled native `<select>` for simple, accessible
 * cases (no custom popover). Matches the Input voice with a brand chevron on
 * the trailing edge. Pass `options` (strings or `{value,label}`) or raw
 * `<option>` children. For a searchable list use Select or Combobox.
 */
const meta = {
  title: "Components/NativeSelect",
  component: NativeSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Native `<select>` styled to the Input voice. Convenience `options` prop accepts `string[]` or `{ value, label, disabled }[]`; omit it to pass `<option>` children. `aria-invalid` flips to the destructive token.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-invalid": {
      control: "boolean",
      description: "Mark invalid — destructive border + ring.",
    },
    defaultValue: { control: "text", description: "Uncontrolled initial value." },
  },
  args: {
    disabled: false,
  },
} satisfies Meta<typeof NativeSelect>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — open it and pick a value. */
export const Playground: Story = {
  render: (args) => (
    <NativeSelect
      {...args}
      aria-label="severity"
      className="w-56"
      options={["Low", "Medium", "High", "Critical"]}
    />
  ),
}

/** {value,label} options with one disabled and a preselected value. */
export const ObjectOptions: Story = {
  render: () => (
    <NativeSelect
      aria-label="region"
      className="w-56"
      defaultValue="us"
      options={[
        { value: "us", label: "us-east-1" },
        { value: "eu", label: "eu-west-1" },
        { value: "ap", label: "ap-south-1", disabled: true },
      ]}
    />
  ),
}

/** Raw <option> children (with a placeholder first option). */
export const WithChildren: Story = {
  render: () => (
    <NativeSelect aria-label="environment" className="w-56" defaultValue="">
      <option value="" disabled>
        Pick an environment…
      </option>
      <option value="prod">prod</option>
      <option value="staging">staging</option>
      <option value="dev">dev</option>
    </NativeSelect>
  ),
}

export const Disabled: Story = {
  render: () => (
    <NativeSelect
      aria-label="region"
      className="w-56"
      disabled
      defaultValue="us"
      options={[{ value: "us", label: "us-east-1" }]}
    />
  ),
}

export const Invalid: Story = {
  render: () => (
    <NativeSelect
      aria-label="region"
      className="w-56"
      aria-invalid
      defaultValue=""
      options={[{ value: "", label: "—" }, "us-east-1", "eu-west-1"]}
    />
  ),
}

/** Controlled — the live value is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("Low")
    return (
      <div className="flex w-56 flex-col gap-2">
        <NativeSelect
          aria-label="severity"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={["Low", "Medium", "High", "Critical"]}
        />
        <p className="font-mono text-[11px] text-muted-foreground">value: {value}</p>
      </div>
    )
  },
}
