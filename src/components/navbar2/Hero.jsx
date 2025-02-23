import Search from "../../assets/search-normal.png";
import Heroimg from "../../assets/heroimg.png";
import Giglistbox from "../../assets/profilepage/gigbox.png";
import { useNavigate, Link } from "react-router-dom";

export default function Hero() {
const navigate=useNavigate()
  return (
    <div className="bg-[#1c081c] h-auto md:h-[90vh] flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-5">
      {/* Left content */}
      <div className="w-full md:w-3/5 lg:w-2/5 flex flex-col items-start gap-y-3 p-5">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Call <span className="text-[#fe5284]">Simple</span>
          <span className="text-[#ffe35c]">work's</span> communication <br />{" "}
          <span className="text-[#a0e4f7]">experts.</span>
        </h1>
        <p className="text-[#FFFFFF] text-sm md:text-base">
          Every conversation is a business opportunity. Make the most of it with
          simplework’s human-powered virtual receptionist and live chat
          solutions.
        </p>
        {/* Search input */}
        <div className="flex items-center justify-between border w-full md:w-3/4 border-gray-500 rounded-2xl px-3">
          <input
            type="text"
            placeholder="Discover Simplework"
            className="p-4 bg-transparent text-white outline-none placeholder-gray-300 w-full"
          />
          <img src={Search} alt="Search Icon" className="w-5 h-5" />
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 mt-2">
          <button className="bg-pink-500 flex flex-row items-center text-white gap-x-2 px-6 md:px-12 py-4 md:py-5 rounded-lg">
            <img src={Giglistbox} alt="Gig Icon" className="w-6 h-6" />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap" onClick={()=>{navigate('/gigList')}}>
              Gig Listing
            </h1>
          </button>
          <Link to='seller/findjob' className="bg-[#460bcb] flex flex-row items-center w-fit text-white gap-x-2 px-6 md:px-8 py-4 md:py-5 rounded-lg">
            <img src={Giglistbox} alt="Seller Job Icon" className="w-6 h-6" />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">
              Seller Job Listing
            </h1>
          </Link>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full md:w-3/5 lg:w-2/5 flex justify-center">
        <img className="w-[80%] h-auto md:h-[70vh]" src={Heroimg} alt="Hero" />
      </div>
    </div>
  );
}
