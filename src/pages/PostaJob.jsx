import React, { useEffect, useState } from "react";
import { getCategories, postajob } from "../Api_Requests/Api_Requests";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PostaJob() {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("a");
  const [level, setLevel] = useState("");
  const [categories, setCategories] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [isDateRange, setIsDateRange] = useState(false);
  const [isAsap, setIsAsap] = useState(true);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(currentUser);
    if (!currentUser) {
      navigate("/login", { replace: true });
    }
  }, []);
  const handlePostJob = async () => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    if (!description || !jobTitle || !category || !minPrice || !maxPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Extract category details
    const category_name = category.split("||")[0];
    const category_id = category.split("||")[1];

    // Construct the payload
    const payload = {
      title: jobTitle,
      description,
      category: {
        category_name,
        category_id,
      },
      salary: {
        min: minPrice,
        max: maxPrice,
      },
      job_timeline: isDateRange ? `${startDate} to ${endDate}` : `${false}`,
      is_immediate: isAsap ? "Immediate" : `${false}`,
      user_id: currentUser?._id,
      experience_level: level,
      profileImage: currentUser?.profileImage || "", // Include profile image from local storage
    };

    // Send the payload
    try {
      const response = await postajob(payload);
      if (response.status === 201) {
        toast.success("Job Posted Successfully!");
        navigate("/");
      } else {
        toast.error("Failed to create new job");
      }
    } catch (error) {
      toast.error("An error occurred while posting the job");
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response.status === 200) {
      const data = await response.data;
      setCategories(data.categories);
    } else {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-black via-purple-900 to-purple-800 p-10">
      <div className="w-full   p-10 rounded-lg shadow-lg">
        <h1 className="text-white text-4xl mb-8">Post a Job</h1>

        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-white mb-2">Job Title</label>
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Category</label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option className="text-black/80" value="" disabled selected>
                  select category
                </option>
                {categories &&
                  categories.map((category, index) => (
                    <option
                      className="text-black/80"
                      onClick={() => alert(category._id)}
                      key={index}
                      value={`${category?.category}||${category?._id}`}
                    >
                      {category?.category}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block text-white mb-2">Deadline</label>
              <div className="flex gap-2 items-center p-3">
                <div className="flex items-center gap-1 text-white flex-1">
                  <input
                    type="radio"
                    id="date-range"
                    name="deadline"
                    checked={isDateRange}
                    value={"date-range"}
                    onChange={(e) => {
                      setIsDateRange(true);
                      setIsAsap(false);
                    }}
                    className="p-3 bg-transparent h-5 w-5 accent-[#DE0588]"
                  />
                  <label htmlFor="date-range">Specific Time</label>
                </div>
                <div className="flex items-center gap-1 text-white flex-1">
                  <input
                    type="radio"
                    id="asap"
                    name="deadline"
                    checked={isAsap}
                    value={"asap"}
                    onChange={(e) => {
                      setIsDateRange(false);
                      setIsAsap(true);
                    }}
                    className="p-3 bg-transparent h-5 w-5 accent-[#DE0588]"
                  />
                  <label htmlFor="asap">Immediate</label>
                </div>
              </div>
            </div>
            {isDateRange && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-white mb-2">Start Date</label>
                  <input
                    type="date"
                    title="Start date"
                    value={startDate}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-white mb-2">End Date</label>
                  <input
                    type="date"
                    title="End date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-white mb-2">Experience Level</label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option className="text-black/80">Select Level</option>
                <option className="text-black/80" value="Any Level">
                  Any Level
                </option>
                <option className="text-black/80" value="Junior Level">
                  Junior Level
                </option>
                <option className="text-black/80" value="Mid Level">
                  Mid Level
                </option>
                <option className="text-black/80" value="Senior Level">
                  Senior Level
                </option>
              </select>
            </div>
            {/* <div>
              <label className="block text-white mb-2">Work On</label>
              <select
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option className="text-black/80" value="" disabled selected>
                  Select Work Type
                </option>
                <option className="text-black/80" value="On-Site">
                  On-Site
                </option>
                <option className="text-black/80" value="Remote">
                  Remote
                </option>
              </select>
            </div> */}
            <div>
              <label className="block text-white mb-2">Price Range</label>
              <div className="flex gap-4 items-center">
                {/* Min Price Input */}
                <div className="relative w-full">
                  <input
                    type="number"
                    placeholder="From"
                    value={minPrice}
                    min={0}
                    onKeyDown={(e) => {
                      if (e.key === "-" || e.key === "e" || e.key === "E") {
                        e.preventDefault();
                        toast.error("Price Range must be positive");
                      }
                    }}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full p-3 pr-8 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none appearance-none"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                </div>

                <span className="text-white text-lg">-</span>

                {/* Max Price Input */}
                <div className="relative w-full">
                  <input
                    type="number"
                    placeholder="To"
                    value={maxPrice}
                    min={minPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full p-3 pr-8 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    $
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white mb-2">Description</label>
            <textarea
              className="w-full p-3 bg-transparent border border-gray-500 text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
              rows="5"
              maxLength="500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job..."
            />
            <div className="text-right text-gray-400 text-sm">
              {description.length} / 500
            </div>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handlePostJob}
              type="button"
              className="w-[300px]  p-5  py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white  hover:opacity-90"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
