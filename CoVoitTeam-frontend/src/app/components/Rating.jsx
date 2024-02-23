import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const Rating = (props) => {
  const [rating, setRating] = useState(props.rating * 2 - 1 || null);
  const [tempRating, setTempRating] = useState(null);

  const handleMouseover = (rating) => {
    setTempRating(rating);
    setRating(rating);
  };

  const handleMouseout = () => {
    setRating(tempRating);
  };

  const rate = (rating) => {
    setRating(rating);
    setTempRating(rating);
  };

  let stars = [];
  for (let i = 0; i < 10; i++) {
    let klass = <StarIcon key={i} className="h-6 w-6 text-yellow-500" />;
    if (rating >= i && rating !== null) {
      klass = <StarIconSolid key={i} className="h-6 w-6 text-yellow-500" />;
    }
    stars.push(
      <span
        key={i}
        style={{
          display: "inline-block",
          width: "12px",
          overflow: "hidden",
          direction: i % 2 === 0 ? "ltr" : "rtl",
        }}
        {...(!props.readOnly && {
          onMouseOver: () => handleMouseover(i),
          onClick: () => rate(i),
          onMouseOut: () => handleMouseout(),
        })}
      >
        {klass}
      </span>
    );
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
