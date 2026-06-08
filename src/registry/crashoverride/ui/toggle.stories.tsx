import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Bold, Italic, Underline } from "lucide-react"
import { Toggle } from "./toggle"

/**
 * Toggle — two-state button (on/off, e.g. a formatting control). Quiet in the
 * muted voice by default; pressed it lifts to `--accent` with bright text.
 * `default` fills on press, `outline` adds the segmented hairline border.
 * Drive with `pressed` + `onPressedChange` or `defaultPressed`.
 */
const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Toggle. Pressed state lifts to `--accent`. Two variants (default / outline) and three sizes (sm/md/lg → 30/36/42px).",
      },
    },
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "outline"],
      description: "`default` fills on press · `outline` adds a hairline border.",
      table: { defaultValue: { summary: "default" } },
    },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      description: "Height: sm 30px · md 36px · lg 42px.",
      table: { defaultValue: { summary: "md" } },
    },
    pressed: { control: "boolean", description: "Controlled pressed state." },
    defaultPressed: { control: "boolean", description: "Uncontrolled initial pressed state." },
    disabled: {
      control: "boolean",
      description: "Disable interaction (50% opacity).",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    variant: "default",
    size: "md",
    disabled: false,
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — click to press, or drive every prop from Controls. */
export const Playground: Story = {
  render: (args) => (
    <Toggle {...args} aria-label="Bold">
      <Bold />
    </Toggle>
  ),
}

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Bold">
      <Bold />
    </Toggle>
  ),
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Italic">
      <Italic />
    </Toggle>
  ),
}

export const Pressed: Story = {
  render: () => (
    <Toggle defaultPressed aria-label="Underline">
      <Underline />
    </Toggle>
  ),
}

export const WithText: Story = {
  render: () => (
    <Toggle defaultPressed>
      <Bold /> Bold
    </Toggle>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle disabled aria-label="Bold">
        <Bold />
      </Toggle>
      <Toggle disabled defaultPressed aria-label="Italic">
        <Italic />
      </Toggle>
    </div>
  ),
}

/** All sizes in both variants. */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(["sm", "md", "lg"] as const).map((size) => (
        <Toggle key={size} size={size} variant="outline" aria-label={size}>
          <Bold />
        </Toggle>
      ))}
    </div>
  ),
}

/** Controlled — the live state is echoed beside the control. */
export const Controlled: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false)
    return (
      <div className="flex items-center gap-3">
        <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Bold">
          <Bold />
        </Toggle>
        <span className="font-mono text-[11px] text-muted-foreground">
          {pressed ? "on" : "off"}
        </span>
      </div>
    )
  },
}
