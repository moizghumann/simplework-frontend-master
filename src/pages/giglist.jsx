import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownArrow from "../assets/profilepage/downarrow.png";
import gigImage from "../../src/assets/populargigs/gigspix.png";

import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Smaller_Card from "../components/Cards/Smaller_Card";
import { useSelector } from "react-redux";

const gigs = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },

  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },

  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
];

export default function Giglist() {
  const { allGigs, error, loading } = useSelector((state) => state?.gig);
  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      <div className="flex justify-center  mx-[4%]">
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 px-12 mt-[5%] rounded-3xl pt-10 pb-10 h-[270px] shadow-lg w-[1200px]  ">
          <h2 className="text-white text-start text-3xl mb-4">welcome back</h2>
          <div className="flex flex-row justify-around ">
            <div className="bg-[#D9D9D980] rounded-xl p-5">
              <h1 className="text-white mb-3">Recommended for you</h1>

              <div className="flex flex-row text-white gap-x-5 justify-around items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="xl"
                  className="text-gray-500 p-2 border rounded-full border-white"
                />
                <div className="">
                  <h1 className="text-xl">Get matched with freelancers</h1>
                  <p>create A brief and get custom offers</p>
                </div>
                <button className="border border-white p-2 rounded-lg">
                  create brif
                </button>
              </div>
            </div>
            <div className="bg-[#D9D9D980]  rounded-2xl p-5">
              <h1 className="text-white mb-3">Recommended for you</h1>

              <div className="flex flex-row text-white gap-x-5 justify-around items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="xl"
                  className="text-gray-500 p-2 border rounded-full border-white"
                />
                <div className="">
                  <h1 className="text-xl">Get matched with freelancers</h1>
                  <p>create A brief and get custom offers</p>
                </div>
                <button className="border border-white p-2 rounded-xl">
                  create brif
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" py-4 px-6 mx-[4%] my-[70px]">
        <h2 className="text-white mb-4 font-semibold text-2xl ml-[10%]">
          Filters
        </h2>
        <div className="flex space-x-10 justify-center">
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Category{" "}
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Price Range{" "}
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Deadline{" "}
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Deadline{" "}
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Verified{" "}
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 text-xl flex flex-row items-center px-6 ">
            Level
            <span className="ml-2">
              <img className="mt-2" src={DownArrow} alt="" />
            </span>
          </button>
        </div>
      </div>
      <div className="mx-[4%]">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Popular Gigs
        </h2>
        {!error && allGigs.length !== 0 ? (
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">\
            {allGigs.map((gig, index) => (
              <Link to={`/aboutseller/${gig._id}`} key={gig._id}>
                <Smaller_Card
                  title={gig.title}
                  rating={gig.rating}
                  price={gig?.pricing?.standard?.price}
                  image={gig.servicesImages[0]?.imgUrl}
                />
              </Link>
            ))}
          </div>
        ) : !error && allGigs.length == 0 ? (
          <div className=" border border-gray-300 text-white px-4 py-3 rounded-md text-center">
            <p className="font-semibold">No Gigs found</p>
            <p className="text-sm">
              It seems like there’s nothing here yet. Check back later!
            </p>
          </div>
        ) : (
          <div
            className="border-1 border-red-800 text-red-700 p-4 "
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>
              Something went wrong while listing gigs! Please try again later.
            </p>
          </div>
        )}
        (
        <div className="flex justify-center">
          {/* <button className="bg-gradient-to-br mb-3 from-[#DE0588] to-[#460BCB] rounded-xl text-white px-5 py-4">
            View More
          </button> */}
        </div>
        )
      </div>
    </div>
  );
}
