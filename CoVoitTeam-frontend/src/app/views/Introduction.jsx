import React from "react";
import homePageImg from "../assets/images/bandeau_home_page.png";
import secondLogo from "../assets/images/logo_covoitease.png";
import subTitleImg from "../assets/images/illustration.jpg";

function Introduction() {
  return (
    <div className='introduction-container pb-8'>
        <div className="banner-container flex flex-col items-center mb-40">
            <img src={homePageImg} alt="home_page" className='' />
            <img src={secondLogo} alt="second_logo" className='w-4/12 absolute mt-20' />
        </div>
        <div className="welcome-container flex flex-col items-center mt-5">
            <h3 className='text-primary mb-10 w-11/12'>Bienvenu  <span className='text-secondary'>dans "CoVoitEase"</span></h3>
            <p className='mb-10 w-11/12'>Voyagez en Toute Liberté, avec accessibilité. Notre Vision : nous croyons que la mobilité est un droit, 
            et que personne ne devrait être limité dans sa capacité à se déplacer librement. "CoVoitEase" est né de la conviction que l'accessibilité est pour tous. 
            Notre vision est de créer une communauté de covoitureurs dédiée à l'inclusion, où chaque trajet est une opportunité d'aider, 
            de connecter et de rendre possible.
            </p>
            <div className="why-container flex w-11/12">
                <h4 className='text-primary mb-10 w-11/12'> Pourquoi  <span className='text-secondary'>"CoVoitEase" ?</span></h4>
            </div>
            <div className="img-text-container flex self-center w-full">
                <img src={subTitleImg} alt="subtitle_img" className='w-6/12 max-h-[508px]' />
                <div className="text-container flex flex-col justify-between w-6/12 ml-20">
                    <div className="subparagraph-container mb-5">
                        <h4 className='text-primary mb-3'>Accessibilité <span className='text-secondary'>Avant Tout</span></h4>
                        <p>Chaque conducteur est formé à l'assistance pour garantir un voyage confortable et sécurisé.</p>
                    </div>
                    <div className="subparagraph-container mb-5">
                        <h4 className='text-primary mb-3'>Adapté à <span className='text-secondary'>Vos Besoins</span></h4>
                        <p>Personnalisez votre expérience en indiquant vos besoins spécifiques, de votre type de fauteuil roulant aux préférences de voyage.</p>
                    </div>
                    <div className="subparagraph-container mb-5">
                        <h4 className='text-primary mb-3'>Communauté <span className='text-secondary'>Solidaire</span></h4>
                        <p>Rejoignez une communauté de covoitureurs qui partagent la même vision : un monde où la mobilité n'a pas de limites. </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div className="subparagraph-container mb-5 mt-5">
            <h5 className='text-primary mb-3'> Les Avantages de "CoVoitEase" </h5>

            <ul className='list-inside'>
                <li className='list-disc'>Facilité de Déplacement : des trajets adaptés à vos besoins, à portée de main.</li>
                <li className='list-disc'>Inclusion Sociale : connectez-vous avec d'autres voyageurs et brisez les barrières.</li>
                <li className='list-disc'>Durabilité environnementale : contribuez à réduire la congestion routière et les émissions de carbone. 
                Rejoignez la révolution de la mobilité. </li>
            </ul>
            <p className='py-4'>
            Inscrivez-vous dès aujourd'hui et découvrez un nouveau monde de covoiturage, où chaque trajet rapproche les gens, 
            élargit les horizons et favorise l'inclusion. 
                <br /> 
            Faites le premier pas vers l'accessibilité et inscrivez-vous Maintenant. Bienvenue dans "CoVoitEase." 
            Où que vous alliez, nous sommes là pour vous aider à y arriver.
            </p>
            </div>
    </div>
  );
}

export default Introduction;
