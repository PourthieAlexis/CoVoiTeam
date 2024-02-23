import React from "react";
import Register from "../components/account/Register";
/**
 * View/Page Registration
 *
 * @author Laurence Delporte
 */
const RegisterView = () => {
  return (
    <div className="overflow-hidden">
      <h1 className="text-center text-green h-[80px] text-5xl font-bold leading-normal my-[20px]">
        Inscription
      </h1>
      <Register />
    </div>
  );
};

export default RegisterView;
