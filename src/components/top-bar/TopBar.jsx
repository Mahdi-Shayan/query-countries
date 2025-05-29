import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

// MUI Materials and icon
import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

// Style
import "./top-bar.scss";

// theme
import { token } from "../../theme/theme";
import axios from "axios";
import { Link } from "react-router-dom";

function TopBar({ setFilter_res }) {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const [filter, setFilter] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [search] = useDebounce(searchItem, 500);

  // Handle Search result container
  const [err, setErr] = useState("");
  const [search_res, setSearch_res] = useState([]);
  const [open, setOpen] = useState(false);

  // Filter by Region
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const filterRegion = async () => {
      if (filter) {
        try {
          let URL = `https://restcountries.com/v3.1/region/${filter.toLowerCase()}`;

          if (filter.toLowerCase() === "all") {
            URL = "https://restcountries.com/v3.1/all";
          }

          const res = await axios.get(URL, { signal });

          if (isMount) {
            setFilter_res(res.data);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    filterRegion();

    return () => {
      controller.abort();
      isMount = false;
    };
  }, [filter, setFilter_res]);

  // Search countries by name
  useEffect(() => {
    let isMount = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const searchCountries = async () => {
      if (search !== "" && search.length > 1) {
        try {
          const res = await axios.get(
            `https://restcountries.com/v3.1/translation/${search}`,
            { signal }
          );

          if (isMount) {
            setSearch_res(
              res.data.filter(
                (country) =>
                  country.name.common.toLowerCase().includes(search)
              )
            );
            setOpen(true);
          }
        } catch (err) {
          if (err?.response?.data.status === 404) {
            setErr("No Country found!");
          }
          setSearch_res([]);
          setOpen(true);
        }
      }
    };

    searchCountries();

    return () => {
      controller.abort();
      isMount = false;
    };
  }, [search]);

  function handleChange(e) {
    setSearchItem(e.target.value);
    if (e.target.value === "") {
      setOpen(false);
      setSearch_res([]);
    }
  }
  function handleClick() {
    if (search_res.length > 0) {
      setOpen(true);
    }
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="50px"
        className='top-bar'
      >
        <div
          className="search-box"
          style={{
            backgroundColor: colors.primary[100],
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
          <InputBase
            value={searchItem}
            onBlur={() => setTimeout(() => setOpen(false), 100)}
            onChange={handleChange}
            onClick={handleClick}
            sx={{ ml: 1, flex: "1", fontSize: "15px" }}
            placeholder="Search for a country..."
            inputProps={{ "aria-label": "Search for a country" }}
          />
          <div
            className="search-res"
            style={{
              display: open ? "block" : "none",
              backgroundColor: colors.primary[100],
            }}
          >
            <div className="res">
              {search_res.length > 0 ? (
                search_res.map((country, ind) => {
                  return (
                    <Link
                      to={`/${country.name.common}`}
                      key={ind}
                      style={{ color: colors.txt[100] }}
                    >
                      <Typography variant="h6">
                        {country.name.common}
                      </Typography>
                      <img src={country.flags.svg} alt="flag" />
                    </Link>
                  );
                })
              ) : (
                <Typography textAlign="center" variant="h5">
                  {err}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <FormControl
          style={{
            width: "150px",
            backgroundColor: colors.primary[100],
            borderRadius: "4px",
            boxShadow: "0 0 7px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Fiter by Region" }}
          >
            <MenuItem sx={{ display: "none" }} value="">
              Filter by Region
            </MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="America">America</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europa">Europa</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
            <MenuItem value="All">All</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default TopBar;
