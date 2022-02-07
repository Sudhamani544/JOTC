import { Route, Routes } from "react-router-dom";
import Game from "./components/Game";
import Requests from "./components/Requests";
import Login from "./components/Login";

import "./App.css";
import ValidateUser from "./components/ValidateUser";

function App() {
  return (
    <div>
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
