import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Output from "../Output";
import { validPlayer } from "../../redux/actions/userAction";

const Game = () => {
  const [inp_len, setInpLen] = useState(0);
  const [pattern, setPattern] = useState([]);
  const [output, setOutput] = useState(0);
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidPlayer = useSelector((state) => {
    return state.userReducer.isValidPlayer;
  });

  //total no:of clouds
  const getLen = (e) => setInpLen(e.target.value);

  //cloud pattern
  const getPattern = (e) => {
    setPattern(
      e.target.value
        .toString()
        .split("")
        .map((item) => parseInt(item))
    );
  };

  //validating cloud pattern
  const getOutput = (e) => {
    e.preventDefault();
    let noError = true;
    //validate if pattern has only 1 or 0
    for (const i in pattern) {
      if (pattern[i] === 0 || pattern[i] === 1) {
        continue;
      } else {
        alert("Please enter either 0 or 1");
        noError = false;
        break;
      }
    }

    //check for consecutive 1's
    for (let j = 0; j < inp_len; j++) {
      if (pattern[j] === 1 && pattern[j + 1] === 1) {
        noError = false;
        alert("No consecutive numbers sould be 1");
        break;
      }
    }

    //check for length, starting and ending digit and length value
    if (
      inp_len == pattern.length &&
      pattern[0] === 0 &&
      pattern[inp_len - 1] === 0 &&
      inp_len >= 2 &&
      inp_len <= 100
    ) {
    } else {
      noError = false;
      alert(
        "1. Total no:of clouds must be equal to the length of cloud pattern.\n 2. Starting and ending digits of the cloud pattern should be zero."
      );
    }

    if (noError) {
      let count = 0;
      for (let i = 0; i < pattern?.length - 1; i++, count++) {
        if (i + 2 < inp_len && pattern[i + 2] === 0) {
          i++;
        }
      }
      setOutput(count);
      setValidated(true);
    } else {
      setOutput(0);
      setValidated(false);
    }
  };

  const email_id = localStorage.getItem("email");

  const insertData = async () => {
    try {
      const data = {
        email_id,
        inp_len,
        pattern,
        output,
      };

      const response = await axios.post(
        `https://jotclouds.herokuapp.com/api/v1/requests`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err.messages);
    }
  };

  //if input data is valid, insert data into database
  useEffect(() => {
    if (validated === true) {
      insertData();
      setValidated(false);
    }
  }, [validated]);

  const onClick = (e) => {
    dispatch(validPlayer(false));
    navigate("/");
  };

  return (
    <>
      {isValidPlayer ? (
        <div className="bg-image">
          <div className="btnExit">
            <button className="btnLogout" onClick={onClick}>
              Exit
            </button>
          </div>
          <form>
            <label>Total no:of clouds</label>
            <input onChange={getLen} placeholder="enter length"></input>
            <label>Cloud pattern</label>
            <input onChange={getPattern} placeholder="enter pattern"></input>
            <button onClick={getOutput} className="btn">
              Submit
            </button>
          </form>
          <Output inp_len={inp_len} output={output} pattern={pattern} />
        </div>
      ) : (
        <div>
          Please enter valid details <Link to={`/`}> here </Link> to play a game
        </div>
      )}
    </>
  );
};

export default Game;
