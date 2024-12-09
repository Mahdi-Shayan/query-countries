import { Route, Routes } from "react-router-dom";

// Layouts
import Main from "./layouts/main";

// Hooks
import { useMode } from "./hooks/useMode";

// Contexts
import { ColorModeContext } from "./contexts/ColorModeContext";

// Pages
import Home from "./pages/home/Home";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import Country from "./pages/countryDetails/Country";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path=":name" element={<Country />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
}

export default App;
