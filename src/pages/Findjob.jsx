import {
  faMapMarked,
  faMapMarkedAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAllJobs, getCategories } from "../Api_Requests/Api_Requests";
import { PuffLoader } from "react-spinners";
import avatar from "../assets/profilepage/profimg.png"

export default function Findjob() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    priceRange: "",
    level: "",
  });
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs(filters);
      setLoading(false);
      if (response.status === 200) {
        const data = response.data;
        setAllJobs(data.jobs);
      } else {
        throw new Error("Error fetching jobs!");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setFilters({ category: "", priceRange: null, level: "" });
    setPriceRange("");
  };

  useEffect(() => {
    fetchAllJobs();
  }, [filters]);

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response.status === 200) {
      const data = await response.data;
      setCategories(data.categories);
    } else {
      Console.log("Error fetching Catgories!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      {/* Search Section */}
      <div className="flex justify-center mx-4">
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 px-6 sm:px-12 mt-8 rounded-3xl pt-6 pb-8 shadow-lg w-full max-w-4xl">
          <h2 className="text-white text-start text-lg sm:text-2xl mb-4">
            Find Your Job Here
          </h2>
          <div className="bg-white rounded-full flex flex-col sm:flex-row items-center p-2 shadow-md justify-between">
            <div className="flex flex-col  sm:p-0 sm:flex-row w-full">
              <div className="flex items-center px-4 border-b sm:border-b-0 sm:border-r border-gray-300">
                <FontAwesomeIcon
                  icon={faSearch}
                  size="x"
                  className="text-black"
                />
                <input
                  type="text"
                  placeholder="Job Title Or Keyword"
                  className="ml-2 p-2 text-gray-700 focus:outline-none w-full"
                />
              </div>
              <div className="flex items-center px-4 mt-4 sm:mt-0">
                <FontAwesomeIcon
                  icon={faMapMarkedAlt}
                  size="x"
                  className="text-black"
                />
                <input
                  type="text"
                  placeholder="Add Location Or City"
                  className="ml-2 p-2 text-gray-700 focus:outline-none w-full"
                />
              </div>
            </div>
            <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 mt-4 sm:mt-0 sm:ml-4 w-auto sm:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="py-4 px-4 mx-4 my-10">
        <h2 className="text-white mb-4 font-semibold text-xl sm:text-2xl ml-4">
          Filters
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className=" bg-gradient-to-r  from-pink-500 to-purple-600 text-white py-2 px-5 text-sm sm:text-xl rounded-lg outline-none"
              style={{
                width: `${
                  (filters.category.length || "Category ".length) * 10 + 50
                }px`,
              }}
            >
              <option className="text-gray-600 text-sm" value={""}>
                Category
              </option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  className="text-gray-600 text-sm"
                  value={category?.category}
                >
                  {category?.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={priceRange}
              onChange={(e) => {
                if (e.target.selectedIndex == 0) {
                  setFilters({ ...filters, priceRange: "" });
                  setPriceRange(""); // Update state to reflect reset
                  return;
                }
                const selectedOption = e.target.options[e.target.selectedIndex];
                const min = selectedOption.getAttribute("data-min");
                const max = selectedOption.getAttribute("data-max");
                setFilters({
                  ...filters,
                  priceRange: { min: Number(min), max: Number(max) },
                });
                setPriceRange(e.target.value);
              }}
              className="w-auto bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 text-sm sm:text-xl rounded-lg flex items-center outline-none"
            >
              <option className="text-gray-600 text-sm" value={""}>
                Price Range
              </option>
              <option
                className="text-gray-600 text-sm"
                data-min="0"
                data-max="1000"
                value="below-1000"
              >
                Below $1000
              </option>
              <option
                className="text-gray-600 text-sm"
                data-min="1000"
                data-max="5000"
                value="1000-5000"
              >
                $1000 to $5000
              </option>
              <option
                className="text-gray-600 text-sm"
                data-min="5000"
                data-max="99999"
                value="above-5000"
              >
                Above $5000
              </option>
            </select>
          </div>
          <div>
            <select
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              value={filters.level}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 text-sm sm:text-xl rounded-lg flex items-center outline-none"
            >
              <option className="text-gray-600 text-sm" value={""}>
                level
              </option>
              {["Junior Level", "Mid Level", "Senior Level", "Any Level"].map(
                (level, idx) => (
                  <option
                    key={idx}
                    className="text-gray-600 text-sm"
                    value={level}
                  >
                    {level}
                  </option>
                )
              )}
            </select>
          </div>
          <button
            onClick={resetFilter}
            className=" bg-gray-50/10 text-white py-2 px-6 text-sm sm:text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className=" min-h-[100vh] p-6 mt-10 mx-4 sm:mx-8">
        {loading ? (
          <div className="flex justify-center">
            <PuffLoader color="#fa4697" height={100} width={100} />
          </div>
        ) : allJobs.length == 0 ? (
          <div className=" border border-gray-300 text-white px-4 py-3 rounded-md text-center">
            <p className="font-semibold">No Jobs found !</p>
          </div>
        ) : (
          <div className="fade-in">
            <div className=" hidden sm:grid sm:grid-cols-3 ml-1 text-white mb-6 text-lg sm:text-xl font-semibold">
              <div className="text-left">Jobs</div>
              <div className="text-left">Experience</div>
              <div className="text-left">Price</div>
            </div>
            {allJobs.map((job) => (
             <Link to={`/seller/jobdetails/${job._id}`} key={job._id}>
             <div className="bg-gray-100/10 grid grid-cols-1 sm:grid-cols-3 text-white font-bold text-lg sm:text-xl gap-4 items-center p-4 bg-opacity-50 mb-4 rounded-lg">
               <div className="flex items-center gap-4">
                 {/* Image container */}
                 <img
                   src={job.profileImage || avatar}
                   alt={job.title}
                   className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                 />
                 {/* Title and details */}
                 <div>
                   <h2 className="text-lg sm:text-xl font-bold">{job.title}</h2>
                   <p className="text-sm text-gray-400">{job?.category?.category_name}</p>
                   <p className="text-xs text-gray-500">{job.description}</p>
                 </div>
               </div>
               <div>{job.experience_level}</div>
               <div>{`$${job.salary.min}-$${job.salary.max}`}</div>
             </div>
           </Link>
           
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
