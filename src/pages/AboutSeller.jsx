import { useEffect, useState } from "react";
import Profileimg from "../assets/profilepage/profimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComments, faPhone } from "@fortawesome/free-solid-svg-icons";
import Star from "../assets/profilepage/star.png";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Image_Slider from "../components/Sliders/Image_Slider";
import { AddToFavourite, GetSingleServiceApi, RemoveFromFavourite } from "../Api_Requests/Api_Requests";
import Loader from "../components/Loader/Loader";
import CustomButton from "../components/Buttons/CustomButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigDetails, updateSelectedPlan } from "../store/Slices/singlegigslice";

export default function AboutSeller() {
  // const [currentGig, SetCurrentGig] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [allowFavourite,setAllowFavourite]=useState(true)
  // const [selectedPlan,setSelectedPlan] = useState('basic')
  const { gigId } = useParams();
  const [userFavouriteGigs, setUserFavouriteGigs] = useState([]);
  const dispatch = useDispatch();


  const handleAddFavourite=async(id)=>{
    try {
      await AddToFavourite({gigId:id})
      toast.success("Added to favourite!")
      let user=JSON.parse(localStorage.getItem('user'))
      user.favouriteGigs.push(id)
      setUserFavouriteGigs(user.favouriteGigs)
      console.log(user.favouriteGigs)
      localStorage.setItem('user',JSON.stringify(user))
    } catch (error) {
      toast.error("Error Adding To Favourite!")
    }
  }

  const handleRemoveFavourite=async(id)=>{
    try {
      await RemoveFromFavourite({ gigId:id })
      toast.success("Removed From favourite!")
      let user=JSON.parse(localStorage.getItem('user'))
      user.favouriteGigs=user.favouriteGigs.filter((gig)=>gig!==id)
      setUserFavouriteGigs(user.favouriteGigs)
      localStorage.setItem('user',JSON.stringify(user))
      
    } catch (error) {
      toast.error("Error Removing From Favourite!")
    }
  }

  const handlePlanClick = (plan) => {
    dispatch(updateSelectedPlan(plan)); 
  };

  const { gig: currentGig, selectedPlan,loading, error } = useSelector((state) => state.singlegig);
  console.log('currentGig',currentGig)


  useEffect(() => {   
      dispatch(fetchGigDetails(gigId));
  }, [dispatch, gigId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  // const fetchGigDetails = async () => {

  //   try {
  //     const response = await GetSingleServiceApi(gigId);
  //     setLoading(false);
  //     if (response.status == 200) {
  //       SetCurrentGig(response.data);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   fetchGigDetails();
  // }, []);

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if(!user) setAllowFavourite(false)
  //   setUserFavouriteGigs(user?.favouriteGigs || []);
  // },[]);

  // const [selectedPlan, setSelectedPlan] = useState("basic");


  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] bg-[black] relative">
          <Loader />
        </div>
      ) : !currentGig && !loading ? (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <div className=" text-center p-6 border-md border-red-900 rounded-lg shadow-xl max-w-md w-full">
            <h1 className="text-4xl text-red-900 mb-4">Error</h1>
            <p className="text-lg mb-4">
              Error fetching Gig Details, Try after some time!{" "}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col lg:flex-row ">
            {/* <h2 className="text-white ml-[10%] text-3xl font-bold ">
        {currentGig.title}
      </h2> */}
            <div className="w-full lg:w-[75%] flex flex-col">
              <h2 className="text-white ml-[10%] text-3xl mt-6 font-bold ml-[auto] mr-[auto] ">
                { currentGig?.title }
              </h2>
              <Image_Slider images={ currentGig?.servicesImages } />
            </div>
            <div className="flex flex-col gap-y-10 items-center justify-center pb-20 lg:w-[25%]">
              <div className="bg-white mx-auto text-black flex flex-col items-center lg:flex-row px-7 py-4 gap-x-5 rounded-lg">
                <Link to={"/profilepage"}>
                  <img
                    className="w-[80px] h-auto bg-cover"
                    src={Profileimg}
                    alt=""
                  />
                </Link>
                <div className="flex flex-col gap-y-4 items-center mt-5 lg:mt-0">
                  <p className="text-xl">{ currentGig?.user_id?.username }</p>
                  <Link to="/orderdetail">
                    <button className="text-black border-black border px-4 p-3 rounded-xl">
                      Order
                    </button>
                  </Link>
                </div>
              </div>
              <div className="bg-[#FFFFFF4A] mt-5 w-full lg:w-[264px] rounded-lg border-t-white border-t">
                <div className="flex">
                  {["basic", "standard", "premium"].map((plan) => (
                    <button
                      key={plan}
                      className={`w-1/3 border border-white rounded-t-lg border-t-0 hover:bg-slate-200 px-4 py-3 ${
                        selectedPlan === plan ? "bg-slate-200" : ""
                      }`}
                      onClick={() => handlePlanClick(plan)}
                    >
                      {plan}
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-y-3 py-3 px-3 text-white">
                  <h1 className="text-xl font-bold">
                    ${currentGig?.pricing[selectedPlan]?.price}
                  </h1>
                  <h3 className="text-lg font-semibold">
                    {currentGig?.pricing[selectedPlan]?.packageDetails}
                  </h3>
                  <ul className="flex flex-col gap-y-3">
                    <li>
                      Delivery time:
                      {currentGig?.pricing[selectedPlan]?.delivery}
                    </li>
                    <li>
                      Revisions:{currentGig?.pricing[selectedPlan]?.revisions}
                    </li>
                    <li>
                      Screens:{currentGig?.pricing[selectedPlan]?.totalScreen}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-[4%] md:pl-10">
            <div className="flex flex-col gap-y-6 text-white">
              <h1 className="text-4xl font-bold">About this gig:</h1>
              <p className="text-xl text-gray-500">{currentGig?.description}</p>
            </div>
            <div className="flex flex-col gap-y-6 text-white mt-10">
            {allowFavourite&&(userFavouriteGigs.includes(currentGig._id) ? (
              <div>
              <CustomButton
               onClick={()=>{handleRemoveFavourite(currentGig._id)}}
               label="Remove from Favourites"
               bgColor="bg-[#FF4B4B]"
               hoverColor="hover:bg-[#D93A3A]"
               icon={FaRegHeart}
     />
             </div>
            ) : (
              <div>
             <CustomButton
             onClick={()=>{handleAddFavourite(currentGig._id)}}
             label="Add To Favourites"
            bgColor="bg-[#6B4B91]"
        hoverColor="hover:bg-[#593978]"
        icon={FaHeart}
      />
              </div>
            ))}
              <h1 className="text-4xl font-bold">Tags</h1>
              <div className="flex flex-wrap gap-2">
                {currentGig?.serviceTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-y-6 text-white mt-10">
              <h1 className="text-4xl font-bold">What I Require?</h1>
              <ul className="flex flex-col gap-y-3 text-gray-500">
                {currentGig.questions.length === 0 ? (
                  <p className="text-gray-500">No Questions yet!</p>
                ) : (
                  currentGig.questions.map((q) => <li>{q}</li>)
                )}
              </ul>
            </div>
          </div>

          <div>
            <div className="flex flex-row gap-x-5  text-white mx-[4%] mt-12 ">
              <Link to={"/profilepage"} className="">
                <img className="mt-5" src={Profileimg} alt="Profile" />
                <img
                  className="relative -top-60 left-40"
                  src={Star}
                  alt="Star"
                />
              </Link>
              <div className="flex flex-col gap-y-3">
                <h1 className="text-3xl font-bold">UI/UX Designer</h1>
                <p className="text-xl"> @{currentGig?.user_id?.username}</p>

                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2x"
                    className="text-yellow-500"
                  />
                  <h1 className="ml-2 font-bold text-xl">
                    4.5 <span className="font-normal text-lg">(23)</span>
                  </h1>
                </div>

                <div className="flex items-center mt-4">
                  <FontAwesomeIcon
                    icon={faComments}
                    size="2x"
                    className="white"
                  />
                  <h1 className="ml-2 font-semibold text-xl">
                    English, German, Spanish
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mx-[4%]">
            <h2 className="text-2xl font-bold mb-6">Popular Gigs</h2>
            <div className="flex flex-wrap justify-start gap-x-10 mb-10">
              {gigs.map((gig, index) => (
                <Smaller_Card
                  key={index}
                  title={gig.title}
                  rating={gig.rating}
                  price={gig.price}
                  image={gig.image}
                />
              ))}
            </div>
            <button className="bg-gradient-to-br from-[#DE0588]  to-[#460BCB] rounded-xl mx-[46%]  text-white px-5 py-4   ">
              View More
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
}
