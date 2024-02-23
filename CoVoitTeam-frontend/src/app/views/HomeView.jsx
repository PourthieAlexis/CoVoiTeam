import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROLE_ADMIN } from "../constants/rolesConstant";
import { URL_ADMIN_HOME } from "../constants/urls/urlFrontEnd";
import { selectHasRole } from "../redux-store/authenticationSlice";
import Searchbar from "../components/Searchbar";
import PointSystem from "../components/home/PointSystem";
import TripsGeolocation from "../components/home/TripsGeolocation.jsx";
import AboutCovoitease from "../components/home/AboutCovoitease";
import { selectIsLogged } from "./../redux-store/authenticationSlice";

const HomeView = () => {
  const isAdmin = useSelector((state) => selectHasRole(state, ROLE_ADMIN));
  const navigate = useNavigate();
  const isLoggued = useSelector(selectIsLogged);

  return (
    <div>
      <Searchbar />
      {isAdmin && (
        <button
          className="btn btn-primary"
          onClick={() => navigate(URL_ADMIN_HOME)}
        >
          Admin
        </button>
      )}
      <AboutCovoitease />
      
      {isLoggued ? (
        <>
          <TripsGeolocation />
          <PointSystem />
        </>
      ) : (
        <>
          <PointSystem />
          <TripsGeolocation />
        </>
      )}
    </div>
  );
};

export default HomeView;
