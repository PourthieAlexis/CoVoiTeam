import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import UserInitialValues from "../../formik/initialValues/UserInitialValues";
import { schemaCreateAccount } from "../../formik/yup/AccountUserYup";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { getGeolocation, register } from "../../api/backend/account";
import { toast } from "react-toastify";

/**
 * Component Register
 *
 * @author Laurence Delporte
 */

const Register = () => {
  const [errorLog, setErrorLog] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const messageSuccess = () =>
    toast("Inscription réussie, un email vous a été envoyé !", {
      type: "success",
    });
  const messageError = () =>
    toast("Erreur lors de l'inscription, veuillez réessayer !", {
      type: "error",
    });
  const messageErrorAddress = () =>
    toast("Adresse invalide !", { type: "error" });

  const handleRegister = (values) => {
    console.log("values: ", values);
    if (values.street != "" && values.zipcode != "" && values.city != "") {
      const address = `${values.number} ${values.street} ${values.zipcode} ${values.city} ${values.country}`;
      getGeolocation(address)
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            values.latitude = res.data.features[0].geometry.coordinates[1];
            values.longitude = res.data.features[0].geometry.coordinates[0];
            console.log("latitude: ", values.latitude);
            console.log("longitude: ", values.longitude);
            console.log("values: ", values);
            register(values)
              .then((res) => {
                if (res.status === 200) {
                  navigate(URL_HOME);
                  messageSuccess();
                }
              })
              .catch((err) => {
                setErrorLog(true);
                console.log(err);
                messageError();
              });
          }
        })
        .catch((err) => {
          setErrorLog(true);
          console.log(err);
          messageErrorAddress();
        });
    } else {
      register(values)
        .then((res) => {
          if (res.status === 200) {
            navigate(URL_HOME);
            messageSuccess();
          }
        })
        .catch((err) => {
          setErrorLog(true);
          console.log(err);
          messageError();
        });
    }
  };

  return (
    <div className="container-form">
      <div className="image-form-left"></div>
      <Formik
        initialValues={UserInitialValues}
        validationSchema={schemaCreateAccount}
        onSubmit={handleRegister}
      >
        {(isValid) => {
          return (
            <Form className="">
              <div className="">
                <div className="row-form-register flex-row gap-[62px]">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="lastname" className="label-form-register">
                      Nom<span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      id="lastName"
                      name="lastname"
                      className="input-form-register"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="error-form-register"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="firstname" className="label-form-register">
                      Prénom<span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="input-form-register"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="error-form-register"
                    />
                  </div>
                </div>
                <div className="row-form-register flex-row gap-[62px]">
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="phone" className="label-form-register">
                      Numéro de téléphone
                      <span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="tel"
                      id="phone"
                      name="phone"
                      className="input-form-register"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="error-form-register"
                    />
                  </div>
                  <div className="flex flex-col w-1/2">
                    <label htmlFor="birthday" className="label-form-register">
                      Date de naissance<span className="text-red-600">*</span>
                    </label>
                    <Field
                      type="date"
                      id="birthday"
                      name="birthday"
                      className="input-form-register"
                    />
                    <ErrorMessage
                      name="birthday"
                      component="div"
                      className="error-form-register"
                    />
                  </div>
                </div>
                <div className="row-form-register flex-col">
                  <label htmlFor="email" className="label-form-register">
                    Adresse mail<span className="text-red-600">*</span>
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="input-form-register"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error-form-register"
                  />
                </div>
                <div className="row-form-register flex-col">
                  <label htmlFor="password" className="label-form-register">
                    Mot de passe<span className="text-red-600">*</span>
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="input-form-register"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-form-register"
                  />
                </div>
                <div className="row-form-register flex-col">
                  <label
                    htmlFor="confirm_password"
                    className="label-form-register"
                  >
                    Confirmation du mot de passe
                    <span className="text-red-600">*</span>
                  </label>
                  <Field
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    className="input-form-register"
                  />
                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="error-form-register"
                  />
                </div>
                <div className="w-4/5 h-[2px] bg-green mx-auto mb-7"></div>
                <div className="address">
                  <div className="text-2xl text-green font-bold font-Inter h-[46px]">
                    Adresse
                  </div>
                  <div className="row-form-register flex-row">
                    <div className="flex flex-col w-[150px] mr-[35px]">
                      <label htmlFor="a" className="label-form-register">
                        Numéro
                      </label>
                      <Field
                        type="string"
                        id="number"
                        name="number"
                        className="input-form-register"
                      />
                    </div>
                    <ErrorMessage
                      name="number"
                      component="div"
                      className="error-form-register"
                    />
                    <div className="flex flex-col w-full">
                      <label
                        htmlFor="additional_address"
                        className="label-form-register"
                      >
                        Complément d'adresse
                      </label>
                      <Field
                        type="text"
                        id="additional_address"
                        name="additional_address"
                        className="input-form-register w-full"
                      />
                    </div>
                    <ErrorMessage
                      name="additional_address"
                      component="div"
                      className="error-form-register"
                    />
                  </div>
                  <div className="row-form-register flex-col">
                    <label htmlFor="street" className="label-form-register">
                      Nom de la voie
                    </label>
                    <Field
                      type="text"
                      id="street"
                      name="street"
                      className="input-form-register"
                    />
                  </div>
                  <ErrorMessage
                    name="street"
                    component="div"
                    className="error-form-register"
                  />
                  <div className="row-form-register flex-row">
                    <div className="flex flex-col  w-[150px] mr-[35px]">
                      <label htmlFor="zipcode" className="label-form-register">
                        Code postal
                      </label>
                      <Field
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        className="input-form-register"
                      />
                    </div>
                    <ErrorMessage
                      name="zipcode"
                      component="div"
                      className="error-form-register"
                    />
                    <div className="flex flex-col w-1/2 mr-[35px]">
                      <label htmlFor="city" className="label-form-register">
                        Ville
                      </label>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="input-form-register"
                      />
                    </div>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error-form-register"
                    />
                    <div className="flex flex-col w-1/2">
                      <label htmlFor="country" className="label-form-register">
                        Pays
                      </label>
                      <Field
                        type="text"
                        id="country"
                        name="country"
                        className="input-form-register"
                        placeholder="France"
                      />
                    </div>
                  </div>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="error-form-register"
                  />
                </div>
                <div className="h-[46px] leading-[46px] flex items-center">
                  <Field
                    type="checkbox"
                    id="cgu"
                    name="cgu"
                    className="checkbox-form-register"
                  />
                  <label
                    htmlFor="cgu"
                    className="label-form-register h-[46px] pl-[10px]"
                  >
                    Validation des termes généraux
                    <span className="text-red-600">*</span>
                  </label>
                </div>
                <ErrorMessage
                  name="cgu"
                  component="div"
                  className="error-form-register"
                />
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={!isValid}
                >
                  Valider
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div className="image-form-right"></div>
    </div>
  );
};

export default Register;
