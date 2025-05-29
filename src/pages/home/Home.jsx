import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Style
import "./home.scss";

// theme
import { token } from "../../theme/theme";

// MUI Materials
import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";

// Components
import HomeSkeleton from "../../components/home_skeleton";
import TopBar from "../../components/top-bar/TopBar";
import ShowData from "../../components/showData";

function Home() {
  const theme = useTheme();
  const colors = token(theme.palette.mode);

  const [filter_res, setFilter_res] = useState() 

  const { data, isLoading } = useQuery({
    queryKey: ["countries", 'all'],
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
          "& span": {
            color:
              theme.palette.mode === "dark"
                ? "rgb(191, 191, 191)"
                : "rgb(110, 110, 110)",
          },
        }}
        p="40px 5%"
      >
        <TopBar setFilter_res={setFilter_res}/>
        <div className="countries-grid">
          {isLoading ? (
            <HomeSkeleton bg={colors.primary[100]}/>
          ) : filter_res 
            ? <ShowData colors={colors} data={filter_res}/>
            : <ShowData colors={colors} data={data}/>
          }
        </div>
      </Box>
    </>
  );
}

export default Home;
