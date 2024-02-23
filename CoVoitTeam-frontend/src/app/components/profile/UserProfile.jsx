import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { schemaUpdateAccount } from "../../formik/yup/AccountUserYup";
import { updateUser } from "../../api/backend/account";
import { convertDate } from "../../utils/formatUtils";
import { selectToken, signIn } from "../../redux-store/authenticationSlice";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const UserProfile = ({ user, onStateChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const token = useSelector(selectToken);

  const handleUpdate = (values) => {
    updateUser(user.id, values, token)
      .then((res) => {
        if (res.status === 200) {
          onStateChange();
          setIsEditing((prevState) => !prevState);
          toast.success(res.data.message);
        }
      })
      .catch((error) => toast.error(error.response.data.error));
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="profileTitle">Profil</h1>
      {isEditing ? (
        <Formik
          initialValues={{
            lastname: user.lastname,
            firstname: user.firstname,
            phone: user.phone,
            birthday: convertDate(user.birthday),
          }}
          validationSchema={schemaUpdateAccount}
          onSubmit={handleUpdate}
        >
          <Form className="profileCard">
            <label className="flex flex-col">
              <span>Nom :</span>
              <Field type="text" name="lastname" />
              <ErrorMessage name="lastname" component="div" />
            </label>
            <label>
              <span>Prénom :</span>
              <Field type="text" name="firstname" />
              <ErrorMessage name="firstname" component="div" />
            </label>
            <label>
              <span>Email :</span> {user.email}
            </label>
            <label>
              <span>Téléphone :</span>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" />
            </label>
            <label>
              <span>Date de naissance :</span>
              <Field type="date" id="birthday" name="birthday" />
              <ErrorMessage name="birthday" component="div" />
            </label>
            <div className="buttonProfile gap-2">
              <button onClick={() => setIsEditing((prevState) => !prevState)}>
                Annulez modification
              </button>
              <button type="submit">Appliquer Modification</button>
            </div>
          </Form>
        </Formik>
      ) : (
        <div className="profileCard">
          <p>
            <span>Nom :</span> {user.lastname}
          </p>
          <p>
            <span>Prénom :</span> {user.firstname}
          </p>
          <p>
            <span>Email :</span> {user.email}
          </p>
          <p>
            <span>Téléphone :</span> {user.phone}
          </p>
          <p>
            <span>Date de naissance :</span> {user.birthday}
          </p>
          <div className="buttonProfile">
            <button onClick={() => setIsEditing((prevState) => !prevState)}>
              Modification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
