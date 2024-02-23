import * as URL from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function getBrands() {
  return apiBackEnd.get(URL.URL_BACK_GET_BRANDS);
}
export function getModels() {
  return apiBackEnd.get(URL.URL_BACK_GET_MODELS);
}
export function addCar(values) {
  return apiBackEnd.post(URL.URL_BACK_ADD_CAR, values);
}
export function getCarsByUserId(userId) {
  return apiBackEnd.get(URL.URL_BACK_GET_CARS + userId);
}
export function getCarByRegistration(registration) {
  return apiBackEnd.get(URL.URL_BACK_GET_CAR_BY_REGISTRATION + registration);
}
export function deleteCarById(carId) {
  return apiBackEnd.delete(URL.URL_BACK_DELETE_CAR + carId);
}
export function updateCarById(carId, values) {
  return apiBackEnd.put(URL.URL_BACK_UPDATE_CAR + carId, values);
}
