const INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
  message: ""
};

export default function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ADD_USER_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "ADD_USER_SUCCESS":
      return {
        ...state,
        data: action.payload.data,
        error: null,
        loading: false
      };
    case "ADD_USER_FAILURE":
      return {
        ...state,
        error: action.payload.error,
        loading: false
      };
    case "CHANGE_PASS_REQUEST":
      return {
        ...state,
        loading: true
      };
    case "CHANGE_PASS_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload.data
      };
    case "CHANGE_PASS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case "LOGOUT_USER":
      return INITIAL_STATE;
    default:
      return state;
  }
}
