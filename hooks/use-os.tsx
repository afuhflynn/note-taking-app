export function useDesktopOS(e: KeyboardEvent) {
  let os: "Ctrl" | "Cmd" | "unknown" = "unknown";

  if (typeof window === "undefined") return;

  const platform = navigator.userAgent.toLowerCase();

  if (platform.includes("mac") && e?.ctrlKey) {
    os = "Cmd";
  } else if (platform.includes("win") && e?.ctrlKey) {
    os = "Ctrl";
  } else if (platform.includes("linux") && e?.ctrlKey) {
    os = "Ctrl";
  }

  return os;
}
