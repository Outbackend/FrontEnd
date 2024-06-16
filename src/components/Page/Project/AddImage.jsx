import React, { useState } from "react";
import ImageSlider from "./ImageSlider";

const AddImage = ({ image }) => {
  const [images, setImages] = useState(Array.isArray(image) ? image : []);
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddImage = () => {
    if (imageUrl.trim() === "") {
      setErrorMessage("URL이 입력되지 않았습니다.");
      return;
    } else {
      setErrorMessage("");
    }
    setImages([...images, imageUrl]);
    setImageUrl("");
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div className="mb-3 w-full flex">
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="추가할 이미지의 URL을 입력하세요"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="w-[120px] border-l" onClick={handleAddImage}>
          추가하기
        </button>
      </div>
      {errorMessage && <p className="mt-2 mb-2 text-red-500">{errorMessage}</p>}
      <div className="flex flex-col space-y-4">
        {images.map((img, index) => (
          <div key={index} className="flex items-center space-x-4">
            <img
              src={img}
              alt={`image-${index}`}
              className="w-24 h-24 object-cover"
            />
            <button
              className="text-red-500 border p-1"
              onClick={() => handleDeleteImage(index)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <ImageSlider images={images} />
      </div>
    </div>
  );
};

export default AddImage;
