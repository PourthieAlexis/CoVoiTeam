import React, { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyEmail } from "../api/backend/account";
import { toast } from "react-toastify";

/**
 * Component VerifyEmailView
 *
 * @author Laurence Delporte
 */
const VerifyEmailView = () => {
  const navigate = useNavigate();
  // Création d'une référence permettant d'éviter le double appel à l'API
  const flag = useRef(false);
  // Vérification de l'email de l'utilisateur
  // récupération du token dans l'url
  const tokenCheckEmail = window.location.href.split("/").pop();
  const messageSuccess = () => toast("Email vérifié", { type: "success" });
  const messageError = () =>
    toast("Erreur lors de la vérification", { type: "error" });

  const handleCheckEmail = () =>
    useEffect(() => {
      if (flag.current === false) {
        verifyEmail(tokenCheckEmail)
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              navigate("/");
              // Message de succès à afficher avec toast
              messageSuccess();
            }
          })
          .catch((err) => {
            console.log(err);
            messageError();
          });
      }
      return () => {
        flag.current = true;
      };
    }, []);

  handleCheckEmail();
  return (
    <div>
      <h3>Verification en cours...</h3>
    </div>
  );
};

export default VerifyEmailView;
