import React, { useEffect, useState, useRef } from "react";
import SimpleImageSlider from "react-simple-image-slider";

const ImageSlider = ({ images }) => {
  const sliderContainerRef = useRef(null);
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    height: 0,
  });

  const updateSliderDimensions = () => {
    if (sliderContainerRef.current) {
      const containerWidth = sliderContainerRef.current.clientWidth;
      const aspectRatio = 9 / 16; // 고정 비율 (height / width)
      const containerHeight = containerWidth * aspectRatio;
      setSliderDimensions({
        width: containerWidth,
        height: containerHeight,
      });
    }
  };

  useEffect(() => {
    updateSliderDimensions(); // 초기 실행

    window.addEventListener("resize", updateSliderDimensions); // 리사이즈 이벤트 핸들러 등록

    return () => {
      window.removeEventListener("resize", updateSliderDimensions); // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    };
  }, []);

  return (
    <div ref={sliderContainerRef} style={{ width: "100%" }}>
      <SimpleImageSlider
        width={sliderDimensions.width}
        height={sliderDimensions.height}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
};

export default ImageSlider;
