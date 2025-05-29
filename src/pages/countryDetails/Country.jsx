import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Style
import "./country.scss";

// Theme
import { useTheme } from "@emotion/react";
import { token } from "../../theme/theme";

// MUI Materials and icon
import { Box, Skeleton, Typography } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";

// Components
import DetailsSkeleton from "../../components/detailsPage_skeleton";

function Country() {
  const { name } = useParams();
  const navigate = useNavigate();

  const [lan, setLan] = useState([]);
  const [currency, setCurrency] = useState("");

  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const { data, isLoading } = useQuery({
    queryKey: ["country", name],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        // languages Key allow us to get native name for each country.
        // pass it to nativeNave.
        setLan(Object.keys(res.data[0].languages));

        return res.data[0];
      } catch (error) {
        console.error(error);
      }
    },
  });

  // get currencies Key.
  useEffect(() => {
    let x;
    for (x in data?.currencies) {
      setCurrency(x);
    }
  }, [data]);

  return (
    <>
      <Box
        className="details-grid"
        display="flex"
        gap="10%"
        p="5%"
        height="100%"
        maxWidth="100%"
        width="100%"
        sx={{
          "& span": {
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
          {isLoading ? (
            <Skeleton height="100%" width="100%" />
          ) : (
            <img src={data?.flags.svg} alt="flag" />
          )}
        </div>
        <div className="details">
          {isLoading ? (
            <DetailsSkeleton />
          ) : (
            <>
              <div className="name">
                <Typography variant="h2">{data?.name.common}</Typography>
              </div>
              <div className="des-1">
                <Typography>
                  Native Name:{" "}
                  <span>{data?.name?.nativeName[lan]?.common}</span>
                </Typography>

                <Typography>
                  Population:{" "}
                  <span>{data?.population?.toLocaleString()}</span>
                </Typography>

                <Typography>
                  Region: <span>{data?.region}</span>
                </Typography>

                {data?.subregion && (
                  <Typography>
                    Sub Region: <span>{data?.subregion}</span>
                  </Typography>
                )}

                <Typography>
                  Capital: <span>{data?.capital}</span>
                </Typography>
              </div>
              <div className="des-2">
                <Typography>
                  Top Level Domain: <span>{data?.tld}</span>
                </Typography>

                <Typography>
                  Currencies:{" "}
                  <span>{data?.currencies[currency]?.name}</span>
                </Typography>
                <Typography>
                  Languages: <span>{lan.join(", ")}</span>
                </Typography>
              </div>
              <div className="border-countries">
                <Typography>Border Countries:</Typography>
                <div className="countries">
                  {data?.borders ? (
                    data?.borders?.map((d, ind) => {
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
                    <span style={{ width: "max-content" }}>
                      There is No any border Country
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Box>
    </>
  );
}

export default Country;
