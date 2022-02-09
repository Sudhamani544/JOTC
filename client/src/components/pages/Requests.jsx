import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

import DataTable from "../DataTable";
import { getRequest, getRequestByDate } from "../../redux/actions/reqAction";
import NavBar from "../NavBar";

const Requests = () => {
  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState("");
  const [date, setDate] = useState({ fromDate: "", toDate: "" });

  const inputHandler = (e) => setSearchInput(e.target.value);
  const fromDate = (e) => setDate({ ...date, [e.target.name]: e.target.value });
  const toDate = (e) => setDate({ ...date, [e.target.name]: e.target.value });

  // const isValidUser = localStorage.getItem("isValidUser");

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  //filter by date
  const filterDates = (e) => {
    if (
      (date.fromDate != "" || date.toDate != "") &&
      date.fromDate <= date.toDate
    ) {
      dispatch(getRequestByDate(date.fromDate, date.toDate));
    } else {
      alert("Please enter valid dates");
    }
  };

  const requests = useSelector((state) => {
    return state.requestReducer.requests;
  });

  const columns = [
    {
      label: "EMAIL ID",
      renderContent: (request) => {
        return request.email_id;
      },
    },
    {
      label: "DATE",
      renderContent: (request) => {
        return moment(moment.utc(request.date)).local().format("YYYY/MM/DD");
      },
    },
    {
      label: "LENGTH",
      renderContent: (request) => {
        return request.inp_len;
      },
    },
    {
      label: "PATTERN",
      renderContent: (request) => {
        return request.pattern;
      },
    },
    {
      label: "OUTPUT",
      renderContent: (request) => {
        return request.output;
      },
    },
  ];

  const isValidUser = useSelector((state) => {
    return state.userReducer.isValid;
  });

  return (
    <>
      {!!isValidUser ? (
        <div>
          <NavBar
            setInputData={inputHandler}
            fromDate={fromDate}
            toDate={toDate}
            filterDates={filterDates}
          />
          <DataTable
            items={requests.filter((request) =>
              request.email_id.toLowerCase().includes(searchInput.toLowerCase())
            )}
            columns={columns}
          />
        </div>
      ) : (
        <div>
          You are not authorized to view the page, please
          <Link to={`/admin/login`}> login </Link> to view the details
        </div>
      )}
    </>
  );
};

export default Requests;
