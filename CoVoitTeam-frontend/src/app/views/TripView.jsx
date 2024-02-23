import { useEffect, useState } from "react";
import TripDetails from "../components/trip/TripDetails";
import UserCard from "../components/trip/UserCard";
import { useParams } from "react-router-dom";
import { getTripById } from "../api/backend/account";
import { toast } from "react-toastify";
import { convertVeryLongDate } from "../utils/formatUtils";
import TripPreference from "../components/trip/TripPreference";

const TripView = () => {
  const [tripData, setTripData] = useState(null);
  const [userBooking, setUserBooking] = useState(null);
  const { trip_id } = useParams();

  useEffect(() => {
    if (trip_id) {
      getTripById(trip_id)
        .then((res) => {
          console.log(res.data);

          if (res.status === 200) {
            setTripData(res.data);

            setUserBooking(
              res.data.bookings
                .map((booking) => booking.user)
                .filter((user) => user !== undefined)
            );
          }
        })
        .catch((error) => toast.error(error.response.data.error));
    }
  }, []);
  return (
    <div className="flex flex-col items-center m-6">
      {tripData && (
        <>
          <h1>{convertVeryLongDate(tripData.date)}</h1>
          <TripDetails trip={tripData} />
          <UserCard users={[tripData.user]} />
          <TripPreference />
          <UserCard users={userBooking} />
        </>
      )}
    </div>
  );
};
export default TripView;
