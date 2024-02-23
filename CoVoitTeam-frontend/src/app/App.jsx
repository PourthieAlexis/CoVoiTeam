import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { selectIsLogged, signIn } from "./redux-store/authenticationSlice";
import Routes from "./routes/Routes";
import { getToken } from "./services/tokenServices";

const contextClass = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
  warning: "toast-warning",
  default: "toast-default",
  dark: "toast-dark",
};

/**
 * Component RouteWithNavigation
 * To create the structure of the application (nav bar, routes, toast, etc...)
 *
 * @author Peter Mollet
 */
const App = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) dispatch(signIn(token));
    setIsLogin(false);
  }, []);

  if (isLogin) return null;

  return (
    <BrowserRouter>
      <div className="relative flex h-full cursor-default flex-col">
        <Navbar />
        <main className="mt-[80px] md:mt-[159px] grow w-full max-w-[1280px] sm:px-0 xl:mx-auto">
          <Routes />
        </main>
        <ToastContainer
          toastClassName={({ type }) =>
            contextClass[type || "default"] +
            " relative flex p-1 min-h-10 h-fit rounded-md justify-between overflow-hidden cursor-pointer w-4/5 mx-auto h-full border text-white"
          }
          bodyClassName={() =>
            "text-[24px] font-white font-med block p-3 w-full flex flex-row justify-center items-center"
          }
          className={() => "fixed top-[170px] h-[80px] w-2/5 right-0"}
          position="top-right"
          autoClose={3000}
          closeOnClick
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
