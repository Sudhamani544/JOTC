import React, { useState, useEffect } from "react";
import axios from "axios";
const Email = () => {
  const [emailId, setEmailId] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setEmailId(e.target.value);
  };

  const handleFocus = async (e) => {
    console.log("email", emailId);
    const getData = await axios(
      "https://api.trumail.io/v2/lookups/json?email=${emailId}"
    );
    console.log("getData", getData);
    //   const emailId = item.data;
  };

  return (
    <div>
      <input onChange={handleChange} onBlur={handleFocus}></input>
    </div>
  );
};

export default Email;
