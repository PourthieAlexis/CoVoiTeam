import * as Yup from "yup";
import * as Regex from "../../constants/regex/regexCar";
import { getCarByRegistration } from "../../api/backend/car.backend";

/**
 * @typedef {Object} VehiculeYup
 *
 * @author Laurence Delporte
 */

const dateMax = new Date();

const fields = {
  color: Yup.string().required("Requis"),
  year: Yup.number()
    .min(1980, "L'année doit être supérieure à 1980")
    .max(
      dateMax.getFullYear(),
      "L'année doit être inférieure à l'année courante"
    )
    .required("Requis"),
  registration: Yup.string()
    .matches(
      Regex.REGEX_REGISTRATION_CAR,
      "Le format de la plaque d'immatriculation n'est pas valide"
    )
    .required("Requis")
    .test(
      "registration-unique",
      "Cet immatriculation est déjà utilisée",
      async (registration) => {
        let isUnique = false;
        try {
          const response = await registrationAsyncValidation(registration);
          isUnique = response;
        } catch (error) {
          console.log(error);
        }
        return isUnique;
      }
    ),
  brand_id: Yup.string().required("Requis"),
  model_id: Yup.string().required("Requis"),
};

export const schemaAddVehicule = Yup.object().shape({
  color: fields.color,
  year: fields.year,
  registration: fields.registration,
  brand_id: fields.brand_id,
  model_id: fields.model_id,
});

function registrationAsyncValidation(registration) {
  return new Promise((resolve, reject) => {
    getCarByRegistration(registration).then((res) => {
      if (res.data) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}
