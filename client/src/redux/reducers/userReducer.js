const defaultState = {
  users: [],
  user: null,
  error: null,
  isValid: false,
};

const userReducer = (state = defaultState, action) => {
  //action = {type: "action type",payload: {...}}
  //state = {cart: []}
  switch (action.type) {
    case "FETCH_USER_LIST":
      const userPayload = action.payload;
      return {
        ...state,
        users: userPayload,
      };

    case "FETCH_ONE_USER":
      const userData = action.payload;
      return {
        ...state,
        user: userData,
      };

    case "FETCH_ERROR":
      const errorFromPayload = action.payload;
      return {
        ...state,
        error: errorFromPayload,
      };

    case "VALIDATE_USER":
      const validPayload = action.payload;
      return {
        isValid: validPayload,
      };
    default:
      return state;
  }
};

export default userReducer;
