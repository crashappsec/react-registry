import * as React from "react"
import { Toaster as Sonner, toast, type ToasterProps } from "sonner"

/**
 * Crash Override — Toaster
 * Stacked toast system on the brand surfaces. Mount one `<Toaster />` near the
 * app root; fire toasts imperatively with the re-exported `toast()` (and its
 * variants — `toast.success`, `toast.error`, …). Built on `sonner`.
 *
 * Theme is detected from the document root (`.dark` / `.light` /
 * `[data-theme]`) — the same conventions the brand theme keys off of — so no
 * next-themes provider is required. Toasts inherit the brand tokens
 * (`--popover`, `--border`, `--primary`, mono description voice) via CSS vars.
 *
 *   <Toaster richColors />
 *   toast.success("Artifact tagged")
 */
function useDocumentTheme(): "dark" | "light" {
  const get = React.useCallback((): "dark" | "light" => {
    if (typeof document === "undefined") return "dark"
    const root = document.documentElement
    if (root.classList.contains("light")) return "light"
    if (root.classList.contains("dark")) return "dark"
    const attr = root.getAttribute("data-theme")
    return attr === "light" ? "light" : "dark"
  }, [])

  const [theme, setTheme] = React.useState<"dark" | "light">(get)

  React.useEffect(() => {
    if (typeof document === "undefined") return
    const root = document.documentElement
    const sync = () => setTheme(get())
    const observer = new MutationObserver(sync)
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    })
    // Catch any class/attr that changed between first render and effect attach.
    const id = requestAnimationFrame(sync)
    return () => {
      cancelAnimationFrame(id)
      observer.disconnect()
    }
  }, [get])

  return theme
}

function Toaster({ ...props }: ToasterProps) {
  const theme = useDocumentTheme()
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--font-family": "var(--font-sans)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          description: "font-mono text-xs text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
