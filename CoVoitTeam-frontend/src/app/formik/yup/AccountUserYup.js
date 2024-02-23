import * as Yup from "yup";
import * as Regex from "../../constants/regex/regexUserRegister";
import { getUserByEmail } from "../../api/backend/account";

/**
 * @typedef {Object} AccountUserYup
 *
 * @author Laurence Delporte
 */

let dateMin = new Date();
dateMin.setFullYear(dateMin.getFullYear() - 100);
let dateMax = new Date();
dateMax.setFullYear(dateMax.getFullYear() - 18);

const fields = {
  lastname: Yup.string()
    .matches(Regex.USER_NAME, "Le nom ne doit contenir que des lettres")
    .required("Le nom est obligatoire"),
  firstname: Yup.string()
    .matches(Regex.USER_NAME, "Le prénom ne doit contenir que des lettres")
    .required("Le prénom est obligatoire"),
  phone: Yup.string()
    .matches(Regex.USER_PHONE, "Le téléphone n'est pas valide")
    .required("Le téléphone est obligatoire"),
  birthday: Yup.date()
    .min(
      dateMin,
      "Vous devez avoir moins de 100 ans pour utiliser cette application"
    )
    .max(
      dateMax,
      "Vous devez avoir au moins 18 ans pour utiliser cette application"
    )
    .required("La date de naissance est obligatoire"),
  email: Yup.string()
    .email("L'email n'est pas valide")
    .required("L'email est obligatoire")
    .test("email-unique", "Cet email est déjà utilisé", async (email) => {
      let isUnique = false;
      try {
        const response = await emailAsyncValidation(email);
        isUnique = response;
      } catch (error) {
        console.log(error);
      }
      return isUnique;
    }),
  password: Yup.string()
    .matches(
      Regex.USER_PASSWORD,
      "Le mot de passe doit contenir au moins 12 caractères dont une majuscule, une minuscule, un chiffre et un caractère spécial"
    )
    .required("Le mot de passe est obligatoire"),
  confirm_password: Yup.string()
    .oneOf(
      [Yup.ref("password"), null],
      "Les mots de passe ne correspondent pas"
    )
    .required("La confirmation du mot de passe est obligatoire"),
  number: Yup.string().matches(
    Regex.ADDRESS_NUMBER,
    "Le numéro de voie n'est pas valide"
  ),
  additional_address: Yup.string(),
  street: Yup.string().matches(
    Regex.ADDRESS_STREET,
    "Le nom de la voie n'est pas valide"
  ),
  zipcode: Yup.string().matches(
    Regex.ADDRESS_ZIPCODE,
    "Le code postal n'est pas valide"
  ),
  city: Yup.string().matches(
    Regex.ADDRESS_CITY,
    "Le nom de la ville n'est pas valide"
  ),
  country: Yup.string()
    .default("France")
    .matches(Regex.ADDRESS_COUNTRY, "Le nom du pays n'est pas valide"),
  cgu: Yup.boolean().oneOf(
    [true],
    "Vous devez accepter les conditions générales d'utilisation"
  ),
};

function emailAsyncValidation(email) {
  return new Promise((resolve, reject) => {
    // envoie de la requête au serveur
    getUserByEmail(email).then((response) => {
      // si l'email est déjà utilisé
      if (response.data) {
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
}

export const schemaFormLogin = Yup.object().shape({
  email: Yup.string().trim().required().email(),
  password: Yup.string().required(),
});

export const schemaCreateAccount = Yup.object().shape(fields);

export const schemaUpdateAccount = Yup.object().shape({
  lastname: fields.lastname,
  firstname: fields.firstname,
  phone: fields.phone,
  birthday: fields.birthday,
});

export const schemaResetPassword = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const schemaUpdatePassword = Yup.object().shape({
  password: fields.password,
  confirm_password: fields.confirm_password,
});

export const schemaAddAddressUser = Yup.object().shape({
  number: fields.number,
  additional_address: fields.additional_address,
  street: fields.street.required(),
  zipcode: fields.zipcode.required(),
  city: fields.city.required(),
  country: fields.country.required(),
});
