import { Skeleton } from "@mui/material";

function DetailsSkeleton() {
  return (
    <>
      <div className="details">
        <div className="name">
          <Skeleton variant="text" height="40px" width="170px" />
        </div>
        <div className="des-1">
          <Skeleton variant="text" width="150px" />
          <Skeleton variant="text" width="120px" />
          <Skeleton variant="text" width="150px" />
          <Skeleton variant="text" width="110px" />
          <Skeleton variant="text" width="150px" />
        </div>
        <div className="des-2">
          <Skeleton variant="text" width="120px" />
          <Skeleton variant="text" width="150px" />
          <Skeleton variant="text" width="120px" />
        </div>
        <div className="border-countries">
          <Skeleton variant="text" width="100px" /><br />
          <div className="countries">
            {Array.from(new Array(4)).map((_, ind) => {
              return (
                <Skeleton key={ind} variant="rounded" height='20px'/>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsSkeleton;
