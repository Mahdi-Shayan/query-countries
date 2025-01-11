import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ShowData({ data, colors }) {
  return (
    <>
      {data?.map((country, i) => {
        return (
          <Link
            to={`${country.name.common.toLowerCase()}`}
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
                <Typography variant="h5">{country.name.common}</Typography>
              </div>
              <div className="des">
                <Typography>
                  Population:{" "}
                  <span>{country.population.toLocaleString()}</span>
                </Typography>
                <Typography>
                  Region: <span>{country.region}</span>
                </Typography>
                <Typography>
                  Capital: <span>{country.capital}</span>
                </Typography>
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default ShowData;
