import axios from "axios";
import { API_KEY, API_LOGIN_URL, API_REGISTER_URL } from "../../config";
import { AUTH_LOGOUT, FETCH_AUTH_SUCCESS } from "./actionTypes";

export const fetchAuthData = (email, password, isLogin) => {
  return async (dispatch) => {
    const data = { email, password, returnSecureToken: true };

    const url = isLogin ? API_LOGIN_URL : API_REGISTER_URL;

    const response = await axios.post(`${url}?key=${API_KEY}`, data);

    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );

    localStorage.setItem("idToken", response.data.idToken);
    localStorage.setItem("userId", response.data.localId);
    localStorage.setItem("expirationDate", expirationDate);

    dispatch(fetchAuthSuccess(response.data.idToken));
    dispatch(autoLogout(response.data.expiresIn));
    return response;
  };
};

export const autoLogin = () => (dispatch) => {
  const token = localStorage.getItem("idToken");
  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(fetchAuthSuccess(token));
      dispatch(
        autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

export const autoLogout = (time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, time * 1000);
  };
};

export const logout = () => {
  localStorage.removeItem("idToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  return { type: AUTH_LOGOUT };
};

export const fetchAuthSuccess = (token) => ({
  type: FETCH_AUTH_SUCCESS,
  payload: token,
});
