import axios from "axios";

//redux-thunk to fetch data using async
export const getRequest = () => {
  return async (dispatch, getState) => {
    try {
      const getData = await axios("http://localhost:5000/api/v1/requests");
      const requestList = getData.data;

      dispatch(fetchRequestList(requestList));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//delivering action to the reducer
export const fetchRequestList = (data) => {
  return {
    type: "FETCH_REQUEST_LIST",
    payload: data,
  };
};

export const getRequestByDate = (from, to) => {
  return async (dispatch, getState) => {
    try {
      console.log("action", from, to);
      const getData = await axios(
        `http://localhost:5000/api/v1/requests/date/${from}/${to}`
      );
      const dateList = getData.data;
      console.log("getData", getData.data);
      dispatch(fetchByDate(dateList));
    } catch (error) {
      dispatch(fetchError(error));
    }
  };
};

//delivering action to the reducer
export const fetchByDate = (data) => {
  return {
    type: "FETCH_BY_DATE",
    payload: data,
  };
};

export const fetchError = (error) => {
  return {
    type: "FETCH_ERROR",
    payload: error,
  };
};
