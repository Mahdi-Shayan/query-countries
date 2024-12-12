import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Style
import "./home.scss";

// theme
import { token } from "../../theme/theme";

// MUI Materials
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

// Components
import HomeSkeleton from "../../components/home_skeleton";

function Home() {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const { data, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        return res.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

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
          {isLoading ? (
            <HomeSkeleton bg={colors.primary[100]}/>
          ) : (
            data?.map((country, i) => {
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
            })
          )}
        </div>
      </Box>
    </>
  );
}

export default Home;
