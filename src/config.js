const API_KEY = process.env.REACT_APP_API_KEY;

const API_LOGIN_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";
const API_REGISTER_URL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp";

export { API_KEY, API_LOGIN_URL, API_REGISTER_URL };
