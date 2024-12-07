import { Outlet } from "react-router-dom";

function Main() {
  return (
    <>
      <div className="app">
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Main;
