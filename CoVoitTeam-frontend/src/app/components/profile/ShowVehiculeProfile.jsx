import React, { useEffect, useState } from "react";
import { deleteCarById, getCarsByUserId } from "../../api/backend/car.backend";
import { toast } from "react-toastify";
import ImagesCarContainer from "./ImagesCarContainerProfile";

const ShowVehicule = ({ userId, handleSwitchMode }) => {
  const [cars, setCars] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    getCarsByUserId(userId)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          if (res.data === "Vous n'avez pas de véhicule enregistré.") {
            return setCars(null);
          } else {
            setCars(res.data);
            handleShowColor();
          }
        }
      })
      .catch((error) => toast.error(error.response.data.error));
  }, []);

  const handleDeleteVehicule = (carId) => () => {};

  const handleShowColor = () => {
    const colors = document.querySelectorAll("[data-color]");
    colors.forEach((color) => {
      color.style.backgroundColor = "#" + color.dataset.color;
    });
  };

  return (
    <>
      <h2 className="leading-[80px] text-green">Véhicule(s)</h2>
      {/* TODO transformer le container images en component */}
      <div className="container-vehicule">
        {cars ? (
          cars.map((car) => (
            <div key={car.id} className="border-green border-b-2 pb-8 mb-8">
              <div className="content-vehicule flex flex-col lg:flex-row px-8">
                {car.images ? (
                  <ImagesCarContainer images={car.images} />
                ) : (
                  <div className="container-images">
                    <img src={DefaultCarPicture} alt="image vehicule" />
                  </div>
                )}
                <div className="lg:w-1/3 h-full border-yellow lg:border-r-[1px]">
                  <h3 className="text-yellow leading-[66px]">modèle</h3>
                  <div>
                    <span>{car.brand} - </span>
                    <span>{car.model}</span>
                  </div>
                  <div className="flex flex-row items-center justify-center">
                    <span className="inline-block">Couleur:&nbsp;</span>
                    <span
                      className="inline-block w-6 h-6 rounded-full"
                      data-color={car.color}
                    ></span>
                  </div>
                  <div>
                    <span>{car.registration}</span>
                  </div>
                </div>
                <div className="separator-vehicule"></div>
                <div className="container-accessibility lg:w-1/3">
                  <h3 className="text-yellow leading-[66px]">accessibility</h3>
                  <ul className="list-disc w-1/2 mx-auto text-left">
                    <li>Grand volume de coffre</li>
                  </ul>
                </div>
              </div>
              <button
                className="btn-submit w-2/3 lg:w-[459px] text-green text-[16px] mt-6 lg:mr-4"
                onClick={handleDeleteVehicule(car.id)}
              >
                Supprimer le véhicule
              </button>
            </div>
          ))
        ) : (
          <div>
            <p className="text-left px-8">
              Vous n'avez pas de véhicule enregistré.
            </p>
          </div>
        )}
        <button
          className="btn-submit w-2/3 lg:w-[459px] text-green text-[16px] mt-6 lg:mr-4"
          onClick={() => handleSwitchMode(true)}
        >
          Ajouter un véhicule
        </button>
      </div>
    </>
  );
};

export default ShowVehicule;
