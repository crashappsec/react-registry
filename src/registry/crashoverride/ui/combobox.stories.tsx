import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Combobox } from "./combobox"

/**
 * Combobox — autocomplete input + filtered dropdown. Composes our Popover (the
 * floating panel) and Command (the searchable list). The trigger matches the
 * Input voice; the selected option carries a neon `--primary` check. Click the
 * trigger in any story below to open, type to filter, click to select.
 */
const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A searchable single-select. `options` may be plain strings or `{ value, label }`. Controlled via `value` + `onChange`, or uncontrolled with `defaultValue`. Selecting the current value again clears it.",
      },
    },
  },
  argTypes: {
    placeholder: {
      control: "text",
      description: "Trigger text when nothing is selected.",
      table: { defaultValue: { summary: "Select…" } },
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder inside the search field.",
      table: { defaultValue: { summary: "Search…" } },
    },
    emptyText: {
      control: "text",
      description: "Shown when no option matches the search.",
      table: { defaultValue: { summary: "No match." } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the trigger.",
      table: { defaultValue: { summary: "false" } },
    },
    options: { control: false, description: "String[] or { value, label }[]." },
    onChange: { control: false, description: "Called with the picked value (\"\" when cleared)." },
  },
  args: {
    placeholder: "Select a region",
    searchPlaceholder: "Search regions…",
    emptyText: "No region found.",
    disabled: false,
  },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const REGIONS = [
  "us-east-1",
  "us-west-2",
  "eu-west-1",
  "eu-central-1",
  "ap-south-1",
  "ap-northeast-1",
  "sa-east-1",
]

/** Fully interactive — open, type to filter, click to select. */
export const Playground: Story = {
  render: (args) => (
    <div className="w-64">
      <Combobox {...args} options={REGIONS} />
    </div>
  ),
}

/** A preselected value via `defaultValue`. */
export const WithValue: Story = {
  render: () => (
    <div className="w-64">
      <Combobox options={REGIONS} defaultValue="eu-west-1" placeholder="Select a region" />
    </div>
  ),
}

/** `{ value, label }` options — display label differs from the stored value. */
export const ObjectOptions: Story = {
  render: () => (
    <div className="w-64">
      <Combobox
        placeholder="Select an environment"
        searchPlaceholder="Search…"
        options={[
          { value: "prod", label: "Production" },
          { value: "staging", label: "Staging" },
          { value: "dev", label: "Development" },
        ]}
      />
    </div>
  ),
}

/** Disabled trigger. */
export const Disabled: Story = {
  render: () => (
    <div className="w-64">
      <Combobox options={REGIONS} defaultValue="us-east-1" disabled />
    </div>
  ),
}

/** Controlled — the live selection is echoed below the trigger. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("")
    return (
      <div className="flex w-64 flex-col gap-2">
        <Combobox
          options={REGIONS}
          value={value}
          onChange={setValue}
          placeholder="Select a region"
        />
        <p className="font-mono text-[11px] text-muted-foreground">
          selected: {value || "—"}
        </p>
      </div>
    )
  },
}
