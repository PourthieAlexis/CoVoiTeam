/**
 * @typedef {Object} UserInitialValues
 *
 * @author Laurence Delporte
 */

const UserInitialValues = {
  lastname: "",
  firstname: "",
  phone: "",
  birthday: "",
  email: "",
  password: "",
  confirm_password: "",
  number: "",
  additional_address: "",
  street: "",
  zipcode: "",
  city: "",
  country: "",
  latitude: "",
  longitude: "",
  cgu: false,
};

const UserInitialValuesResetPassword = {
  email: '',
}

const UserInitialValuesUpdatePassword = {
  new_password: "",
  confirm_new_password: "",
}

export default UserInitialValues;
export { UserInitialValuesUpdatePassword, UserInitialValuesResetPassword };
