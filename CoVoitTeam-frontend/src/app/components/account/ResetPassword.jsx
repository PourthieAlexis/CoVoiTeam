import React from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik';
import yellowCar from '../../assets/images/voiture_jaune_small.png';
import greenCar from '../../assets/images/voiture_verte_small.png';
import { resetPassword } from "./../../api/backend/account";
import { URL_HOME } from "../../constants/urls/urlFrontEnd";
import { useNavigate } from "react-router-dom";
import 'react-toastify';
import { toast } from 'react-toastify';
import UserInitialValuesResetPassword from "../../formik/initialValues/UserInitialValues";
import { schemaResetPassword } from "../../formik/yup/AccountUserYup";


function ResetPassword() {
  const navigate = useNavigate();
    
  const onSubmit = (values) => {
    resetPassword(values)
  .then((res) => {
    if (res.status === 200) {
      navigate(URL_HOME);
      toast.success(res.data.message);
    }
  })
  .catch((error) => toast.error(error.response.data.error));
  };

  return (
    <div className="relative">
      <div>
        <div className="login-box h-[300px]">
          <hr />
          <Formik initialValues={UserInitialValuesResetPassword} validationSchema={schemaResetPassword} onSubmit={onSubmit}>
          {({ isValid }) => (
            <Form className="mt-8 space-y-6">
              <div className="flex flex-col rounded-md shadow-sm">
                <div className="field-container mb-10">
                    <label htmlFor="email" className="login-email-label w-full m-0">Adresse mail</label>
                    <Field type="email" name="email" className="input-login" />
                    <ErrorMessage name="email" component="div" className="text-red-600 block font-normal absolute text-center w-full" />
                </div>
                <button type="submit" className="validation-login" disabled={!isValid}>Valider</button>
              </div>
            </Form>
            )}
          </Formik>
        </div>
      </div>
      <img src={yellowCar} alt="voiture_jaune" className="absolute -top-32 left-[-280px] rotate-[2deg] -z-10" />
      <img src={greenCar} alt="voiture_verte" className="absolute bottom-[-110px] right-[-335px] z-10" />
    </div>
  );
}

export default ResetPassword