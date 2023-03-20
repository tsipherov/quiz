import { AUTH_LOGOUT, FETCH_AUTH_SUCCESS } from "../actions/actionTypes";

const initialState = {
  token: null,
};
export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_AUTH_SUCCESS:
      return {
        ...state,
        token: payload,
      };

    case AUTH_LOGOUT:
      return {
        ...state,
        token: null,
      };

    default:
      return state;
  }
};
