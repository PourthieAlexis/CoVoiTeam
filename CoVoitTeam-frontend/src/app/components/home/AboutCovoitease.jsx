import React from "react";
import logoCovoitease from "../../assets/images/logo_covoitease.png";
import { Link } from "react-router-dom";

const AboutCovoitease = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row mt-10 lg:mb-10 px-8">
      <div className="w-full h-96 lg:w-1/2 whatIsCovoitease"></div>
      <div className="flex flex-col md:px-10 w-full lg:w-1/2">
        <img
          src={logoCovoitease}
          alt="logoCoVoitEase"
          className="logoCovoitease"
        />
        <p className="flex w:full pt-4">
          Voyagez en Toute Liberté, avec accessibilité. Notre Vision : nous
          croyons que la mobilité est un droit, et que personne ne devrait être
          limité dans sa capacité à se déplacer librement. "CoVoitEase" est né
          de la conviction que l'accessibilité est pour tous. Notre vision est
          de créer une communauté de covoitureurs dédiée à l'inclusion, où
          chaque trajet est une opportunité d'aider, de connecter et de rendre
          possible.
        </p>
        <Link
          to="/Introduction"
          className="btn-read-more w-full lg:w-1/2 border-blue text-blue"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default AboutCovoitease;
