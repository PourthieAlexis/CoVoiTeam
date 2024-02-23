import React from "react";
import ResetPassword from "../components/account/ResetPassword";

/**
 * View/Page PasswordUpdate
 *
 * @author Lorry Carrel
 */
const ResetPasswordView = () => {
  return (
    <div className="password-update-view-container flex flex-col items-center">
      <h1 className="text-center text-green h-[80px] text-5xl font-bold leading-normal my-[20px]">Mot de passe <span className="text-yellow">oublié</span></h1>
      <ResetPassword />
    </div>
  );
};

export default ResetPasswordView;
