import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";

function Main() {
  return (
    <>
      <div className="app">
        <Nav />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Main;
