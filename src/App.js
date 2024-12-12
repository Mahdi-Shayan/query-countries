import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layouts
import Main from "./layouts/main";

// Hooks
import { useMode } from "./hooks/useMode";

// Contexts
import { ColorModeContext } from "./contexts/ColorModeContext";

// Pages
import Home from "./pages/home/Home";
import Country from "./pages/countryDetails/Country";

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries :{
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
    }
  }
});

function App() {
  const [theme, colorMode] = useMode();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

export default App;
