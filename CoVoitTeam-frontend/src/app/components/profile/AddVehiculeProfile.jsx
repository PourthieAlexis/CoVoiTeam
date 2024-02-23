import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import VehiculeInitialValues from "../../formik/initialValues/VehiculeInitialValues";
import { schemaAddVehicule } from "../../formik/yup/VehiculeYup";
import { addCar, getBrands, getModels } from "../../api/backend/car.backend";
import { storage } from "../../services/firebaseServices";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Compressor from "compressorjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { URL_USER_PROFILE } from "../../constants/urls/urlFrontEnd";

/**
 * Component AddVehicule
 *
 * @author Laurence Delporte
 */

const AddVehicule = ({ userId, handleSwitchMode }) => {
  const navigate = useNavigate();
  const flag = useRef(false);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelsFiltered, setModelsFiltered] = useState([]);
  const [values, setValues] = useState(VehiculeInitialValues);
  const [imagesList, setImagesList] = useState([]);
  const [imagesCounter, setImagesCounter] = useState(0);

  useEffect(() => {
    if (flag.current === false) {
      getBrands()
        .then((data) => {
          setBrands(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
      getModels()
        .then((data) => {
          setModels(data.data);
          setModelsFiltered(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return () => (flag.current = true);
  }, []);

  const handleUpdateModels = (event) => {
    const dataFiltered = models.filter(
      (model) => model.brand === "/api/brands/" + event.target.value
    );
    setModelsFiltered(dataFiltered);
  };

  /**
   * function setFieldValue
   * @param {string} field
   * @param {string} value
   * @returns {void}
   * @description Permet de mettre à jour les valeurs du formulaire, sans passer par le state
   *
   */
  const setFieldValue = (field, value) => {
    values[field] = value;
  };

  const handleAddImages = (e) => {
    if (imagesCounter > 3)
      return toast.error("Vous ne pouvez pas ajouter plus de 4 images");
    const file = e.target.files[0];
    makeCompressor(file, {
      width: 500,
      quality: 1,
      success(imageBlob) {
        const imageRef = ref(storage, `images/medium/${imageBlob.name + v4()}`);
        uploadImage(imageRef, imageBlob);
        setImagesCounter((prev) => prev + 1);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleAddVehicule = (values) => {
    values.color = values.color.slice(1);
    values.user_id = userId;
    values.images = imagesList;
    addCar(values).then((res) => {
      if (res.status === 200) {
        toast.success("Véhicule ajouté");
        handleSwitchMode(false);
        navigate(URL_USER_PROFILE);
      }
    });
  };

  function makeCompressor(file, options) {
    return new Compressor(file, options);
  }
  function uploadImage(imageRef, imageBlob) {
    uploadBytes(imageRef, imageBlob).then((snaphsot) => {
      console.log("Image uploaded", imageBlob.name);
      getDownloadURL(snaphsot.ref).then((url) => {
        setImagesList((prev) => [...prev, url]);
      });
    });
  }

  return (
    <div>
      <h2 className="text-green leading-[80px]">Véhicule</h2>
      <Formik
        initialValues={VehiculeInitialValues}
        validationSchema={schemaAddVehicule}
        onSubmit={handleAddVehicule}
      >
        {(errors) => {
          console.log("errors", errors);
          return (
            <Form className="container-form-vehicule">
              <div className="w-full">
                <label htmlFor="brand_id" className="label-form">
                  Marque
                </label>
                <Field
                  as="select"
                  name="brand_id"
                  id="brand_id"
                  className="input-form-register w-full"
                  onChange={(e) => {
                    handleUpdateModels(e),
                      setFieldValue("brand_id", e.target.value);
                  }}
                >
                  <option key="0" value="" className="">
                    Choisir une marque
                  </option>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id} className="">
                      {brand.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="error-form-register"
                />
              </div>
              <div className="w-full">
                <label htmlFor="model_id" className="label-form">
                  Modèle
                </label>
                <Field
                  as="select"
                  type="text"
                  name="model_id"
                  id="model_id"
                  className="input-form"
                >
                  <option key="0" value="">
                    Choisir un modèle
                  </option>
                  {modelsFiltered.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="model"
                  component="div"
                  className="error-form-register"
                />
              </div>
              <div className="w-full">
                <label htmlFor="color" className="label-form">
                  Couleur
                </label>
                <Field
                  type="color"
                  name="color"
                  id="color"
                  className="input-form"
                />
                <ErrorMessage
                  name="color"
                  component="div"
                  className="error-form-register"
                />
              </div>
              <div className="w-full">
                <label htmlFor="year" className="label-form">
                  Année
                </label>
                <Field
                  type="text"
                  name="year"
                  id="year"
                  className="input-form"
                  maxLength="4"
                />
                <ErrorMessage
                  name="year"
                  component="div"
                  className="error-form-register"
                />
              </div>
              <div className="w-full">
                <label htmlFor="registration" className="label-form">
                  Immatriculation
                </label>
                <Field
                  type="text"
                  name="registration"
                  id="registration"
                  className="input-form"
                  maxLength="9"
                />
                <ErrorMessage
                  name="registration"
                  component="div"
                  className="error-form-register"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="images"
                  className="label-form add-vehicule-label"
                >
                  Importer une image{" "}
                  <span className="add-vehicule-span">
                    (Formats acceptés: png, jpeg, jpg, webp) / (4 max)
                  </span>
                </label>
                <input
                  type="file"
                  className="input-form"
                  onChange={handleAddImages}
                />
                <ErrorMessage
                  name="images"
                  component="div"
                  className="error-form-register"
                />
                <div className="flex flex-row">
                  {imagesList.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="image"
                      className="w-1/4"
                    />
                  ))}
                </div>
              </div>
              <button type="submit" className="btn-submit w-1/2">
                Valider
              </button>
              <div className="w-full text-left">
                <button
                  onClick={() => handleSwitchMode(false)}
                  className=" hover:underline"
                >
                  Annuler
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddVehicule;
