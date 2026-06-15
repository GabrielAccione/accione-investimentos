import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem("theme") as Theme) ?? "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
    root.style.colorScheme = theme;
    root.style.backgroundColor = "transparent";
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme fora do ThemeProvider");
  return ctx;
}
