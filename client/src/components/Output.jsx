import React from "react";

const Output = (props) => {
  const { inp_len, pattern, output } = props;

  return (
    <div className="output">
      <h1>Output: {output}</h1>
      {/* {pattern.map((item) => item)} */}
    </div>
  );
};

export default Output;
