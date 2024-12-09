import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// Style
import "./home.scss";

// theme
import { token } from "../../theme/theme";

// MUI Materials
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

function Home() {
  const theme = useTheme();
  const colors = token(theme.palette.mode);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    const fetchCountries = async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all", {
          signal: controller.signal,
        });
        console.log(res.data);
        if (isMount) {
          setCountries(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();

    return () => {
      isMount = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          ["& span"]: {
            color:
              theme.palette.mode === "dark"
                ? "rgb(191, 191, 191)"
                : "rgb(110, 110, 110)",
          },
        }}
        p="40px 70px"
      >
        <div className="countries-grid">
          {countries?.map((country, i) => {
            return (
              <Link
                to={`/${country.name.common.toLowerCase()}`}
                key={i}
                className="country"
                style={{
                  backgroundColor: colors.primary[100],
                  boxShadow: "0 0 7px rgba(0, 0, 0, 0.15)",
                  color: colors.txt[100],
                }}
              >
                <div className="img">
                  <img src={country.flags.svg} alt="flag" />
                </div>
                <div className="about">
                  <div className="name">
                    <Typography variant="h5">
                      {country.name.common}
                    </Typography>
                  </div>
                  <div className="des">
                    <Typography>
                      Population:{" "}
                      <span>{country.population.toLocaleString()}</span>
                    </Typography>
                    <Typography>
                      Region: <span>{country.name.common}</span>
                    </Typography>
                    <Typography>
                      Capital: <span>{country.capital}</span>
                    </Typography>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Box>
    </>
  );
}

export default Home;
