import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "./DataTable";
import { getRequest, sortTableBy } from "../redux/actions/reqAction";
import NavBar from "./NavBar";

const Requests = () => {
  const dispatch = useDispatch();

  const asc = useSelector((state) => {
    return state.requestReducer.asc;
  });

  const [searchInput, setSearchInput] = useState("");

  const inputHandler = (e) => {
    setSearchInput(e.target.value);
    filterData(e.target.value);
  };

  useEffect(() => {
    dispatch(getRequest());
  }, [dispatch]);

  const requests = useSelector((state) => {
    return state.requestReducer.requests;
  });

  const [data, setData] = useState(requests);

  const sortData = (e) => {
    if (e.target.innerHTML === "EMAIL ID") {
      setData(requests);
      dispatch(sortTableBy("email_id", asc));
    } else {
      setData(requests);
      dispatch(sortTableBy("date", asc));
    }
  };

  const columns = [
    {
      label: "ID",
      renderContent: (request) => {
        return request.id;
      },
    },
    {
      label: <button onClick={sortData}>EMAIL ID</button>,
      renderContent: (request) => {
        return request.email_id;
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
      label: <button onClick={sortData}>DATE</button>,
      renderContent: (request) => {
        return request.date;
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

  // exclude column list from filter
  const excludeColumns = ["id", "inp_len", "pattern", "output"];

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(requests);
    else {
      const filteredData = requests.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  };

  return (
    <>
      {isValidUser ? (
        <div>
          <NavBar inputData={searchInput} setInputData={inputHandler} />
          <DataTable items={data} columns={columns} />
        </div>
      ) : (
        <div>
          you are not authorized to view the page, please login to view the
          details
        </div>
      )}
    </>
  );
};

export default Requests;
