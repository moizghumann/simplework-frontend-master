import { useState } from "react";
import { FaFacebookF, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Publish = ({ setActiveStep }) => {
  const [text, setText] = useState("");
  const maxLength = 100;
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChangeCheckBox = (event) => {
    if (checked.find((dt) => dt === event.target.value)) {
      setChecked(checked.filter((dt) => dt !== event.target.value));
    } else {
      setChecked([...checked, event.target.value]);
    }
  };
  return (
    <div className="w-full flex flex-col text-white justify-center items-center">
      <div className="flex-col w-[80%] mt-7 font-poppins">
        <div className="font-semibold text-3xl">Gig Link</div>
        <div className="text-[1rem] font-normal w-[50%] mt-5">
          https:www.fiver.com/user/sdf/ertfdsa/asdftygfds/asdfg
        </div>
        <div className="relative w-full flex gap-x-3 text-3xl my-5">
          <FaXTwitter className="bg-black p-2 rounded-lg" />
          <RiLinkedinFill className="bg-[#6563FF] p-2 rounded-lg" />
          <FaFacebookF className="bg-[#1976D2] p-2 rounded-lg" />
        </div>
      </div>
      <div className="w-[80%] py-8 px-3 flex gap-4">
        <div className="w-[300px]">
          <button
            onClick={() => setActiveStep((prev) => prev - 1)}
            className="p-4 max-w-96 capitalize border border-white/50 font-normal text-xl w-full rounded-md"
          >
            previous
          </button>
        </div>
        <div className="w-[300px]">
          <button
            onClick={() => setActiveStep((prev) => prev + 1)}
            className="p-4 max-w-96 bg-gradient-to-l capitalize from-[#DE0588] to-[#460BCB] font-normal text-xl w-full rounded-md"
          >
            continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Publish;
