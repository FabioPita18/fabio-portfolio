import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (coords?: { x: number; y: number }) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(
    (coords?: { x: number; y: number }) => {
      const newTheme = theme === "dark" ? "light" : "dark";
      const root = document.documentElement;

      // Fallback: instant swap if no coords or no View Transitions API
      if (
        !coords ||
        !("startViewTransition" in document) ||
        typeof (document as Record<string, unknown>).startViewTransition !== "function"
      ) {
        setTheme(newTheme);
        return;
      }

      const { x, y } = coords;
      const maxR = Math.max(
        Math.hypot(x, y),
        Math.hypot(window.innerWidth - x, y),
        Math.hypot(x, window.innerHeight - y),
        Math.hypot(window.innerWidth - x, window.innerHeight - y)
      );

      root.style.setProperty("--vt-x", `${x}px`);
      root.style.setProperty("--vt-y", `${y}px`);
      root.style.setProperty("--vt-r", `${maxR}px`);

      (document as Document & { startViewTransition: (cb: () => void) => void }).startViewTransition(() => {
        root.setAttribute("data-theme", newTheme);
        flushSync(() => setTheme(newTheme));
      });
    },
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
