import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion"

/**
 * Accordion — stacked disclosure panels in a hairline-bordered container. The
 * trigger chevron rotates on open; body copy runs muted. Single-open by default;
 * pass `type="multiple"` to allow many. Click a row in any story below to expand
 * it live.
 */
const meta = {
  title: "Components/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Accordion. Compose `AccordionItem`s, each with an `AccordionTrigger` + `AccordionContent`. Set `type=\"single\"` (with `collapsible`) or `type=\"multiple\"` on the root.",
      },
    },
  },
  argTypes: {
    type: {
      control: "inline-radio",
      options: ["single", "multiple"],
      description: "Allow one open panel (`single`) or many (`multiple`).",
      table: { defaultValue: { summary: "single" } },
    },
    collapsible: {
      control: "boolean",
      description: "For `type=\"single\"`, allow closing the open panel.",
      table: { defaultValue: { summary: "false" } },
    },
  },
  args: {
    type: "single",
    collapsible: true,
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const ITEMS = [
  {
    value: "chalk",
    q: "What does Chalk record?",
    a: "A deterministic SBOM plus build provenance, stamped into the artifact so it can beacon back from production.",
  },
  {
    value: "health",
    q: "How is health scored?",
    a: "Weighted signals — release cadence, open advisories, CI health, and ownership — combine into one status: Healthy, Needs Attention, At Risk, Stale, or Abandoned.",
  },
  {
    value: "exceptions",
    q: "Can I override a check for one repo?",
    a: "Yes — per-repo exceptions skip a check or force a status for legacy or test repos without changing org-wide policy.",
  },
]

/** Fully interactive — single-open + collapsible; click a row to expand. */
export const Playground: Story = {
  // Pin `type="single" collapsible` so `defaultValue` narrows to a string. The
  // Multiple story below covers `type="multiple"`.
  render: () => (
    <Accordion type="single" collapsible defaultValue="chalk" className="w-96">
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

/** Multiple — several panels can be open at once. */
export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" defaultValue={["chalk", "health"]} className="w-96">
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
