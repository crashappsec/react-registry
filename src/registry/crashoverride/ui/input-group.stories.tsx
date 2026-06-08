import type { Meta, StoryObj } from "@storybook/react-vite"
import { Search, AtSign } from "lucide-react"
import { InputGroup } from "./input-group"

/**
 * InputGroup — an Input joined with leading/trailing addons (text, icon, or a
 * node) into one bordered control. The wrapper carries the hairline border and
 * the neon focus ring (via `focus-within`); the inner Input is borderless so
 * the group reads as a single field. Addons sit on the `--secondary` surface.
 */
const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Input + addons as one control. `prefix` / `suffix` accept text, an icon, or any node. Focus the field to see the group's `focus-within` ring; `aria-invalid` on the input flips the whole group destructive.",
      },
    },
  },
  argTypes: {
    placeholder: { control: "text", description: "Inner input placeholder." },
    disabled: {
      control: "boolean",
      description: "Disable the inner input.",
      table: { defaultValue: { summary: "false" } },
    },
    "aria-invalid": {
      control: "boolean",
      description: "Mark the inner input invalid — flips the group destructive.",
    },
  },
  args: {
    placeholder: "my-org",
    disabled: false,
  },
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — type into the field; prefix + suffix wrap it. */
export const Playground: Story = {
  render: (args) => (
    <InputGroup
      {...args}
      groupClassName="w-96"
      prefix="https://"
      suffix=".crashoverride.com"
    />
  ),
}

/** Leading text addon only. */
export const Prefix: Story = {
  render: () => (
    <InputGroup groupClassName="w-72" prefix="$" placeholder="0.00" />
  ),
}

/** Trailing text addon only. */
export const Suffix: Story = {
  render: () => (
    <InputGroup groupClassName="w-72" suffix="USD" placeholder="Amount" />
  ),
}

/** Icon addons. */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InputGroup
        groupClassName="w-72"
        prefix={<Search className="size-4" />}
        placeholder="Search repositories…"
        type="search"
      />
      <InputGroup
        groupClassName="w-72"
        prefix={<AtSign className="size-4" />}
        suffix="@crashoverride.com"
        placeholder="username"
      />
    </div>
  ),
}

/** Disabled. */
export const Disabled: Story = {
  render: () => (
    <InputGroup
      groupClassName="w-72"
      prefix="https://"
      disabled
      defaultValue="locked-org"
    />
  ),
}

/** Invalid — the whole group goes destructive. */
export const Invalid: Story = {
  render: () => (
    <InputGroup
      groupClassName="w-72"
      prefix="@"
      aria-invalid
      defaultValue="bad value"
    />
  ),
}
