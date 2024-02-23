import React from "react";
import PasswordUpdate from "../components/account/PasswordUpdate";

/**
 * View/Page PasswordUpdate
 *
 * @author Lorry Carrel
 */
const PasswordUpdateView = () => {
  return (
    <div className="password-update-view-container flex flex-col items-center">
      <h1 className="text-center text-green h-[80px] text-5xl font-bold leading-normal my-[20px]">Changement de <span className="text-yellow">mot de passe</span></h1>
      <PasswordUpdate />
    </div>
  );
};

export default PasswordUpdateView;
