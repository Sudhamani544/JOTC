import React, { useState } from "react";
import { Link } from "react-router-dom";

import FormInput from "./FormInput";
import "./validateUser.css";

const ValidateUser = () => {
  const [inputValues, setInputValues] = useState({
    emailId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const inputs = [
    {
      id: 1,
      name: "emailId",
      type: "email",
      label: "Email",
      errorMessage: "please enter a valid email address",
      placeholder: "Email",
      required: true,
    },
    {
      id: 1,
      name: "firstName",
      type: "text",
      placeholder: "Firstname",
      errorMessage:
        "firstname should be 2-26 characters and no special characters,numbers",
      label: "Firstname",
      pattern: "^[A-Za-z]{2,26}$",
      required: true,
    },
    {
      id: 1,
      name: "lastName",
      type: "text",
      placeholder: "Lastname",
      errorMessage:
        "lastname should be 2-26 characters and no special characters,numbers",
      label: "Lastname",
      pattern: "^[A-Za-z]{2,26}$",
      required: true,
    },
    {
      id: 1,
      name: "dateOfBirth",
      type: "date",
      label: "Date of birth",
      errorMessage: "age should be >=18",
      placeholder: "Date of birth",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    localStorage.setItem("emailId", inputValues.emailId);
    localStorage.setItem("firstName", inputValues.firstName);
  };

  return (
    <div className="bg-image">
      <form className="form" onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={inputValues[input.name]}
            onChange={onChange}
          />
        ))}
        <button>
          {inputValues.emailId &&
          inputValues.firstName &&
          inputValues.lastName &&
          inputValues.dateOfBirth !== "" ? (
            <Link to={`/game`}>Submit</Link>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default ValidateUser;
