import React, { useState } from "react";

const ImagesCarContainer = ({ images }) => {
  const [imageLarge, setImageLarge] = useState(images[0]);

  const handleChangeImage = (e) => {
    setImageLarge(e.target.src);
  };
  return (
    <div className="container-images w-4/5 lg:w-1/3 mx-auto flex flex-row flex-wrap">
      <img
        src={imageLarge}
        alt="image vehicule"
        className="w-full aspect-[14/9] mx-auto mb-2"
      />
      {images.map((image, index) => (
        <img
          src={image}
          alt="image vehicule"
          key={index}
          className="w-[24%] hover:cursor-pointer "
          onClick={handleChangeImage}
        />
      ))}
    </div>
  );
};

export default ImagesCarContainer;
