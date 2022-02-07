import React from "react";
import Box from "@mui/material/Box";
import "./output.css";

const Output = (props) => {
  const { inp_len, pattern, output } = props;

  return (
    <div className="output">
      <h1>output: {output}</h1>
      {/* {pattern.map((item) => item)} */}
    </div>
  );
};

export default Output;
