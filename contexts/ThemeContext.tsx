import { createContext, useContext, useMemo, useState } from "react";

type ThemeOptions = "light" | "dark" | "system";

interface ThemeContextProps {
  colorMode: ThemeOptions;
  setColorMode: (mode: ThemeOptions) => void;
}

const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<ThemeOptions>("system");

  const value = useMemo(() => {
    return {
      colorMode,
      setColorMode,
    };
  }, [colorMode, setColorMode]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error("useTheme must be used within ThemeContextProvider");
  return ctx;
};
