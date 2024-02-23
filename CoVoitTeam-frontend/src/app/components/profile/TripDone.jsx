import React from "react";
import { convertLongDate } from "../../utils/formatUtils";
import { Link } from "react-router-dom";
import { URL_TRIP } from "../../constants/urls/urlFrontEnd";
const TripDone = ({ trips }) => {
  console.log(trips);
  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <h1 className="tripTitle">Liste des trajets effectués</h1>
      <div className="tripCard">
        {trips.length > 0 ? (
          trips.map((trip, index) => (
            <div className="content" key={index}>
              <p className="flex self-start">{convertLongDate(trip.date)}</p>
              <Link to={`${URL_TRIP}/${trip.id}`} className="text-center">
                {trip.steps[0].city}
              </Link>
              {trips.length - 1 !== index && <div className="divider"></div>}
            </div>
          ))
        ) : (
          <div>
            <p className="text-center">
              Vous n'avez pas de trajets effectués pour l'instant
            </p>
            <p className="text-center">Vos trajets s'afficheront ici</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDone;
