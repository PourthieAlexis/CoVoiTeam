import * as URL from "../../constants/urls/urlBackEnd";
import apiBackEnd, { apiDataGouv } from "./api.Backend";

export function authenticate(values) {
  return apiBackEnd.post(URL.URL_BACK_AUTHENTICATE, values);
}
export function register(values) {
  return apiBackEnd.post(URL.URL_BACK_REGISTER, values);
}
export function getUserByEmail(email) {
  return apiBackEnd.get(URL.URL_BACK_GET_USER_BY_EMAIL + "/" + email);
}
export function verifyEmail(token) {
  return apiBackEnd.get(URL.URL_BACK_CHECK_EMAIL + "/" + token);
}
export function getGeolocation(address) {
  return apiDataGouv.get(URL.URL_API_GOUV + address);
}
export function resetPassword(values) {
  return apiBackEnd.post(URL.URL_BACK_RESET_PASSWORD, values);
}
export function getTripById(trip_id) {
  return apiBackEnd.get(URL.URL_BACK_GET_TRIP_BY_ID + `/${trip_id}`);
}
export function getCommentByUserId(user_id) {
  return apiBackEnd.get(
    URL.URL_BACK_GET_COMMENT_BY_COMMENTED_USER_ID + `/${user_id}`
  );
}
export function updateUser(user_id, values, token) {
  apiBackEnd.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "application/merge-patch+json";
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return apiBackEnd.patch(URL.URL_BACK_UPDATE_USER + "/" + user_id, values);
}
export function updatePassword(values, token) {
  const data = {
    ...values,
    token: token,
  };
  return apiBackEnd.post(URL.URL_BACK_UPDATE_PASSWORD, data);
}

export function addAddress(values) {
  return apiBackEnd.post(URL.URL_BACK_ADD_ADRESS, values);
}

export function getAddress(addressId) {
  return apiBackEnd.get(URL.URL_BACK_GET_ADDRESS + addressId);
}
