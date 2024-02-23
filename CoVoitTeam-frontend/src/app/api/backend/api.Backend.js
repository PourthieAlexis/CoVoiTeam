import axios from "axios";
/**
 * Instance axios to the BACKEND
 *
 * @author Peter Mollet
 */
const apiBackEnd = axios.create({
  baseURL: "https://localhost:8000",
});

export default apiBackEnd;
const apiDataGouv = axios.create({
  baseURL: "https://api-adresse.data.gouv.fr",
});
export { apiDataGouv };
