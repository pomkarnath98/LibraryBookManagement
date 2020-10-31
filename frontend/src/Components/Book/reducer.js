import { BOOK_ERROR, BOOK_REQUEST, BOOK_SUCCESS } from "./actionTypes";

const initState = {
  isLoading: false,
  error: false,
  data: [],
};

const bookReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case BOOK_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case BOOK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: payload,
      };
    case BOOK_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
export default bookReducer;
