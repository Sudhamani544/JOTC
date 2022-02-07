import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { validUser } from "../redux/actions/userAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({ emailId: "", pwd: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let adminuser;
    try {
      const item = await axios(
        `http://localhost:5000/api/v1/user/email/${details.emailId}`
      );
      adminuser = item.data;
    } catch (error) {
      console.log("error", error);
    }

    if (
      details.emailId === adminuser[0].email_id &&
      details.pwd === adminuser[0].pwd &&
      adminuser[0].is_admin
    ) {
      dispatch(validUser(true));
      navigate("/admin/requests");
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input onChange={onChange} name="emailId"></input>
        <label>Password:</label>
        <input onChange={onChange} name="pwd"></input>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
