import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DragNDrop from "../Inputs/DragNDrop";
import { AddNewServiceApiStep4 } from "../../Api_Requests/Api_Requests";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addGig } from "../../store/Slices/gigslice";

const Gallery = ({ setActiveStep }) => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, setError, formState: { errors } } = useForm();
  const gigId = useSelector((state) => state?.gig?.gigId);
  const dispatch=useDispatch()

  const onSubmit = async (data) => {
    try {
      if (!data.file1 || !data.file2 || !data.file3) {
        setError("file1", { type: "manual", message: "All three images are required" });
        return;
      }
      if (!gigId) {
        throw new Error("No gig Id");
      }

      

      const formData = new FormData();
      if (data.file1) formData.append("servicesImages", data.file1);
      if (data.file2) formData.append("servicesImages", data.file2);
      if (data.file3) formData.append("servicesImages", data.file3);

      setLoading(true);
      const response = await AddNewServiceApiStep4(formData, gigId);
      setLoading(false);
      if (response.status === 200) {
        dispatch(addGig({gig:response.data.data}))
        toast.success("Pictures uploaded successfully!");

        setActiveStep((prev) => prev + 1);
      } else {
        throw new Error("Request Error");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="w-full flex flex-col text-white justify-center items-center px-4 sm:px-6"
    >
      <div className="flex flex-col w-full md:w-[80%] mt-7">
        <div className="font-semibold text-2xl md:text-3xl text-center md:text-left">
          Showcase Your Services In A Gig Gallery
        </div>
        <div className="text-sm md:text-base font-thin w-full md:w-[70%] mb-1 text-center md:text-left">
          Images (up to 03)
        </div>
        <div className="relative w-full md:w-[90%] self-center py-4 flex flex-wrap gap-2 sm:gap-6 justify-center text-black/60 font-semibold">
          <Controller
            name="file1"
            control={control}
            render={({ field, fieldState }) => (
              <DragNDrop
                {...field}
                error={fieldState.error || errors.file1?.message}
                setError={setError}
                id="file1"
              />
            )}
          />
          <Controller
            name="file2"
            control={control}
            render={({ field, fieldState }) => (
              <DragNDrop
                {...field}
                error={fieldState.error}
                setError={setError}
                id="file2"
              />
            )}
          />
          <Controller
            name="file3"
            control={control}
            render={({ field, fieldState }) => (
              <DragNDrop
                {...field}
                error={fieldState.error}
                setError={setError}
                id="file3"
              />
            )}
          />
        </div>
        {errors.file1 && (
          <div className="text-red-500 text-sm mt-2">{errors.file1.message}</div>
        )}
      </div>
      <div className="w-full md:w-[80%] py-8 px-3 flex flex-wrap gap-4 justify-center">
        <div className="w-full sm:w-[300px]">
          <button
            type="button"
            onClick={() => setActiveStep((prev) => prev - 1)}
            className="p-4 max-w-96 capitalize border border-white/50 font-normal text-sm md:text-xl w-full rounded-md hover:bg-white/10"
          >
            Previous
          </button>
        </div>
        <div className="w-full sm:w-[300px]">
          <button
            type="submit"
            className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-sm md:text-xl w-full rounded-md hover:opacity-90"
          >
            {loading ? "Uploading..." : "Continue"}
          </button>
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
        </div>
      </div>
    </form>
  );
};

export default Gallery;
