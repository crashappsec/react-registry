import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

/**
 * Tabs — an underline tab strip for switching views or filters. The active
 * trigger carries a neon `--primary` underline; inactive triggers run muted in
 * the mono voice. Click a trigger in any story below to switch the panel live.
 */
const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Tabs. Compose `TabsList` of `TabsTrigger`s and a `TabsContent` per `value`. Drive with `defaultValue` (uncontrolled) or `value` + `onValueChange` (controlled).",
      },
    },
  },
  argTypes: {
    defaultValue: {
      control: "text",
      description: "Uncontrolled initial active tab value.",
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "Tab strip orientation.",
      table: { defaultValue: { summary: "horizontal" } },
    },
  },
  args: {
    defaultValue: "30d",
    orientation: "horizontal",
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — switch between time windows. */
export const Playground: Story = {
  render: (args) => (
    <Tabs {...args} className="w-96">
      <TabsList>
        <TabsTrigger value="30d">30 days</TabsTrigger>
        <TabsTrigger value="90d">90 days</TabsTrigger>
        <TabsTrigger value="all">All time</TabsTrigger>
      </TabsList>
      <TabsContent value="30d" className="pt-2 text-sm text-muted-foreground">
        12 deployments · 0 failed builds in the last 30 days.
      </TabsContent>
      <TabsContent value="90d" className="pt-2 text-sm text-muted-foreground">
        41 deployments · 2 failed builds in the last 90 days.
      </TabsContent>
      <TabsContent value="all" className="pt-2 text-sm text-muted-foreground">
        318 deployments · 9 failed builds all time.
      </TabsContent>
    </Tabs>
  ),
}

/** A disabled tab — the trigger is non-interactive. */
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="advisories">Advisories</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="pt-2 text-sm text-muted-foreground">
        Health: At Risk · last release 94 days ago.
      </TabsContent>
      <TabsContent
        value="advisories"
        className="pt-2 text-sm text-muted-foreground"
      >
        3 critical · 5 high · 11 moderate advisories open.
      </TabsContent>
    </Tabs>
  ),
}

/** Controlled — the active value lives in the story and is echoed below. */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("services")
    return (
      <div className="flex w-96 flex-col gap-2">
        <Tabs value={value} onValueChange={setValue}>
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="teams">Teams</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="pt-2 text-sm text-muted-foreground">
            42 services across 6 portfolios.
          </TabsContent>
          <TabsContent value="teams" className="pt-2 text-sm text-muted-foreground">
            6 owning teams.
          </TabsContent>
          <TabsContent value="reports" className="pt-2 text-sm text-muted-foreground">
            Weekly portfolio health digest.
          </TabsContent>
        </Tabs>
        <p className="font-mono text-[11px] text-muted-foreground">
          active: {value}
        </p>
      </div>
    )
  },
}
