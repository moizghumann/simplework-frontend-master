import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import Smaller_Card from "../Cards/Smaller_Card";
import { useSelector } from "react-redux";

const GigSlider = () => {
  const { allGigs, error } = useSelector((state) => state?.gig);
  const navigate = useNavigate();

  // Responsive slider settings
  const settingsThumbs = {
    slidesToShow: 3, // Default for larger devices
    slidesToScroll: 1,
    speed: 1500,
    infinite: allGigs.length > 2,
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "140",
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280, // Laptops
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024, // Tablets (landscape)
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tablets (portrait)
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480, // Mobile
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="py-8 px-4  lg:px-12 bg-[#222]">
      <div className="container mx-auto">
        <div className="mt-4 w-[80vw] lg:w-full mx-auto">
          {!error && allGigs.length !== 0 ? (
            <>
              <h2 className="text-white text-xl sm:text-4xl mb-1 md:text-4xl mb-4"style={{fontFamily:"poppins"}}>
                Gigs
              </h2>
              <Slider {...settingsThumbs}>
                {allGigs.map((gig) => (
                  <div key={gig._id} className="px-2 w-full w-[100%] md:w-[100%] lg:w-[100%]">
                    <Link to={`/aboutseller/${gig._id}`}>
                      <Smaller_Card
                        className="shadow-none"
                        key={gig._id}
                        title={gig.title}
                        rating={gig.rating}
                        price={gig.pricing?.standard?.price}
                        image={gig.servicesImages[0]?.imgUrl}
                      />
                    </Link>
                  </div>
                ))}
              </Slider>
            </>
          ) : !error && allGigs.length === 0 ? (
            <div className="border border-gray-300 text-white px-4 py-3 rounded-md text-center">
              <p className="font-semibold">No Gigs found</p>
              <p className="text-sm">
                It seems like there’s nothing here yet. Check back later!
              </p>
            </div>
          ) : (
            <div
              className="bg-black border border-red-700 text-red-700 px-4 py-3 rounded-lg relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">
                {" "}
                Something went wrong while listing gigs.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="py-3 px-8 sm:px-10 rounded-md mt-10 bg-gradient-to-br from-[#DE0588] to-[#460BCB] text-lg sm:text-xl text-white"
          onClick={() => {
            navigate("/gigList");
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default GigSlider;
