import React from "react";

const TripDetails = ({ trip }) => {
  const departureTrip = trip.steps.find((step) => step.type === "departure");
  const arrivalTrip = trip.steps.find((step) => step.type === "arrival");

  return (
    <div className="trip-details m-6">
      <h2 className="textBlue">
        {departureTrip && <span>{departureTrip.city} </span>}
        <span className="textYellow">
          - {arrivalTrip && <span>{arrivalTrip.city}</span>}
        </span>
      </h2>
      <div className="flex self-start">
        <div className="trip-step">
          <div className="step-info">
            <div className="trip-bubble-departure"></div>
            <div className="trip-line"></div>
          </div>
          {trip.steps.map(
            (step, index) =>
              step.type !== "departure" &&
              step.type !== "arrival" && (
                <div className="step-info" key={index}>
                  <div className="trip-bubble-step"></div>
                  <div className="trip-line"></div>
                </div>
              )
          )}

          <div className="step-info">
            <div className="trip-bubble-arrival"></div>
          </div>
        </div>
        <div className="trip-step-text">
          {trip.steps.map((step, index) => (
            <p key={index}>
              {step.type === "departure" && "Départ : "}
              {step.type === "step" && "Étape : "}
              {step.type === "arrival" && "Arrivée : "}
              {step.city}
            </p>
          ))}
        </div>
      </div>
      <div className="flex self-end">
        <p>Rayon d'action : 5km</p>
      </div>
      <div className="flex flex-col content-center text-center gap-4">
        <p className="textBlue">Heure de départ : 8h00</p>
        <p className="textYellow">Heure de d'arriver estimer : 10h45</p>
      </div>
    </div>
  );
};

export default TripDetails;
