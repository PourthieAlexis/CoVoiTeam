import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik';
import yellowCar from '../../assets/images/voiture_jaune_small.png';
import greenCar from '../../assets/images/voiture_verte_small.png';
import { addAddress } from '../../api/backend/account';
import { toast } from "react-toastify";
import { getToken, getPayloadToken } from '../../services/tokenServices';
import { getSuggestions, handleAddressChange, handleAddressClick } from '../../services/addressServices';

function Address() {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const token = getToken();
    const email = getPayloadToken(token).email;

    /* Initialise les suggestions d'adresses lors du chargement de la page */
    useEffect(() => {
      getSuggestions(); 
    }, []);

    /* Met à jour les suggestions d'adresses en fonction de l'input utilisateur */
    const handleAddressInputChange = (e) => {
      const query = e.target.value;
      setSelectedSuggestion(query);
      handleAddressChange(query, setSelectedAddress, setSuggestions );
    };
  
    /* Mettre à jour l'adresse séléctionnée */
    const handleAddressItemClick = (selectedLabel) => {
      handleAddressClick(selectedLabel, suggestions, setSelectedSuggestion, setSelectedAddress, setSuggestions);
    };
        
    const onSubmit = (values) => {
      if (selectedSuggestion && selectedSuggestion.properties) {
        let additionalAddress = '';
        let street = selectedSuggestion.properties.street;
        // Vérifiez si la rue ne contient pas le mot "Rue"
        if (!selectedSuggestion.properties.street.includes("Rue")) {
          additionalAddress = selectedSuggestion.properties.street;
          street = '';
        }
        addAddress({
          email : email,
          number: selectedSuggestion.properties.housenumber,
          street: street,
          zipcode: selectedSuggestion.properties.postcode,
          city: selectedSuggestion.properties.city,
          country : 'France',
          latitude : selectedSuggestion.geometry.coordinates[0],
          longitude : selectedSuggestion.geometry.coordinates[1],
          additional_address: additionalAddress,
        })
          .then((res) => {
            toast.success(res.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.error);
          });
      } else {
        toast.error("Aucune adresse sélectionnée ou adresse incomplète.");
      }
    };

    return (
        <div className="relative">
          <div className="login-title mt-[35px] mb-[20px] h-[80px] flex justify-center items-center text-center">
            Ajouter une adresse
          </div>
          <div>
            <div className="login-box h-[400px] mb-12">
              <hr />
              <Formik initialValues={{ address: "" }} onSubmit={onSubmit}>
                <Form className='flex flex-col'>
                  <div className="field-container mb-36">
                    <label htmlFor="address" className="login-email-label">
                      Adresse
                    </label>
                      <Field
                        type="text"
                        name="address"
                        placeholder="Entrez votre adresse"
                        autoComplete="off"
                        onChange={(e) => handleAddressInputChange(e)}
                        value={selectedAddress}
                        className="input-login"
                      />
                      { suggestions.length > 0 && (
                        <ul className='w-[558px] absolute ml-[5.5em] p-2 bg-primary rounded-b-lg'>
                          {suggestions.map((suggestion) => (
                          <li key={suggestion.properties.id} onClick={() => handleAddressItemClick(suggestion.properties.label)}>
                            <div className="text-white hover:text-black">
                              {suggestion.properties.label}
                            </div>
                          </li>
                          ))}
                        </ul>
                      )}
                  </div>
                    <button type="submit" className="validation-login">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span> 
                      Valider 
                    </button>
                </Form>
              </Formik>
            </div>
          </div>
          <img src={yellowCar} alt="voiture_jaune" className="absolute top-12 left-[-290px] rotate-[2deg]" />
          <img src={greenCar} alt="voiture_verte" className="absolute bottom-[-110px] right-[-335px] z-10" />
        </div>
      );
}

export default Address