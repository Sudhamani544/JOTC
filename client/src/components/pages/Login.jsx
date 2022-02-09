import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { validUser } from "../../redux/actions/userAction";

const Login = () => {
  const [details, setDetails] = useState({ emailId: "", pwd: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //On submit, get admin details from table
    let adminuser;
    try {
      const item = await axios(
        `https://jotclouds.herokuapp.com/api/v1/user/email/${details.emailId}`
      );
      adminuser = item.data;
    } catch (error) {
      console.log("error", error);
    }

    //validate admin user, if success then login
    if (
      details.emailId === adminuser[0].email_id &&
      details.pwd === adminuser[0].pwd &&
      adminuser[0].is_admin
    ) {
      // localStorage.setItem("isValidUser", true);
      dispatch(validUser(true));
      navigate("/admin/requests");
    } else {
      alert("EmailId and password doesn't match");
    }
  };

  //update details State
  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input onChange={onChange} name="emailId" />
        <label>Password</label>
        <input onChange={onChange} type="password" name="pwd" />
        <button className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
