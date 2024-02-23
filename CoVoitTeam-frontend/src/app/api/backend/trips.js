import * as URL from "../../constants/urls/urlBackEnd";
import apiBackEnd from "./api.Backend";

export function showTripsByGeolocation(values) {
    return apiBackEnd.post(URL.URL_BACK_TRIPS_GEOLOCATION,values);
}