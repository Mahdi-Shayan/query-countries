import { Route, Routes } from "react-router-dom";

// Layouts
import Main from "./layouts/main";

// Pages
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;