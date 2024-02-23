import React from "react";
import homePageImg from "../assets/images/bandeau_home_page.png";

const PointSystemView = () => {
  return (
    <div className="px-8">
      <div className="flex flex-col items-center mb-40">
        <img src={homePageImg} alt="home_page" className="" />
        <div className="point-system-logo"></div>
        <div className="flex flex-row flex-wrap mb-12">
          <h2 className="text-left w-full">
            <span className="text-green">Les CoVoit'</span>
            <span className="text-yellow">Points</span>
          </h2>
          <div className="w-1/2 point-system-image"></div>
          <div className="w-1/2">
            Les CoVoit'Points sont l'unité de mesure utilisée sur notre plateforme de covoiturage solidaire pour les personnes à mobilité réduite. 
            Chaque CoVoit'Point équivaut à un kilomètre parcouru lors d'un trajet de covoiturage. 
            Ce système de points offre une solution flexible et équitable pour calculer le coût des trajets partagés. 
            Les utilisateurs peuvent gagner des CoVoit'Points en offrant des places dans leur véhicule aux personnes à mobilité réduite 
            et les utiliser pour payer leurs propres déplacements sur la plateforme.
          </div>
        </div>
        <div className="flex flex-row flex-wrap mb-12">
          <h2 className="text-left w-full">
            <span className="text-green">L'achat de </span>
            <span className="text-yellow">Points</span>
          </h2>
          <div className="w-full">
            Les CoVoit'Points peuvent être achetés sur notre site web. Pour acheter des CoVoit'Points, les utilisateurs doivent se connecter 
            à leur compte et accéder à la section "Acheter des Points". Ils peuvent sélectionner le nombre de points qu'ils souhaitent acheter 
            et effectuer le paiement en utilisant les méthodes de paiement disponibles sur la plateforme, telles que les cartes de crédit, 
            les virements bancaires ou d'autres options de paiement en ligne sécurisées. Une fois le paiement confirmé, 
            les CoVoit'Points sont crédités sur le compte de l'utilisateur et peuvent être utilisés pour réserver des trajets de covoiturage.
          </div>
        </div>
        <div className="flex flex-row flex-wrap mb-12">
          <h2 className="text-left w-full">
            <span className="text-green">La vente de </span>
            <span className="text-yellow">Points</span>
          </h2>
          <div className="w-full">
            Les utilisateurs ont également la possibilité de revendre leurs CoVoit'Points inutilisés sur notre plateforme. Pour ce faire, ils peuvent accéder 
            à la section "Revendre des Points" sur leur compte. Ils peuvent spécifier le nombre de points qu'ils souhaitent vendre. 
            Les CoVoit'Points mis en vente seront alors visibles pour d'autres utilisateurs sur la plateforme. 
            Lorsqu'un acheteur intéressé effectue l'achat, les CoVoit'Points sont transférés du vendeur à l'acheteur, 
            et le paiement convenu est crédité sur le compte du vendeur.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointSystemView;
