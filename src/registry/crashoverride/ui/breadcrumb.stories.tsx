import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./breadcrumb"
import { Slash } from "lucide-react"

/**
 * Breadcrumb — a hierarchical path; links run in the muted mono voice and lift
 * to the foreground on hover, while the last item is the bold, non-link current
 * page. Hover the links in any story below to see them respond live.
 */
const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical shadcn/Radix Breadcrumb. Compose `BreadcrumbList` of `BreadcrumbItem`s — `BreadcrumbLink` (use `asChild` for a router link) for steps, `BreadcrumbPage` for the current page, `BreadcrumbSeparator` between them, and `BreadcrumbEllipsis` to collapse a long trail.",
      },
    },
  },
  argTypes: {},
  args: {},
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

/** Fully interactive — a three-step trail to the current page. */
export const Playground: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Portfolio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Services</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>prod-bandwidth-system</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** A collapsed trail — the middle is summarised with an ellipsis. */
export const WithEllipsis: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Portfolio</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Services</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>advisories</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

/** A custom separator glyph passed as children. */
export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">crashappsec</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">compass</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>README.md</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}
