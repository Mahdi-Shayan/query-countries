import { useContext } from "react";

// Context
import { ColorModeContext } from "../../contexts/ColorModeContext";

// Style
import "./nav.scss";

// Mui Materials
import { useTheme } from "@emotion/react";
import { Box, IconButton, Typography } from "@mui/material";

// theme
import { token } from "../../theme/theme";

// Icons
import { LightMode, NightsStay } from "@mui/icons-material";

function Nav() {
  const theme = useTheme();
  const { mode } = theme.palette;
  const colors = token(mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Box p="20px 70px" bgcolor={colors.primary[100]} boxShadow='0 0 7px rgba(0, 0, 0, 0.15)'>
        <nav>
          <div className="title">
            <Typography variant="h4">Where in the world?</Typography>
          </div>
          <div className="theme-mode-toggle">
            <IconButton size="small" onClick={colorMode}>
              {mode === "dark" ? (
                <NightsStay fontSize="small" />
              ) : (
                <LightMode fontSize="small" />
              )}
            </IconButton>
            <Typography fontSize="14px">
              {mode === "dark" ? "Dark " : "Light "}
              Mode
            </Typography>
          </div>
        </nav>
      </Box>
    </>
  );
}

export default Nav;
