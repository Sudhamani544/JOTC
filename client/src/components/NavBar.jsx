import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { validUser } from "../redux/actions/userAction";

const NavBar = ({ setInputData }) => {
  const debouncedOnChange = debounce(setInputData, 1000);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(validUser(false));
    navigate("/admin/login");
  };

  return (
    <nav className="searchSort">
      <input
        onChange={debouncedOnChange}
        placeholder="Search…"
        className="searchSort__search"
      />
      <button onClick={onClick}>logout</button>
    </nav>
  );
};

export default NavBar;
