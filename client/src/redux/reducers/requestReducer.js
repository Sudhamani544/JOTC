const defaultState = {
  requests: [],
};

const requestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_LIST":
      const requestPayload = action.payload;
      return {
        ...state,
        requests: requestPayload,
      };

    case "FETCH_BY_DATE":
      const reqDatePayload = action.payload;
      return {
        ...state,
        requests: reqDatePayload,
      };

    default:
      return state;
  }
};

export default requestReducer;
