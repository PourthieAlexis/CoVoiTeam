import React, { useEffect, useState } from "react";
import { getUserByEmail, updateUser } from "../api/backend/account";
import { useSelector } from "react-redux";
import { selectUser } from "../redux-store/authenticationSlice";
import loader from "../assets/images/loader.gif";
import DefaultProfilePicture from "../assets/images/DefaultProfilePicture.png";
import UserProfile from "../components/profile/UserProfile";
import TripDone from "../components/profile/TripDone";
import formatBirthdateReadable from "../utils/formatUtils";
import { toast } from "react-toastify";
import AddVehiculeProfile from "../components/profile/AddVehiculeProfile";
import ShowVehiculeProfile from "../components/profile/ShowVehiculeProfile";
import { storage } from "../services/firebaseServices";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Compressor from "compressorjs";
import { getToken } from "../services/tokenServices";
import ShowAddressProfile from "../components/profile/ShowAddressProfile";

const UserProfileView = () => {
  const [userData, setUserData] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const user = useSelector(selectUser);
  const userEmail = user ? user.email : null;
  const [isModeAddVehicule, setIsModeAddVehicule] = useState(false);
  const [isModeAddAddress, setIsModeAddAddress] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    if (userEmail) {
      getUserByEmail(userEmail)
        .then((res) => {
          if (res.status === 200) {
            res.data.birthday = formatBirthdateReadable(res.data.birthday);
            setUserData(res.data);
            setProfilePicture(res.data.profilePicture);
          }
        })
        .catch((error) => toast.error(error.response.data.error));
    }
  }, [trigger]);

  const handleCreateInputProfilePicture = () => {
    const profilePicture = document.querySelector(".profilePicture");
    const isInput = profilePicture.querySelector("input");
    if (isInput) return;
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/png, image/jpeg";
    input.className = "mt-4";
    input.onchange = (e) => uploadProfilePicture(e);
    profilePicture.appendChild(input);
    const button = document.createElement("button");
    button.className =
      "bg-green text-white rounded-md px-2 py-1 px-2 mt-4 hover:cursor-pointer";
    button.innerText = "Annuler";
    button.onclick = handleDeleteInputProfilePicture;
    profilePicture.appendChild(button);
  };

  const handleDeleteInputProfilePicture = () => {
    const profilePicture = document.querySelector(".profilePicture");
    const input = profilePicture.querySelector("input");
    profilePicture.removeChild(input);
    const button = profilePicture.querySelector("button");
    profilePicture.removeChild(button);
  };

  const uploadProfilePicture = (e) => {
    const file = e.target.files[0];
    console.log("file: ", file);
    makeCompressor(file, {
      width: 150,
      quality: 1,
      success(imageBlob) {
        const imageRef = ref(
          storage,
          `images/profile/${imageBlob.name + v4()}`
        );
        uploadImage(imageRef, imageBlob);
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  function makeCompressor(file, options) {
    return new Compressor(file, options);
  }
  function uploadImage(imageRef, imageBlob) {
    uploadBytes(imageRef, imageBlob).then((snaphsot) => {
      console.log("Image uploaded", imageBlob.name);
      getDownloadURL(snaphsot.ref).then((url) => {
        setProfilePicture(url);
        saveNewProfilePicture(url);
      });
    });
  }

  const saveNewProfilePicture = (url) => {
    const values = { profilePicture: url };
    const token = getToken();
    updateUser(userData.id, values, token)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Photo de profil mise à jour");
          handleDeleteInputProfilePicture();
        }
      })
      .catch((error) => console.log("erreur: ", error.response.data.error));
  };

  return (
    <div className="container">
      {userData ? (
        <>
          <div className="flex flex-row items-center card border-4 w-4/5 my-6">
            <div className="profilePicture flex flex-col justify-center items-center w-1/2">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={userData.firstname + " " + userData.lastname}
                  className="h-36 w-36 hover:cursor-pointer rounded-full border-4 border-yellow"
                  onClick={handleCreateInputProfilePicture}
                />
              ) : (
                <img
                  src={DefaultProfilePicture}
                  alt="Image de profile par défaut"
                  className="h-36 hover:cursor-pointer"
                  onClick={handleCreateInputProfilePicture}
                />
              )}
            </div>
            <div className="flex flex-col justfiy-center w-1/2">
              <h1 className="text-3xl">
                {userData.firstname} {userData.lastname}
              </h1>
              <div className="credit flex">
                <p className="mr-1">Solde du compte :</p>
                <span>{userData.credit}</span>
              </div>
            </div>
          </div>
          <UserProfile
            user={userData}
            onStateChange={() => setTrigger((prev) => !prev)}
          />
          <div className="w-4/5 mx-auto">
            {isModeAddAddress ? (
              <AddAddressProfile
                userId={userData.id}
                handleSwitchMode={setIsModeAddAddress}
              />
            ) : (
              <ShowAddressProfile
                address={userData.address}
                handleSwitchMode={setIsModeAddAddress}
              />
            )}
          </div>
          <div className="w-4/5 mx-auto">
            {isModeAddVehicule ? (
              <AddVehiculeProfile
                userId={userData.id}
                handleSwitchMode={setIsModeAddVehicule}
              />
            ) : (
              <ShowVehiculeProfile
                userId={userData.id}
                handleSwitchMode={setIsModeAddVehicule}
              />
            )}
          </div>
          <TripDone trips={userData.trip} />
        </>
      ) : (
        <div className="flex justify-center items-center flex-col h-full">
          <p className="text-lg mb-10">Chargement</p>
          <img src={loader} alt="loader" className="w-[8rem]" />
        </div>
      )}
    </div>
  );
};

export default UserProfileView;
