import { useEffect, useState,useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import DOMPurify from "dompurify";
import colorPicker from "../../assets/icons/color_picker.png";
import {
  AddNewServiceApiStep1,
  getCategories,
  getSubCategories,
} from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { setId } from "../../store/Slices/gigslice";
import { useDispatch } from "react-redux";

const Overview = ({ setActiveStep }) => {
  const colorRef = useRef();
  const [text, setText] = useState("");
  const maxLength = 100;
  const [length, setLength] = useState(0);
  const [loading,setLoading]=useState(false)
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const dispatch=useDispatch()
  const handleChange = (e) => {
    if (e.key === "Backspace") {
      if (length === 0) return;
      setLength((prev) => prev - 1);
    } else if (e.key.length === 1) {
      setLength((prev) => prev + 1);
    }
  };

  const renderFormattedContent = () => {
    let formattedContent = text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
      .replace(/_(.*?)_/g, "<i>$1</i>")
      .replace(/__(.*?)__/g, "<u>$1</u>")
      .replace(
        /<span style="color:(.*?)">(.*?)<\/span>/g,
        '<span style="color:$1">$2</span>'
      );
    return { __html: DOMPurify.sanitize(formattedContent) };
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };
  const {
    register,
    handleSubmit,
    control,
    clearErrors,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      subcategory: "",
      metaData: {
        appTool: [],
        designTool: [],
        device: [],
      },
      serviceTags: [],
      description:""
    },
  });

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.status === 200) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await getSubCategories(categoryId); 
      if (response.status === 200) {
        setSubcategories(response.data.subcategories.subcategories);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories", error);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const onSubmit = async(payload) => {
    payload.serviceTags = getValues("serviceTags").split(",").map((tag) => tag.trim());
      try {
        setLoading(true)
        const response = await AddNewServiceApiStep1(payload);
        if (response.status === 200) {
          
          const gigId=response.data.data._id
          setLoading(false)
          dispatch(setId({id:gigId}))
          setActiveStep((prev)=>prev+1)
          toast.success("Details Submitted Successfully!")
          

        } else {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
        toast.error("Something went wrong")
      }
    
    
    
  };

  const metadataCategories = [
    {
      title: "App Type",
      subtitle: "Select The Types Of Applications You Specialize In.",
      options: ["Business", "Books", "Events", "Education", "Games"],
      field: "appTool",
    },
    {
      title: "Design Tool",
      subtitle: "Select The Design Tools You Deliver In Your Gig Or Extras.",
      options: ["Marvel", "Figma", "Adobe XD", "Fluid", "Zeplin"],
      field: "designTool",
    },
    {
      title: "Device",
      subtitle: "What Mobile Do You Design For?",
      options: ["Events", "Education", "Business", "Books", "Games"],
      field: "device",
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-24 flex flex-col text-white mt-10"
    >
      {/* Gig Title */}
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Gig Title</h2>
        <span className="text-lg font-normal text-white/50">
          As your Gig storefront, your title is the most important place to
          include keywords that buyers would likely use to search for a service
          like yours
        </span>
        <textarea
          {...register("title", { required: "Gig Title is required." })}
          className="w-full p-4 bg-transparent border-2 border-white/50 text-white rounded-3xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          rows="5"
          maxLength="100"
          placeholder="Gig Title..."
        />

        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2 my-5">
    <h2 className="text-3xl font-semibold">Category</h2>
    <span className="text-lg font-normal text-white/50">
      Choose the Category and Sub-Category most suitable for your Gig
    </span>
    
    <div className="flex gap-8 mt-3 flex-wrap">
      {/* Category Selection */}
      <div className="flex flex-col min-w-72">
        <select
          {...register("category", { required: "Category is required." })}
          onChange={(e) => {
            const selectedCategoryId = e.target.options[e.target.selectedIndex].dataset.id;
            setValue("category", e.target.value); 
            clearErrors("category"); 
            fetchSubcategories(selectedCategoryId); 
          }}
          className={"w-full p-4 bg-transparent border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none border-white/50"}
        >
          <option className="text-black/80" value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option
              className="text-black/80"
              key={category._id}
              value={category.category}
              data-id={category._id}
            >
              {category.category}
            </option>
          ))}
        </select>
        
        {errors.category && (
          <span className="text-red-500 mt-1">{errors.category.message}</span>
        )}
      </div>

     
      <div className="flex flex-col min-w-72">
        <select
          {...register("subcategory", {
            required: "Subcategory is required.",
          })}
          onChange={() => clearErrors("subcategory")} 
          className={"w-full p-4 bg-transparent border-2 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none border-white/50"}
        >
          <option className="text-black/80" value="" disabled>
            Select Sub Category
          </option>
          {subcategories.map((subcategory, index) => (
            <option
              className="text-black/80"
              key={index}
              value={subcategory.name}
            >
              {subcategory.name}
            </option>
          ))}
        </select>
        {/* Inline error to prevent layout shift */}
        {errors.subcategory && (
          <span className="text-red-500 mt-1">{errors.subcategory.message}</span>
        )}
      </div>
    </div>
