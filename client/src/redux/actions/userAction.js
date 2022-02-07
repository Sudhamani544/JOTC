import axios from "axios";

//redux-thunk to fetch data using async, this thunk is called in CountryTableContainer
export const getUser = () => {
  return async (dispatch, getState) => {
    const getData = await axios("http://localhost:5000/api/v1/user");
    const requestList = getData.data;

    dispatch(fetchUserList(requestList));
  };
};

//delivering thunk to the reducer
export const fetchUserList = (data) => {
  return {
    type: "FETCH_USER_LIST",
    payload: data,
  };
};

export const getOneUser = (email_id) => {
  return async (dispatch, getState) => {
    try {
      const item = await axios(
        `http://localhost:5000/api/v1/user/email/${email_id}`
      );
      const user = item.data;
      dispatch(fetchOneProduct(user));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

export const fetchOneProduct = (data) => {
  return {
    type: "FETCH_ONE_USER",
    payload: data,
  };
};

export const validUser = (data) => {
  return {
    type: "VALIDATE_USER",
    payload: data,
  };
};

export const fetchError = (error) => {
  return {
    type: "FETCH_ERROR",
    payload: error,
  };
};
