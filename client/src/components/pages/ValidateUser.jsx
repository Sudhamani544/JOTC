import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import FormInput from "../FormInput";
import { validPlayer, insertToUserTable } from "../../redux/actions/userAction";

const ValidateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      placeholder: "Date of birth",
      errorMessage: "age should be >=18",
      label: "Date of birth",
      required: true,
    },
  ];

  //Calculate age
  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let getAge = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      getAge--;
    }
    return getAge;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age = getAge(inputValues.dateOfBirth);

    let isValid;
    let email = JSON.parse(localStorage.getItem("emailId"));
    let validatedEmail = JSON.parse(localStorage.getItem("emailId"));
    console.log("validatedEmail", validatedEmail);

    //if email validated already, get result from local storage
    for (const i in validatedEmail) {
      if (validatedEmail[i] === inputValues.emailId) {
        isValid = true;
      }
    }

    //Validate emailId using API
    if (!isValid) {
      let fetchAPI;
      try {
        const item = await axios(
          `https://api.trumail.io/v2/lookups/json?email=${inputValues.emailId}`
        );
        fetchAPI = item.data;
        console.log("getReq", fetchAPI);
        if (fetchAPI.validFormat === true && fetchAPI.deliverable === true) {
          email.push(inputValues.emailId);
          console.log(email);
          localStorage.setItem("emailId", JSON.stringify(email));
          isValid = true;
        } else {
          isValid = false;
        }
      } catch (error) {
        console.error("error", error);
      }
    }

    //check if age and email are matching criteria
    if (isValid) {
      if (age >= 18) {
        localStorage.setItem("email", inputValues.emailId);
        dispatch(validPlayer(true));
        navigate("/game");
      } else {
        alert("age should be 18 years or older");
      }
    } else {
      alert("Please enter a valid email id");
    }
  };

  //set input values from the form
  const onChange = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const isValidPlayer = useSelector((state) => {
    return state.userReducer.isValidPlayer;
  });

  useEffect(() => {
    if (isValidPlayer === true) {
      dispatch(insertToUserTable(inputValues));
      dispatch(validPlayer(false));
    }
  }, [isValidPlayer]);

  console.log("inputvalues", inputValues);
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
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default ValidateUser;
