const defaultState = {
  requests: [],
  asc: true,
};

const requestReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_REQUEST_LIST":
      const requestPayload = action.payload;
      return {
        ...state,
        requests: requestPayload,
      };

    case "SORT_TABLE_BY":
      const { sortby, asc } = action.payload;
      const sortedData = state.requests.sort((a, b) => {
        const nameA = a[sortby];
        const nameB = b[sortby];
        if (asc) {
          state.asc = false;
          return nameA > nameB ? 1 : -1;
        } else {
          state.asc = true;
          return nameA > nameB ? -1 : 1;
        }
      });
      console.log("sorteddata", sortedData);
      return {
        ...state,
        requests: [...sortedData],
      };

    default:
      return state;
  }
};

export default requestReducer;
