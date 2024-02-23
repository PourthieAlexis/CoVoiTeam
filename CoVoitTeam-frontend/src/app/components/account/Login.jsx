import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { signIn } from "../../redux-store/authenticationSlice";
import { authenticate } from "./../../api/backend/account";
import { schemaFormLogin } from "../../formik/yup/AccountUserYup";

import yellowCar from "../../assets/images/voiture_jaune_small.png"
import greenCar from "../../assets/images/voiture_verte_small.png"

/**
 * Component Login
 *
 * @author Peter Mollet
 */
const Login = () => {
  const [errorLog, setErrorLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (values) => {
    authenticate(values)
      .then((res) => {
        if (res.status === 200 && res.data.token) {
          dispatch(signIn(res.data.token));
          navigate(URL_HOME);
        }
      })
      .catch(() => setErrorLog(true));
  };


  return (
    <div className="relative">
      <div>
        <div className="login-title mt-[35px] mb-[20px] h-[80px] flex justify-center items-center text-center">
          Connexion
        </div>
        <div className="login-box">
          <hr />

          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={schemaFormLogin} // Utilisez le schéma de validation ici
            onSubmit={handleLogin}
          >
            <Form className="mt-8 space-y-6">
              <div className="flex flex-col space-y-3 rounded-md shadow-sm">
                <label htmlFor="email" className="login-email-label">
                  Adresse mail
                </label>
                <Field
                  type="text"
                  name="email"
                  autoComplete="username"
                  className="input-login"
                />
                <ErrorMessage name="email" component="div" className="text-red-600 block font-normal pl-[89px]" />
                <label htmlFor="password" className="login-password-label">
                  Mot de passe
                </label>
                <Field
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="input-login"
                />
                <ErrorMessage name="password" component="div" className="text-red-600 block font-normal pl-[89px]" />
                <Link to="/forgot-password" className="forgot-password-link">
                  <span>
                    Mot de passe oublié
                  </span>
                </Link>
                <button
                  type="submit"
                  className="validation-login"
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  </span>
                  Valider
                </button>
              </div>
              {errorLog && (
                <div className="flex justify-center">
                  <small className="text-sm italic text-red-600">
                    Adresse Mail ou Mot de passe incorrect(s)
                  </small>
                </div>
              )}
            </Form>
          </Formik>
        </div>
      </div>
      <img src={yellowCar} alt="voiture_jaune" className="absolute top-12 left-[-290px] rotate-[2deg]" />
      <img src={greenCar} alt="voiture_verte" className="absolute bottom-[-110px] right-[-335px] z-10" />
    </div>
  );
};

export default Login;
