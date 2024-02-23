import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLogged } from "./../../redux-store/authenticationSlice";
import { useDispatch } from "react-redux";
import { signOut } from "./../../redux-store/authenticationSlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo_2.0.png";
import notificationBell from "../../assets/images/cloche_notif.png";
import {
  URL_HOME,
  URL_LOGIN,
  URL_REGISTER,
  URL_USER_PROFILE,
} from "../../constants/urls/urlFrontEnd";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon } from "@heroicons/react/24/solid";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapIcon } from "@heroicons/react/24/outline";
import shortLogoCoVoitEase from "../../assets/images/shortLogoCoVoitEase.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [isUserNavOpen, setIsUserNavOpen] = useState(false);
  const isLogged = useSelector(selectIsLogged);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signOut());
    navigate(URL_LOGIN); // Redirect to the login page or another desired page
  };

  return (
    <div className="navbar">
      {/*MOBILE VERSION*/}
      <div className="flex justify-between md:hidden mx-4">
        <div className="w-1/3 flex items-center">
          <UserIcon
            className="h-6 w-6 text-yellow-500 cursor-pointer"
            onClick={() => setIsUserNavOpen((prev) => !prev)}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <Link to={URL_HOME}>
            <img src={shortLogoCoVoitEase} alt="shortLogoCoVoitEase" />
          </Link>
        </div>
        <div className="w-1/3 flex items-center justify-end">
          <MagnifyingGlassIcon className="h-6 w-6 text-yellow-500 cursor-pointer" />
        </div>
      </div>

      <div
        className={`${isUserNavOpen ? "showMenuNav " : "hidden "} md:hidden`}
      >
        <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center bg-white w-1/2 absolute z-50">
          <li className="my-8">
            <Link to={URL_LOGIN}>Connexion</Link>
          </li>
          <li className="my-8">
            <Link to={URL_REGISTER}>Inscription</Link>
          </li>
          {isLogged && (
            <li className="my-8">
              <Link to={URL_USER_PROFILE}>Mon profil</Link>
            </li>
          )}
        </ul>
      </div>

      {/*DESKTOP VERSION*/}
      <div className="md:flex h-[159px] pb-[20px] items-center justify-between py-6 md:justify-start hidden">
        <div>
          <Link to={URL_HOME}>
            <img
              className="w-72 cursor-pointer -mt-24 -mb-24"
              src={logo}
              alt=""
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end lg:w-0">
          <div className="flex flex-col justify-center space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
            {isLogged ? (
              <>
                <Link to="" className="link-navbar">
                  <div>Rechercher</div>
                </Link>
                <Link to="" className="link-navbar">
                  <div>Publier un trajet</div>
                </Link>
                <Menu as="div" className="relative text-center">
                  <div>
                    <Menu.Button className="relative link-navbar">
                      Mon compte
                      <ChevronDownIcon
                        className="hidden text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute z-10 mt-16 w-[350px] bg-navbar shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="pb-[39px] pt-[39px] ">
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              <div className="pb-[39px]">
                                <Link
                                  to={URL_LOGIN}
                                  onClick={handleLogout}
                                  className="link-dropdown-navbar"
                                >
                                  <div>Déconnexion</div>
                                </Link>
                              </div>
                            </>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              <Link
                                to={URL_USER_PROFILE}
                                className="link-dropdown-navbar"
                              >
                                <div>Mon profil</div>
                              </Link>
                            </>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div style={{ position: "relative" }}>
                  <img
                    className="bell-navbar w-28 cursor-pointer"
                    src={notificationBell}
                    alt="cloche_notification"
                  />
                  <div className="bell-notification absolute top-2 right-14 w-5 h-5 bg-[#018383] rounded-full">
                    <div className="bell-notification-content">3</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <form action="">
                    <label className="relative flex items-center p-2 ">
                      <span className="sr-only"></span>
                      <input
                        type="checkbox"
                        className="absolute left-0 top-0 w-full h-full peer sr-only"
                      />
                      <span className="bg-gray-300 w-[80px] h-[37px] cursor-pointer rounded-full flex flex-shrink-0 items-center after:bg-navbarGreen after:w-[40px] after:h-[37px] after:rounded-full peer-checked:bg-gray peer-checked:after:translate-x-[40px] peer-checked:after:bg-navbarGreenBtnDarkMode ease-in-out duration-300 after:duration-300"></span>
                    </label>
                  </form>
                </div>
              </>
            ) : (
              <>
                <Link to="" className="link-navbar">
                  <div className="flex gap-2 flex-col lg:flex-row">
                    <MagnifyingGlassIcon className="h-6 w-6 text-yellow-500 cursor-pointer" />
                    <span>Rechercher</span>
                  </div>
                </Link>
                <Link to="" className="link-navbar">
                  <div className="flex gap-2 flex-col lg:flex-row">
                    <MapIcon className="h-6 w-6 text-yellow-500 cursor-pointer" />
                    <span>Publier un trajet</span>
                  </div>
                </Link>
                <Menu as="div" className="relative text-center">
                  <div>
                    <Menu.Button className="relative link-navbar">
                      <div className="flex gap-2 flex-col lg:flex-row">
                        <UserIcon className="h-6 w-6 text-yellow-500 cursor-pointer" />
                        <span className="text-left">Mon compte</span>
                      </div>
                      <ChevronDownIcon
                        className="hidden text-gray-400"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="menu-items absolute z-10 mt-16 w-[350px] bg-navbar shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="pb-[39px] pt-[39px] flex-col flex gap-12 ">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={URL_LOGIN}
                              className="link-dropdown-navbar"
                            >
                              <div>Connexion</div>
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={URL_REGISTER}
                              className="link-dropdown-navbar"
                            >
                              <div>Inscription</div>
                            </Link>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <div style={{ position: "relative" }}>
                  <BellAlertIcon className="h-8 w-8 text-yellow-500 cursor-pointer" />
                  <div className="bell-notification absolute top-0 right-0 w-5 h-5 bg-[#018383] rounded-full">
                    <div className="bell-notification-content">3</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <form action="">
                    <label className="relative flex items-center p-2 ">
                      <span className="sr-only"></span>
                      <input
                        type="checkbox"
                        className="absolute left-0 top-0 w-full h-full peer sr-only"
                      />
                      <span className="bg-gray-300 w-[80px] h-[37px] cursor-pointer rounded-full flex flex-shrink-0 items-center after:bg-navbarGreen after:w-[40px] after:h-[37px] after:rounded-full peer-checked:bg-gray peer-checked:after:translate-x-[40px] peer-checked:after:bg-green ease-in-out duration-300 after:duration-300"></span>
                    </label>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
