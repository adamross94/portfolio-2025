import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const getInitialTheme = () => {
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  } catch (_) {
    /* no-op */
  }
  return "light";
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {
      /* ignore */
    }
    const next = theme === "dark" ? "dark" : "light";
    [document.documentElement, document.body].forEach((node) => {
      if (!node) return;
      node.classList.remove("light", "dark");
      node.classList.add(next);
    });
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const value = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === "dark" }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div className={theme === "dark" ? "dark" : "light"}>{children}</div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within <ThemeProvider>");
  }
  return ctx;
}
