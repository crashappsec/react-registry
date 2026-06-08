import { useState } from "react"
import { Stack, Group, Center, Box, Grid } from "@/registry/crashoverride/ui/layout"
import { Divider } from "@/registry/crashoverride/ui/divider"
import { Button } from "@/registry/crashoverride/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/crashoverride/ui/card"
import { Badge } from "@/registry/crashoverride/ui/badge"
import { Input } from "@/registry/crashoverride/ui/input"
import { Label } from "@/registry/crashoverride/ui/label"
import { Field } from "@/registry/crashoverride/ui/field"
import { Textarea } from "@/registry/crashoverride/ui/textarea"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/registry/crashoverride/ui/select"
import { Checkbox } from "@/registry/crashoverride/ui/checkbox"
import { Switch } from "@/registry/crashoverride/ui/switch"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/registry/crashoverride/ui/radio-group"
import { Slider } from "@/registry/crashoverride/ui/slider"
import { Toggle } from "@/registry/crashoverride/ui/toggle"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/crashoverride/ui/toggle-group"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/registry/crashoverride/ui/dialog"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/registry/crashoverride/ui/sheet"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/registry/crashoverride/ui/drawer"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/registry/crashoverride/ui/popover"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/registry/crashoverride/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/registry/crashoverride/ui/dropdown-menu"
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@/registry/crashoverride/ui/command"
import { Combobox } from "@/registry/crashoverride/ui/combobox"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/registry/crashoverride/ui/tabs"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/crashoverride/ui/accordion"
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/registry/crashoverride/ui/collapsible"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/registry/crashoverride/ui/alert-dialog"
import { Search } from "lucide-react"

/**
 * Specimen app — local visual QA for the Crash Override registry.
 * Dark is the brand default; a toggle flips to light via [data-theme="light"]
 * on the document root. Each registry item gets a section here as it lands.
 */
