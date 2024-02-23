import { useState } from "react";
import { Link } from "react-router-dom";
import CarRight from "../../assets/images/footer_car_right.png";
import CarLeft from "../../assets/images/footer_car_left.png";
import xLogo from "../../assets/images/xLogo.png";
import instaLogo from "../../assets/images/instaLogo.png";
import facebookLogo from "../../assets/images/facebookLogo.png";
import {
  URL_INTRO,
  URL_X,
  URL_FACEBOOK,
  URL_INSTA,
  URL_INSURANCE,
  URL_POINT_SYSTEM,
  URL_COVOITEASE,
  URL_HELP,
  URL_FAMOUS_TRIPS,
  URL_FAMOUS_DESTINATIONS,
} from "../../constants/urls/urlFrontEnd";

const Footer = () => {
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);

  return (
    <div className="w-full bg-navbar md:flex-row">
      {/*MOBILE VERSION*/}
      <div className="w-full md:hidden flex flex-col">
        <div className="w-full flex flex-col items-center">
          <h1
            className="title-footer"
            onClick={() => setShowContent1((prev) => !prev)}
          >
            Voyagez avec nous {showContent1 ? "-" : "+"}
          </h1>
          {showContent1 && (
            <>
              <Link to={URL_FAMOUS_TRIPS}>
                <p className="text-footer">Trajets populaires en covoiturage</p>
              </Link>
              <Link to={URL_FAMOUS_DESTINATIONS}>
                <p className="text-footer">
                  Destinations populaires en covoiturage
                </p>
              </Link>
            </>
          )}
        </div>
        <div className="yellowBar md:hidden w-full h-1 my-5"></div>
        <div className="w-full flex flex-col items-center h-52">
          <h1
            className="title-footer"
            onClick={() => setShowContent2((prev) => !prev)}
          >
            En savoir plus {showContent2 ? "-" : "+"}
          </h1>
          {showContent2 && (
            <>
              <Link to={URL_COVOITEASE}>
                <p className="text-footer">Covoiturage du quotidien</p>
              </Link>
              <Link to={URL_INSURANCE}>
                <p className="text-footer">Assurance et covoiturage</p>
              </Link>
              <Link to={URL_POINT_SYSTEM}>
                <p className="text-footer">Comment ça marche</p>
              </Link>
              <Link to={URL_INTRO}>
                <p className="text-footer">Qui sommes-nous ?</p>
              </Link>
              <Link to={URL_HELP}>
                <p className="text-footer">Centre d'aide</p>
              </Link>
            </>
          )}
        </div>

        <div className="w-full md:hidden flex flex-col">
          <div className="w-full flex items-center justify-center my-4">
            <div className="footer-social-media">
              <a href={URL_FACEBOOK}>
                <img src={facebookLogo} alt="facebookLogo" className="w-5/12" />
              </a>
              <a href={URL_X}>
                <img src={xLogo} alt="xLogo" className="w-5/12" />
              </a>
              <a href={URL_INSTA}>
                <img src={instaLogo} alt="instaLogo" className="w-5/12" />
              </a>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <img src={CarRight} alt="Car_right" className="w-4/12 h-auto" />
            <img src={CarLeft} alt="Car_left" className="w-4/12 h-auto" />
          </div>
        </div>
        <div className="w-full h-1/6 overflow-hidden">
          <p className="title-footer md:hidden sm:text-sm text-xs flex justify-center">
            ©CoVoitEase 2023
          </p>
        </div>
      </div>

      {/*DESKTOP VERSION*/}
      <div className="w-full hidden md:flex">
        <div className=" w-5/12 flex flex-col justify-between">
          <div className="w-full flex flex-col items-center">
            <h1 className="title-footer">Voyagez avec nous</h1>
            <Link to={URL_FAMOUS_TRIPS}>
              <p className="text-footer">Trajets populaires en covoiturage</p>
            </Link>
            <Link to={URL_FAMOUS_DESTINATIONS}>
              <p className="text-footer">
                Destinations populaires en covoiturage
              </p>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <img src={CarRight} alt="Car_right" className="w-10/12 h-auto" />
          </div>
        </div>
        <div className="w-2/12 flex flex-col justify-center items-center">
          <div className="w-full h-5/6 flex items-center justify-center">
            <div className="footer-social-media">
              <a href="https://www.facebook.com/">
                <img src={facebookLogo} alt="facebookLogo" className="w-2/3" />
              </a>
              <a href="https://www.twitter.com/">
                <img src={xLogo} alt="xLogo" className="w-2/3" />
              </a>
              <a href="https://www.instagram.com/">
                <img src={instaLogo} alt="instaLogo" className="w-2/3" />
              </a>
            </div>
          </div>
          <div className="w-full h-1/6 overflow-hidden flex justify-center">
            <p className="title-footer sm:text-sm text-xs">©CoVoitEase 2023</p>
          </div>
        </div>
        <div className="w-5/12 flex flex-col justify-between">
          <div className="w-full flex flex-col items-center">
            <h1 className="title-footer">En savoir plus</h1>
            <Link to={URL_COVOITEASE}>
              <p className="text-footer">Covoiturage du quotidien</p>
            </Link>
            <Link to={URL_INSURANCE}>
              <p className="text-footer">Assurance et covoiturage</p>
            </Link>
            <Link to={URL_POINT_SYSTEM}>
              <p className="text-footer">Comment ça marche</p>
            </Link>
            <Link to={URL_INTRO}>
              <p className="text-footer">Qui sommes-nous ?</p>
            </Link>
            <Link to={URL_HELP}>
              <p className="text-footer">Centre d'aide</p>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <img src={CarLeft} alt="Car_left" className="w-10/12 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
