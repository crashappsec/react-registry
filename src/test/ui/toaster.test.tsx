import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { Toaster, toast } from "@/registry/crashoverride/ui/toaster"

describe("Toaster", () => {
  it("mounts the sonner region once a toast is queued", async () => {
    render(<Toaster />)
    // sonner only mounts its [data-sonner-toaster] region once there is a toast.
    toast("hello")
    await waitFor(() =>
      expect(document.querySelector("[data-sonner-toaster]")).not.toBeNull(),
    )
  })

  it("re-exports toast and shows a fired toast", async () => {
    expect(typeof toast).toBe("function")
    render(
      <>
        <Toaster />
        <button onClick={() => toast("Artifact tagged")}>fire</button>
      </>,
    )
    fireEvent.click(screen.getByText("fire"))
    await waitFor(() =>
      expect(screen.getByText("Artifact tagged")).toBeInTheDocument(),
    )
  })
})