export function App() {
  const [light, setLight] = useState(false)

  function toggle() {
    const root = document.documentElement
    const next = !light
    setLight(next)
    // Support both selector conventions the theme keys off of.
    root.setAttribute("data-theme", next ? "light" : "dark")
    root.classList.toggle("light", next)
    root.classList.toggle("dark", !next)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-10">
      <header className="flex items-center justify-between border-b border-border pb-6 mb-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-chart-1">
            01 · design system
          </p>
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Crash Override
          </h1>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="bg-secondary text-secondary-foreground rounded-md px-4 h-10 font-mono text-sm border border-border"
        >
          {light ? "→ dark" : "→ light"}
        </button>
      </header>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Theme proof
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-primary text-primary-foreground rounded-md px-4 h-10 font-semibold">
            Primary action
          </button>
          <div className="bg-card text-card-foreground border border-border rounded-md px-4 py-3">
            Raised card surface
          </div>
          <span className="text-destructive font-mono text-sm">destructive</span>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Button
        </h2>
        <Group className="flex-wrap">
          <Button>Get Started</Button>
          <Button variant="secondary">Read the docs</Button>
          <Button variant="enterprise">Talk to a Human</Button>
          <Button variant="ghost">Cancel</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </Group>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Layout primitives
        </h2>
        <Stack className="gap-4">
          <Group className="gap-2">
            <Box className="bg-card border border-border rounded-md px-3 py-2">Group A</Box>
            <Box className="bg-card border border-border rounded-md px-3 py-2">Group B</Box>
          </Group>
          <Divider />
          <Grid className="grid-cols-3">
            <Box className="bg-card border border-border rounded-md p-4">1</Box>
            <Box className="bg-card border border-border rounded-md p-4">2</Box>
            <Box className="bg-card border border-border rounded-md p-4">3</Box>
          </Grid>
          <Center className="h-24 bg-card border border-border rounded-md">
            <span className="font-mono text-sm">centered</span>
          </Center>
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Card
        </h2>
        <Grid className="grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Plain card</CardTitle>
              <CardDescription>hairline border, no shadow</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Contrast comes from the border, never a background lift.
            </CardContent>
          </Card>
          <Card accent="magenta" interactive>
            <CardHeader>
              <CardTitle>Capability card</CardTitle>
              <CardDescription>accent bar + hover</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Hover me — border brightens, surface lifts.
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Inspect
              </Button>
            </CardFooter>
          </Card>
          <Card accent="neon">
            <CardHeader>
              <CardTitle>Neon accent</CardTitle>
              <CardDescription>lime capability bar</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Any palette key or CSS colour works.
            </CardContent>
          </Card>
        </Grid>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Badge
        </h2>
        <Group className="flex-wrap">
          <Badge tone="neon" dot>
            active
          </Badge>
          <Badge tone="cobalt">enterprise</Badge>
          <Badge tone="magenta" variant="outline">
            inspect
          </Badge>
          <Badge tone="amber">3 expiring</Badge>
          <Badge tone="teal" variant="outline">
            healthy
          </Badge>
          <Badge tone="danger" dot>
            critical
          </Badge>
          <Badge>neutral</Badge>
        </Group>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Forms — Input / Label / Field / Textarea
        </h2>
        <Stack className="gap-4 max-w-md">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="bare-email">Work email</Label>
            <Input id="bare-email" type="email" placeholder="you@company.com" />
          </div>
          <Field label="API key" htmlFor="api-key" hint="Read-only token" required>
            <Input id="api-key" placeholder="ghp_…" />
          </Field>
          <Field label="Email" htmlFor="err-email" error="Required">
            <Input id="err-email" type="email" placeholder="you@company.com" />
          </Field>
          <Field label="Incident notes" htmlFor="notes">
            <Textarea id="notes" rows={4} placeholder="Describe the incident…" />
          </Field>
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Select
        </h2>
        <Stack className="gap-4 max-w-md">
          <Field label="Region" htmlFor="region">
            <Select>
              <SelectTrigger id="region">
                <SelectValue placeholder="Pick a region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east-1">us-east-1</SelectItem>
                <SelectItem value="eu-west-1">eu-west-1</SelectItem>
                <SelectItem value="ap-south-1">ap-south-1</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Checkbox / Switch
        </h2>
        <Stack className="gap-4">
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Notify on critical findings
          </label>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox /> I agree to the terms
          </label>
          <Group className="gap-3">
            <Switch defaultChecked aria-label="auto-remediate" />
            <span className="text-sm">Auto-remediate</span>
          </Group>
          <Group className="gap-3">
            <Switch aria-label="public" />
            <span className="text-sm">Public registry</span>
          </Group>
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          RadioGroup
        </h2>
        <RadioGroup defaultValue="prod">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="prod" /> Production
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="staging" /> Staging
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="dev" /> Development
          </label>
        </RadioGroup>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Slider
        </h2>
        <Stack className="gap-6 max-w-md">
          <Slider defaultValue={[40]} aria-label="threshold" />
          <Slider defaultValue={[20, 80]} aria-label="range" />
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Toggle / ToggleGroup
        </h2>
        <Stack className="gap-4">
          <Group className="gap-2">
            <Toggle defaultPressed aria-label="bold">
              B
            </Toggle>
            <Toggle aria-label="italic">I</Toggle>
            <Toggle variant="outline" aria-label="underline">
              U
            </Toggle>
          </Group>
          <ToggleGroup type="single" defaultValue="grid">
            <ToggleGroupItem value="grid">grid</ToggleGroupItem>
            <ToggleGroupItem value="list">list</ToggleGroupItem>
            <ToggleGroupItem value="board">board</ToggleGroupItem>
          </ToggleGroup>
          <ToggleGroup type="multiple" defaultValue={["bold"]} size="sm">
            <ToggleGroupItem value="bold">B</ToggleGroupItem>
            <ToggleGroupItem value="italic">I</ToggleGroupItem>
            <ToggleGroupItem value="underline">U</ToggleGroupItem>
          </ToggleGroup>
        </Stack>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Overlays — Dialog / Sheet / Drawer
        </h2>
        <Group className="flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Rotate key</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rotate API key</DialogTitle>
                <DialogDescription>
                  Your current key stops working immediately.
                </DialogDescription>
              </DialogHeader>
              <Field label="Confirm service name" htmlFor="confirm-name">
                <Input id="confirm-name" placeholder="zero-test-org" />
              </Field>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button>Rotate</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary">Filters</Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Narrow the result set.</SheetDescription>
              </SheetHeader>
              <Stack className="gap-3 mt-4">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox defaultChecked /> Healthy
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox /> At risk
                </label>
              </Stack>
            </SheetContent>
          </Sheet>

          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost">Quick actions</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Quick actions</DrawerTitle>
                <DrawerDescription>Run a task on this service.</DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Re-scan now</Button>
                <DrawerClose asChild>
                  <Button variant="secondary">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Group>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Overlays — Popover / Tooltip / DropdownMenu
        </h2>
        <TooltipProvider>
          <Group className="flex-wrap">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost">Info</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">Beaconing from prod since 14:02.</p>
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Copy SBOM</Button>
              </TooltipTrigger>
              <TooltipContent>copy sbom</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary">More</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Service</DropdownMenuLabel>
                <DropdownMenuItem>
                  Rename
                  <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>Re-scan</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Group>
        </TooltipProvider>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Command palette
        </h2>
        <div className="max-w-md rounded-lg border border-border shadow-md">
          <Command>
            <CommandInput placeholder="Type a command or search…" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Actions">
                <CommandItem>
                  <Search />
                  Search services
                  <CommandShortcut>⌘K</CommandShortcut>
                </CommandItem>
                <CommandItem>Re-scan org</CommandItem>
              </CommandGroup>
              <CommandGroup heading="Navigation">
                <CommandItem>Go to dashboard</CommandItem>
                <CommandItem>Open settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Combobox
        </h2>
        <div className="max-w-xs">
          <Combobox
            options={["us-east-1", "eu-west-1", "ap-south-1"]}
            placeholder="Pick a region"
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Tabs
        </h2>
        <Tabs defaultValue="30d" className="max-w-md">
          <TabsList>
            <TabsTrigger value="30d">30 days</TabsTrigger>
            <TabsTrigger value="all">All time</TabsTrigger>
            <TabsTrigger value="pipe">
              Pipeline
              <Badge tone="amber">7</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="30d" className="text-sm text-muted-foreground">
            Last 30 days of activity.
          </TabsContent>
          <TabsContent value="all" className="text-sm text-muted-foreground">
            Everything ever recorded.
          </TabsContent>
          <TabsContent value="pipe" className="text-sm text-muted-foreground">
            7 services in the pipeline.
          </TabsContent>
        </Tabs>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Accordion
        </h2>
        <Accordion type="single" collapsible className="max-w-md">
          <AccordionItem value="chalk">
            <AccordionTrigger>What does Chalk record?</AccordionTrigger>
            <AccordionContent>
              A deterministic SBOM + provenance for every build artifact.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="oss">
            <AccordionTrigger>Is it open source?</AccordionTrigger>
            <AccordionContent>Yes — GPL-licensed.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          Collapsible
        </h2>
        <Collapsible className="max-w-md space-y-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost">Toggle details</Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="rounded-md border border-border p-3 text-sm text-muted-foreground">
            3 services beaconing from prod since 14:02.
          </CollapsibleContent>
        </Collapsible>
      </section>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground mb-4 font-mono">
          AlertDialog
        </h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Delete service</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete service?</AlertDialogTitle>
              <AlertDialogDescription>
                This permanently removes the service and its scan history. This
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  )
}
