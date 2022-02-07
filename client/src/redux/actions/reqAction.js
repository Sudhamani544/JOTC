import axios from "axios";

//redux-thunk to fetch data using async
export const getRequest = () => {
  return async (dispatch, getState) => {
    const getData = await axios("http://localhost:5000/api/v1/requests");
    const requestList = getData.data;

    dispatch(fetchRequestList(requestList));
  };
};

//delivering action to the reducer
export const fetchRequestList = (data) => {
  return {
    type: "FETCH_REQUEST_LIST",
    payload: data,
  };
};

export const sortTableBy = (sortby, asc) => {
  return {
    type: "SORT_TABLE_BY",
    payload: { sortby, asc },
  };
};
