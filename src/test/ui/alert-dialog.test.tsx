import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect } from "vitest"
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

function Example() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete service?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

describe("AlertDialog", () => {
  it("renders the trigger and keeps the dialog closed until clicked", () => {
    render(<Example />)
    expect(screen.getByText("Delete")).toBeInTheDocument()
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })

  it("opens on trigger click onto the popover surface with the action mapped to the destructive token", () => {
    render(<Example />)
    fireEvent.click(screen.getByText("Delete"))
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toMatch(/bg-popover/)
    expect(dialog.className).toMatch(/border-border/)
    expect(screen.getByText("Delete service?")).toBeInTheDocument()

    const action = screen.getByRole("button", { name: "Delete" })
    expect(action.getAttribute("data-variant")).toBe("destructive")
    expect(action.className).toMatch(/bg-destructive/)
  })
})
