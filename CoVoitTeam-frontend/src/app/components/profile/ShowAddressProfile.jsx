import React, { useEffect } from "react";

const ShowAddressProfile = ({ address, handleSwitchMode }) => {
  return (
    <div className="container-profile">
      <h2 className="leading-[80px] text-green">Adresse</h2>
      <div className="content-profile-show">
        {address ? (
          <>
            <div className="item-profile-show">
              <div className="text-green lg:w-[250px]">Numéro et voie</div>
              <div>
                {address.number}&nbsp;{address.street}
              </div>
            </div>
            {address.additionale_address ? (
              <div className="item-profile-show">
                <div className="text-green lg:w-[250px]">
                  Complément d'adresse
                </div>
                <div>{address.additionale_address}</div>
              </div>
            ) : (
              <></>
            )}

            <div className="item-profile-show">
              <div className="text-green lg:w-[250px]">Code postal</div>
              <div>{address.zipcode}</div>
            </div>
            <div className="item-profile-show">
              <div className="text-green lg:w-[250px]">Ville</div>
              <div>{address.city}</div>
            </div>
            <div className="item-profile-show">
              <div className="text-green lg:w-[250px]">Pays</div>
              <div>{address.country}</div>
            </div>
            <button className="btn-submit w-2/3 lg:w-[459px] text-green text-[16px] mt-6 lg:mr-4">
              Modifier l'adresse
            </button>
          </>
        ) : (
          <div>
            <p className="text-left px-8">
              Vous n'avez pas d'adresse enregistrée.
            </p>
            <button
              className="btn-submit w-2/3 lg:w-[459px] text-green text-[16px] mt-6 lg:mr-4"
              onClick={() => handleSwitchMode(true)}
            >
              Ajouter une adresse
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowAddressProfile;
