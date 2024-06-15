import React from "react";
import { Slide } from "react-slideshow-image";

const ImageSlider = ({ images }) => {
  return (
    <div>
      <Slide>
        {images.map((image) => (
          <img key={image} src={image} />
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
