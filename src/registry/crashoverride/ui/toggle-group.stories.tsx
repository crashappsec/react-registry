import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  LayoutGrid,
  List,
} from "lucide-react"
import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

/**
 * ToggleGroup — a segmented set of toggles. `type="single"` (radio-like) or
 * `"multiple"`. Items join into one sharp-edged control with hairline dividers;
 * the pressed segment fills with `--accent`. Inherits Toggle's variant/size.
 * Drive with `value`/`defaultValue` + `onValueChange`.
 */
const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix ToggleGroup built on Toggle. `single` behaves like a radio set; `multiple` allows several pressed segments. Variant/size set on the group cascade to every item.",
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description: "`single` = radio-like · `multiple` = independent toggles.",
      table: { defaultValue: { summary: "single" } },
    },
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      description: "Toggle variant applied to every item.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Toggle size applied to every item.",
      table: { defaultValue: { summary: "md" } },
    },
    disabled: {
      control: "boolean",
      description: "Disable the whole group.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    type: "single",
    variant: "default",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — pick a view, or drive type/variant/size from Controls. */
export const Playground: Story = {
  render: ({ variant, size, disabled }) => (
    // Pin `type="single"` so `defaultValue` narrows to a string; variant/size/
    // disabled stay driveable from Controls.
    <ToggleGroup
      type="single"
      variant={variant}
      size={size}
      disabled={disabled}
      defaultValue="grid"
    >
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <LayoutGrid />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Single-select — text alignment (only one active at a time). */
export const SingleSelect: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Multi-select — text styles (several can be active). */
export const MultipleSelect: Story = {
  render: () => (
    <ToggleGroup type="multiple" defaultValue={["bold"]}>
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Outline variant. */
export const Outline: Story = {
  render: () => (
    <ToggleGroup type="single" variant="outline" defaultValue="grid">
      <ToggleGroupItem value="grid" aria-label="Grid">
        <LayoutGrid /> Grid
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List">
        <List /> List
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

/** Controlled multiple — live value echoed below. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string[]>(["bold", "italic"])
    return (
      <div className="flex flex-col gap-3">
        <ToggleGroup type="multiple" value={value} onValueChange={setValue}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
        <p className="font-mono text-[11px] text-muted-foreground">
          active: {value.join(", ") || "—"}
        </p>
      </div>
    )
  },
}
