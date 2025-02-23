import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainImage1 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import MainImage2 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import MainImage3 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import Thumbnail1 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import Thumbnail2 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import Thumbnail3 from "../../assets/populargigs/gigspix.png"; // Replace with actual images
import './index.css'

const images = [
  { id: 1, main: MainImage1, thumbnail: Thumbnail1 },
  { id: 2, main: MainImage2, thumbnail: Thumbnail2 },
  { id: 3, main: MainImage3, thumbnail: Thumbnail3 },
];

const Image_Slider = ({ images }) => {
  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className=" py-10">
      <div className="container mx-auto">
        {/* Main Slider */}
        <Slider {...settingsMain} className="relative w-[60%] h-[60%] mx-auto">
          {images.map((image) => (
            <div key={image.publicId}>
              <img
                src={image.imgUrl}
                alt={`Main Slide ${image.publicId}`}
                className="w-full h-[500px] object-cover rounded-lg"
                style={{ maxHeight: "500px" }}
              />
            </div>
          ))}
        </Slider>

        {/* Thumbnail Slider */}
        <div className="mt-4 w-[60%] mx-auto">
          <Slider {...settingsThumbs}
          className="relative w-[80%] mx-auto custom-slider"
          >
            {images.map((image) => (
              <div key={image.publicId} className="px-2">
                <img
                  src={image.imgUrl}
                  alt={`Thumbnail ${image.publicId}`}
                  className="w-40 h-40 object-cover rounded-lg"
                  style={{ width: "160px", height: "160px" }}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Image_Slider;
