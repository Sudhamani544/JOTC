import { Route, Routes } from "react-router-dom";

import Game from "./components/pages/Game";
import Requests from "./components/pages/Requests";
import Login from "./components/pages/Login";
import ValidateUser from "./components/pages/ValidateUser";
import "./App.css";

function App() {
  return (
    <div className="bgImage">
      <Routes>
        <Route path="/" element={<ValidateUser />} />
        <Route path="/game" element={<Game />} />
        <Route path="/admin/requests" element={<Requests />} />
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
