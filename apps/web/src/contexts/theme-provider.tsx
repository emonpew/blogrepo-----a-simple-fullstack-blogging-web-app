// providers/theme-provider.tsx
"use client";

import { useState, useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark class to HTML element
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      {children}
    </>
  );
}
