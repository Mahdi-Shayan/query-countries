import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Style
import "./country.scss";

// Theme
import { useTheme } from "@emotion/react";
import { token } from "../../theme/theme";

// MUI Materials and icon
import { Box, Typography } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";

function Country() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [details, setDetails] = useState({});
  const [lan, setLan] = useState([]);
  const [currency, setCurrency] = useState("");

  const theme = useTheme();
  const colors = token(theme.palette.mode);

  useEffect(() => {
    let isMount = true;
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        if (isMount) {
          setDetails(res.data);

          // languages Key allow us to get native name for each country.
          // pass it to nativeNave.
          setLan(Object.keys(res.data[0].languages));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();

    return () => (isMount = false);
  }, []);

  // get currencies Key.
  useEffect(() => {
    let x;
    for (x in details[0]?.currencies) {
      setCurrency(x);
    }
  }, [details]);

  return (
    <>
      <Box
        display="flex"
        gap="100px"
        p="70px"
        height="650px"
        maxWidth="max-content"
        width="100%"
        sx={{
          ["& span"]: {
            color:
              theme.palette.mode === "dark"
                ? "rgb(191, 191, 191)"
                : "rgb(110, 110, 110)",
          },
        }}
      >
        <div className="flag">
          <button
            className="back-btn"
            style={{
              backgroundColor: colors.primary[100],
              color: colors.txt[100],
            }}
            onClick={() => navigate(-1)}
          >
            <KeyboardBackspace />
            Back
          </button>
          <img src={details[0]?.flags.svg} alt="flag" />
        </div>
        <div className="details">
          <div className="name">
            <Typography variant="h2">{details[0]?.name.common}</Typography>
          </div>
          <div className="des-1">
            <Typography>
              Native Name:{" "}
              <span>{details[0]?.name?.nativeName[lan[0]]?.common}</span>
            </Typography>

            <Typography>
              Population:{" "}
              <span>{details[0]?.population.toLocaleString()}</span>
            </Typography>

            <Typography>
              Region: <span>{details[0]?.region}</span>
            </Typography>

            {details[0]?.subregion && (
              <Typography>
                Sub Region: <span>{details[0]?.subregion}</span>
              </Typography>
            )}

            <Typography>
              Capital: <span>{details[0]?.capital}</span>
            </Typography>
          </div>
          <div className="des-2">
            <Typography>
              Top Level Domain: <span>{details[0]?.tld}</span>
            </Typography>

            <Typography>
              Currencies:{" "}
              <span>{details[0]?.currencies[currency]?.name}</span>
            </Typography>
            <Typography>
              Languages: <span>{lan.join(', ')}</span>
            </Typography>
          </div>
          <div className="border-countries">
            <Typography>Border Countries:</Typography>
            {details[0]?.borders ? (
              details[0]?.borders?.map((d, ind) => {
                return (
                  <span
                    key={ind}
                    className="btn"
                    style={{
                      backgroundColor: colors.primary[100],
                    }}
                  >
                    {d}
                  </span>
                );
              })
            ) : (
              <span>There is No any border Country</span>
            )}
          </div>
        </div>
      </Box>
    </>
  );
}

export default Country;
