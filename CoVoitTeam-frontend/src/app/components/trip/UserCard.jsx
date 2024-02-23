import React, { useEffect, useState } from "react";
import DefaultProfilePicture from "../../assets/images/DefaultProfilePicture.png";
import { URL_USER_PROFILE } from "../../constants/urls/urlFrontEnd";
import { Link } from "react-router-dom";
import { getCommentByUserId } from "../../api/backend/account";
import { toast } from "react-toastify";
import Rating from "../Rating";

const UserCard = ({ users }) => {
  const [userDataList, setUserDataList] = useState([]);

  useEffect(() => {
    if (users && users.length > 0) {
      const promises = users.map((user) => getCommentByUserId(user.id));
      Promise.all(promises)
        .then((responses) => {
          const userData = responses.map((res) => res.data);
          setUserDataList(userData);
        })
        .catch((error) => toast.error(error.response.data.error));
    }
  }, [users]);

  const calculateRating = (comments) => {
    let rating = 0;
    comments.forEach((comment) => {
      rating += comment.rating;
    });
    rating /= comments.length;
    rating = Math.round(rating * 2) / 2; // Arrondi au multiple de 0,5 le plus proche
    return rating;
  };
  return (
    <div className="cardUser flex-col m-4">
      {users.map((user, index) => (
        <React.Fragment key={index}>
          <div className="flex">
            {userDataList[index] && (
              <>
                <div className=" w-1/2">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Image de profile par défaut"
                      className="h-36"
                    />
                  ) : (
                    <img
                      src={DefaultProfilePicture}
                      alt="Image de profile par défaut"
                      className="h-36"
                    />
                  )}
                </div>
                <div className="flex flex-col justfiy-center w-1/2 gap-2">
                  <div className="flex justify-end">
                    <Rating
                      rating={calculateRating(userDataList[index])}
                      readOnly
                    />
                  </div>
                  <h1 className="text-3xl">
                    {user.firstname} {user.lastname}
                  </h1>
                  <p>{userDataList[index].length} avis</p>
                  <Link
                    to={`${URL_USER_PROFILE}/${user.id}`}
                    className="linkProfile"
                  >
                    Voir le profil
                  </Link>
                </div>
              </>
            )}
          </div>
          {users.length - 1 !== index && (
            <div className="divider self-center"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default UserCard;