</div>


      {/* Metadata */}
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Gig Metadata</h2>
        <div className="mt-3 flex flex-wrap justify-between gap-4">
          {metadataCategories.map((category, index) => (
            <div
              key={index}
              className="p-6 rounded-xl shadow-lg border-2 border-white/50 flex-1 min-w-60"
            >
              <h3 className="text-lg font-semibold mb-2 text-white/80">
                {category.title}
              </h3>
              <p className="text-sm mb-4 text-white/50">{category.subtitle}</p>
              <div className="grid grid-cols-2 gap-2">
                {category.options.map((option) => (
                  <Controller
                    key={option}
                    name={`metaData.${category.field}`}
                    control={control}
                    render={({ field }) => (
                      <label className="inline-flex items-center relative">
                        <input
                          type="checkbox"
                          value={option}
                          onChange={(e) => {
                            const valueArray = field.value || [];
                            field.onChange(
                              e.target.checked
                                ? [...valueArray, option]
                                : valueArray.filter((val) => val !== option)
                            );
                          }}
                          checked={field.value?.includes(option) || false}
                          className="peer h-5 w-5 appearance-none border border-gray-300 rounded-lg checked:bg-white"
                        />
                        <span className="absolute left-1 flex items-center justify-center text-black font-bold text-sm opacity-0 peer-checked:opacity-100">
                          ✓
                        </span>
                        <span className="ml-2">{option}</span>
                      </label>
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-2 my-5">
        <div className="font-semibold text-3xl">Description</div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-normal text-white/50">
            Briefly Describe your Gig
          </span>
          <div className="flex items-center space-x-1">
            <button
              // onClick={() => {
              //   setBold((prev) => !prev);
              //   execCommand("bold");
              // }}
              disabled
              className={`p-2 w-10 aspect-square text-xl font-bold ${
                bold && "bg-white/10 rounded-md"
              }`}
            >
              B
            </button>
            <button
              // onClick={() => {
              //   setItalic((prev) => !prev);
              //   execCommand("italic");
              // }}
              disabled
              className={`p-2 w-10 aspect-square text-xl italic font-serif ${
                italic && "bg-white/10 rounded-md"
              }`}
            >
              I
            </button>
            <button className="flex justify-center items-center w-10 aspect-square"disabled>
              <img
                src={colorPicker}
                height={25}
                width={25}
                // onClick={() => colorRef.current.click()}
                className=""
              />
            </button>
            <button
            disabled
              // onClick={() => {
              //   setUnderline((prev) => !prev);
              //   execCommand("underline");
              // }}
              className={`p-2 w-10 aspect-square text-xl underline  ${
                underline && "bg-white/10 rounded-md"
              }`}
            >
              U
            </button>
            <input
              type="color"
              className="invisible w-0"
              id=""
              ref={colorRef}
              // hidden
              // onChange={(e) => execCommand("foreColor", e.target.value)}
            />
            {/* <button
                      onClick={() => execCommand("foreColor", "red")}
                      className="p-2 text-xl text-red-500"
                    >
                      RED
                    </button>
                    <button
                      onClick={() => execCommand("foreColor", "blue")}
                      className="p-2 text-xl text-blue-500"
                    >
                      BLUE
                    </button> */}
          </div>
        </div>
        <div className="relative w-full" /*onKeyDown={handleChange}*/>
          <textarea
            {...register("description", {
              required: "The description must be atleast 10 characters!",
              minLength: { value: 10, message: "The description must be atleast 10 characters!" },
              maxLength:{  value: 100, message: "The description must not exceed 100 characters!" }
            })}
            id="description"
            className="w-full p-4 bg-transparent border-2 border-white/50 text-white rounded-3xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            placeholder="Gig Description ..."
            rows="5"
            maxLength="100"
          />
          {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}

          <div className="absolute bottom-4 right-4 text-white text-[.7rem]">
            {length}/{maxLength}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 my-5">
        <h2 className="text-3xl font-semibold">Positive Keywords</h2>
        <input
          {...register("serviceTags", {
            required: "Positive keywords are required.",
            validate: (value) =>
              value.split(",").length <= 5 || "Only 5 keywords are allowed.",
          })}
          className="w-full p-4 bg-transparent border-2 border-white/50 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="Enter up to 5 positive keywords, separated by commas"
        />
        {errors.serviceTags && (
          <span className="text-red-500">{errors.serviceTags.message}</span>
        )}
      </div>

      {/* Continue Button */}
      <div className="my-3">
        <button
          type="submit"
          className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
        >
          {loading ? "Please wait!" : "Continue"}
        </button>
      </div>
      {/*only for development purpose to skip step */ }
      {/* <div className="my-3">
        <button
          type="button"
          onClick={() => {
            setActiveStep((prev) => prev + 1);
          }}
          className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
        >
          next
        </button>
      </div>  */}
    </form>
  );
};

export default Overview;
