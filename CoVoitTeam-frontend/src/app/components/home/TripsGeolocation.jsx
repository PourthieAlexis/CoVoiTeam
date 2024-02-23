import React, { useState } from "react";
import { showTripsByGeolocation } from "../../api/backend/trips.js";
import axios from "axios";
import "../../assets/styles/components/tripsGeolocation.css";
import CarGreen from "../../assets/images/car-green-right-alone.png";
import loader from "../../assets/images/loader.gif";

function TripsGeolocation() {
  const [trips, setTrips] = useState([]);
  const [status, setStatus] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  let coordinates = {};
  //on vérifie que le navigator a bien l'outil de géolocalisdation et on verifie en meme temps que latitude et la longitude est a null
  if (navigator.geolocation && latitude === null && longitude === null) {
    //on récupère les coordonnées gps
    navigator.geolocation.getCurrentPosition(
      (success) => {
        setLongitude(success.coords.longitude);
        setLatitude(success.coords.latitude);
      },
      (err) => {
        if (err.code === 1 || err.code === 3) {
          //si la personne refuse la geolocalisation on récupère son ip pour recuperer les données gps moins précis
          axios
            .get("https://api.ipify.org/?format=json")
            .then((res) => {
              const ip = res.data.ip;
              axios
                .get("http://ip-api.com/json/" + ip)
                .then((res) => {
                  setLongitude(res.data.lon);
                  setLatitude(res.data.lat);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        }
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  }

  if (latitude !== null && longitude !== null && !status) {
    //une condition pour recuperer les trajet
    coordinates = {
      latitude: latitude,
      longitude: longitude,
    };
    showTripsByGeolocation(coordinates)
      .then((res) => {
        let datas = res.data;
        let tab = [];
        for (let i = 0; i < datas.length; i++) {
          tab[i] = {
            date: datas[i].date,
            trip: JSON.parse(datas[i].trip),
          };
        }
        console.log(tab);
        setTrips(tab);
        setStatus(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="trips-container">
      <h2 className="mb-4 text-green md:leading-[80px] lg:text-left lg:mb-[30px]">
        Prochains départs
        <span className="text-yellow"> proche de chez moi</span>
      </h2>

      {
        <div className="div-trips-geolocation">
          {
            //on verifie le status
            status ? (
              <>
                {
                  //on affiche les données reçu
                  trips.map((trip) => {
                    let arrival = false;
                    let departure = true;
                    return (
                      <div
                        key={trip.trip.id}
                        className={
                          "flex justify-around items-center bg-gray mx-52 mt-10 trips-items-geolocation"
                        }
                      >
                        <div>
                          <p className={"text-yellow font-bold"}>
                            {new Intl.DateTimeFormat("fr-FR", {
                              day: "numeric",
                              month: "long",
                            }).format(Date.parse(trip.date.date))}
                          </p>
                        </div>
                        <div className={"justify-items-start"}>
                          <p>
                            {trip.trip.steps.map((step) => {
                              if (step.type === "departure") {
                                departure = true;
                                return (
                                  <span className={"text-green"} key={step.id}>
                                    {step.city}-
                                  </span>
                                );
                              } else if (step.type === "arrival") {
                                arrival = true;
                                return (
                                  <span className={"text-yellow"} key={step.id}>
                                    {step.city}
                                  </span>
                                );
                              }
                            })}
                            {departure ? (
                              <></>
                            ) : (
                              <>
                                <span className={"text-green"}>
                                  {trip.trip.user.address.city}
                                </span>{" "}
                                -
                              </>
                            )}
                            {arrival ? (
                              <></>
                            ) : (
                              <>
                                <span className={"text-yellow"}>
                                  {" "}
                                  {trip.trip.user.address.city}
                                </span>
                              </>
                            )}
                          </p>
                        </div>
                        <div>
                          <p>
                            <span className={"text-green font-bold"}>
                              {new Intl.DateTimeFormat("fr-FR", {
                                hour: "2-digit",
                                minute: "2-digit",
                              }).format(Date.parse(trip.date.date))}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })
                }
              </>
            ) : (
              <>
                <div
                  className={"flex justify-center items-center flex-col h-full"}
                >
                  <p className={"text-lg mb-10"}>Chargement</p>
                  <img src={loader} alt="loader" className="w-[8rem]" />
                </div>
              </>
            )
          }
        </div>
      }
    </div>
  );
}

export default TripsGeolocation;
