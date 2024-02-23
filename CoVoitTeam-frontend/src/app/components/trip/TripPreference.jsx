import { MusicalNoteIcon } from "@heroicons/react/24/solid";
import React from "react";

const TripPreference = () => {
  return (
    <div className="cardPreference">
      <p className="textBlue text-5xl">
        Critères <span className="textYellow">du trajet</span>
      </p>
      <div className="flex justify-evenly w-4/5">
        <div className="flex gap-4 items-center">
          <MusicalNoteIcon className="h-12 w-12 text-blue-500" />
          <p className="text-xl">Musique pendant le trajet</p>
        </div>
      </div>
    </div>
  );
};

export default TripPreference;
