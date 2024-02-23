import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { ROLE_ADMIN } from "../constants/rolesConstant";
import * as URL from "../constants/urls/urlFrontEnd";
import AdminHomeView from "../views/AdminHomeView";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import { PrivateRoute } from "./PrivateRoute";
import Introduction from "../views/Introduction";
import VerifyEmailView from "../views/VerifyEmailView";
import PasswordUpdateView from "../views/PasswordUpdateView";
import ResetPasswordView from "../views/ResetPasswordView";
import PointSystemView from "../views/PointSystemView";
import AddressView from "../views/AddressView";
import UserProfileView from "../views/UserProfileView";
import FamousTripsView from "../views/FamousTripsView";
import FamousDestinationsView from "../views/FamousDestinationsView";
import InsuranceView from "../views/InsuranceView";
import HelpView from "../views/HelpView";
import CovoiteaseView from "../views/CovoiteaseView";
import TripView from "../views/TripView";

/**
 * Routes of the application
 * with public and private route
 *
 * @author Peter Mollet
 */
const Routes = () => {
  return (
    <RoutesContainer>
      <Route path={URL.URL_HOME} element={<HomeView />} />

      <Route
        path={URL.URL_ADMIN_HOME}
        element={
          <PrivateRoute roles={[ROLE_ADMIN]}>
            <AdminHomeView />
          </PrivateRoute>
        }
      />
      <Route path={URL.URL_LOGIN} element={<LoginView />} />

      <Route path={URL.URL_INTRO} element={<Introduction />} />

      <Route path={URL.URL_POINT_SYSTEM} element={<PointSystemView />} />

      <Route path={URL.URL_REGISTER} element={<RegisterView />} />

      <Route path={URL.URL_VERIFY_EMAIL} element={<VerifyEmailView />} />

      <Route path={URL.URL_PASSWORD_UPDATE} element={<PasswordUpdateView />} />

      <Route path={URL.URL_PASSWORD_RESET} element={<ResetPasswordView />} />

      <Route path={URL.URL_ADD_ADDRESS} element={<AddressView />} />

      <Route
        path={URL.URL_USER_PROFILE}
        element={
          <PrivateRoute>
            <UserProfileView />
          </PrivateRoute>
        }
      />

      <Route path={URL.URL_FAMOUS_TRIPS} element={<FamousTripsView />} />

      <Route
        path={URL.URL_FAMOUS_DESTINATIONS}
        element={<FamousDestinationsView />}
      />

      <Route path={URL.URL_TRIP + "/:trip_id"} element={<TripView />} />

      <Route path={URL.URL_INSURANCE} element={<InsuranceView />} />

      <Route path={URL.URL_HELP} element={<HelpView />} />

      <Route path={URL.URL_COVOITEASE} element={<CovoiteaseView />} />
    </RoutesContainer>
  );
};

export default Routes;
