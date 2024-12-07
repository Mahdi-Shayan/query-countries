import { useCallback, useMemo, useState } from "react";

// MUI Materials
import { createTheme } from "@mui/material";

// theme
import { themeSettings } from "../theme/theme";

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useCallback(() => {
    setMode((pre) => (pre === "dark" ? "light" : "dark"));
  }, []);

  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]));
  return [theme, colorMode];
};
