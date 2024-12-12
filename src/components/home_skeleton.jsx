import { Skeleton } from "@mui/material";

function HomeSkeleton({ bg }) {
  return (
    <>
      {Array.from(new Array(16)).map((_, ind) => {
        return (
          <div
            key={ind}
            className="country"
            style={{ backgroundColor: bg }}
          >
            <Skeleton variant="rectangular" height="45%" />
            <div className="about">
              <Skeleton variant="text" width="40%" />
              <br />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default HomeSkeleton;
