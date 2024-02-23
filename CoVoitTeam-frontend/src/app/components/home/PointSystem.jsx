import React from "react";
import { Link } from "react-router-dom";

const PointSystem = () => {
  return (
    <div className="w- full flex flex-row flex-wrap py-[40px] px-8">
      <div className="flex flex-col point-system-image w-full lg:w-1/2 min-h-[219px] "></div>
      <div className="flex flex-col sm:w-full lg:w-1/2 lg:px-10">
        <h2 className="leading-[80px]">
          <span className="text-green">Les CoVoit'</span>
          <span className="text-yellow">Points</span>
        </h2>
        <p className="py-2">
          Les CoVoit'Points sont l'unité de mesure utilisée sur notre plateforme de covoiturage solidaire pour les personnes à mobilité réduite. 
          Chaque CoVoit'Point équivaut à un kilomètre parcouru lors d'un trajet de covoiturage. 
          Ce système de points offre une solution flexible et équitable pour calculer le coût des trajets partagés. 
          Les utilisateurs peuvent gagner des CoVoit'Points en offrant des places dans leur véhicule aux personnes à mobilité réduite 
          et les utiliser pour payer leurs propres déplacements sur la plateforme.
        </p>
        <p className="">
          Ce système d'achat et de revente offre une manière pratique et économique pour les utilisateurs de gérer leurs CoVoit'Points, 
          en leur permettant de les vendre s'ils ne prévoient pas de les utiliser, tout en offrant à d'autres utilisateurs la possibilité 
          d'acheter des points à un tarif avantageux.
        </p>
        <Link
          to="/explication-des-coVoitPoints"
          className="btn-read-more w-full lg:w-1/2"
        >
          En savoir plus
        </Link>
      </div>
    </div>
  );
};

export default PointSystem;
