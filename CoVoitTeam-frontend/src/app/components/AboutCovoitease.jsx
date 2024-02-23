import React from "react";
import logoCovoitease from "../assets/img/logo_covoitease.png";
import { Link } from "react-router-dom";

const AboutCovoitease = () => {
  return (
    <div className="w-full flex flex-col md:flex-row mt-10 lg:mb-10">
      <div className="w-full h-96 lg:w-1/2 whatIsCovoitease"></div>
      <div className="flex flex-col lg:px-10 w-full md:w-1/2">
        <img
          src={logoCovoitease}
          alt="logoCoVoitEase"
          className="logoCovoitease"
        />
        <p className="flex w:full pt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
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
