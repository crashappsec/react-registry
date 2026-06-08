import { render, fireEvent, act } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/registry/crashoverride/ui/input-otp"

// The `input-otp` package schedules setTimeout(0/10/50) callbacks that dispatch
// synthetic `input` events and flush selection state after mount. Left to real
// timers those callbacks fire after the test unmounts the tree, leaking state
// updates into later tests and making the full-suite run flaky. Fake timers let
// us own that schedule: flush it inside act(), then restore real timers so the
// rest of the suite is unaffected.
describe("InputOTP", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Drain any timers the component scheduled, then hand control back.
    act(() => {
      vi.runOnlyPendingTimers()
    })
    vi.useRealTimers()
  })

  function Otp({ onComplete }: { onComplete?: (v: string) => void }) {
    return (
      <InputOTP maxLength={6} onComplete={onComplete}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    )
  }

  function renderOtp(onComplete?: (v: string) => void) {
    const result = render(<Otp onComplete={onComplete} />)
    // Flush the post-mount timers so the component reaches a stable state
    // before we assert or interact.
    act(() => {
      vi.runOnlyPendingTimers()
    })
    return result
  }

  it("renders a six-slot field with a hidden input", () => {
    const { container } = renderOtp()
    expect(
      container.querySelectorAll('[data-slot="input-otp-slot"]').length,
    ).toBe(6)
    expect(container.querySelector("input")).not.toBeNull()
  })

  it("renders the separator between groups", () => {
    const { container } = renderOtp()
    expect(
      container.querySelector('[data-slot="input-otp-separator"]'),
    ).not.toBeNull()
  })

  it("fires onComplete when all slots are filled", () => {
    const onComplete = vi.fn()
    const { container } = renderOtp(onComplete)
    const input = container.querySelector("input") as HTMLInputElement
    act(() => {
      fireEvent.change(input, { target: { value: "123456" } })
      vi.runOnlyPendingTimers()
    })
    expect(onComplete).toHaveBeenCalledWith("123456")
  })
})
