import React, {useEffect, useRef} from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import yellowCar from '../../assets/images/voiture_jaune_small.png';
import greenCar from '../../assets/images/voiture_verte_small.png';
import { updatePassword } from '../../api/backend/account';
import { useParams } from 'react-router-dom';
import { useNavigate, Link } from "react-router-dom";
import { URL_LOGIN, URL_PASSWORD_RESET } from "../../constants/urls/urlFrontEnd";
import 'react-toastify';
import { toast } from 'react-toastify';
import initialValuesUpdatePassword from "../../formik/initialValues/UserInitialValues";
import { schemaUpdatePassword } from "../../formik/yup/AccountUserYup";

function PasswordUpdate() {
  const navigate = useNavigate();
  const { token } = useParams();
  const tokenExpired = useRef(false);

  useEffect(() => {
    const tokenTimestamp = token.slice(-10);
    const currentTime = Math.floor(new Date().getTime() / 1000);
    const expiration = 3600;
    const timeElapsed = currentTime - tokenTimestamp;
  
    if (timeElapsed > expiration && !tokenExpired.current) {
      navigate(URL_PASSWORD_RESET);
      toast.error('Votre lien n\'est plus valide.')
      tokenExpired.current = true;
    }
  }, [token]);
  
  const onSubmit = (values) => {
    updatePassword(values, token)
      .then((res) => {
        if (res.status === 200) {
          navigate(URL_LOGIN);
          toast.success(res.data.message);
        }
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  return (
    <div className="relative">
      <div>
        <div className="login-box h-[500px]">
          <hr />
          <Formik initialValues={initialValuesUpdatePassword} validationSchema={schemaUpdatePassword} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className="mt-8 space-y-6">
              <div className="flex flex-col rounded-md shadow-sm">
                <div className="field-container mb-16">
                    <label htmlFor="password" className="login-email-label w-full m-0">Nouveau mot de passe</label>
                    <Field type="string" name="password" className="input-login" />
                    <ErrorMessage name="password" component="div" className="text-red-600 block font-normal absolute w-full text-center px-4" />
                </div>
                <div className="field-container m-0 mb-16">
                    <label htmlFor="confirm_password" className="login-password-label w-full m-0">Confirmation Nouveau mot de passe</label>
                    <Field type="string" name="confirm_password" className="input-login" />
                    <ErrorMessage name="confirm_password" component="div" className="text-red-600 block font-normal absolute w-full text-center px-4" />
                </div>

                <button type="submit" className="validation-login" disabled={!isValid}>Valider</button>
              </div>
            </Form>
            )}
          </Formik>
        </div>
      </div>
      <img src={yellowCar} alt="voiture_jaune" className="absolute top-12 left-[-290px] rotate-[2deg]" />
      <img src={greenCar} alt="voiture_verte" className="absolute bottom-[-110px] right-[-335px] z-10" />
    </div>
  );
}

export default PasswordUpdate;
