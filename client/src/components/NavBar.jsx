import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

import { validUser } from "../redux/actions/userAction";

const NavBar = ({ setInputData, fromDate, toDate, filterDates }) => {
  const debouncedOnChange = debounce(setInputData, 1000);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = (e) => {
    dispatch(validUser(false));
    navigate("/");
  };

  return (
    <nav className="navBar">
      <input
        className="searchInput"
        onChange={debouncedOnChange}
        placeholder="Search by email…"
        style={{ height: "25px" }}
      />
      <div className="filterDate">
        <div className="fromDate">
          From: <input type="date" onChange={fromDate} name="fromDate" />
        </div>
        <div className="toDate">
          To: <input type="date" onChange={toDate} name="toDate" />
        </div>
        <button onClick={filterDates} className="btnExecute">
          Filter
        </button>
      </div>
      <button className="btnLogout" onClick={onClick}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
