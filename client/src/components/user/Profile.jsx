import { useSelector } from "react-redux";
import Navbar from "./../shared/Navbar";
import { CgDetailsLess } from "react-icons/cg";
import { SiGmail } from "react-icons/si";
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaFilePdf } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";


const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  console.log("user_slice_data", user);
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="mt-36 mx-auto p-8  flex justify-center items-center  shadow-[0px_4px_10px_rgba(0,0,0,0.2)] rounded-xl  max-w-4xl min-h-32">
        <div className="flex flex-col space-y-4 max-w-2xl w-full p-6">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between items-center ">
              <h1 className="text-[36px] text-[#2D2D2D] font-bold ">
                {user.fullName}
              </h1>
              <div className="bg-[#2D2D2D] rounded-full p-4 text-white text-[36px] font-bold">
                {user?.fullName
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>
            </div>
            {/* <div className="border-b-4 rounded-xl"></div> */}
            <div className="flex py-6 flex-col items-center  gap-2">
              <div className="flex gap-4 w-full items-center">
                <CgDetailsLess />
                <h1>{user?.profile_bio ? user.profile_bio : "No Bio"}</h1>
              </div>
              <div className="flex gap-4 w-full items-center">
                <SiGmail />
                <h1>{user?.email ? user.email : "No Mail Id"}</h1>
              </div>
              <div className="flex gap-4 w-full items-center">
                <BiSolidPhoneCall />
                <h1>
                  {user?.phone_number
                    ? user.phone_number
                    : "No Contact Number."}
                </h1>
              </div>
            </div>
          </div>
          <div>
            <h1>Resume</h1>
            <div className="border-2 flex items-center justify-between mt-2 p-4">
              <div className="flex items-center gap-3">
                <div>
                  <FaFilePdf size={44} />
                </div>

                <div className="flex flex-col gap-2">
                  <h1>
                    {user?.profile_resume ? user?.resume_original_name : "No Resume"}
                  </h1>
                  <p>
                    Added{" "}
                    {new Date(
                      user?.created_at.split("T").map((date) => date)[0]
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </div>
              <div

                className=" relative "
              >
                 <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="p-2 rounded-xl hover:bg-blue-100 cursor-pointer"
                >
                  <BsThreeDots />
                </div>
                
                {open && (
                 
                  <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50 flex flex-col gap-8 mt-2 w-48 bg-gray-200 shadow-lg rounded-lg p-4">

                    <div className="flex gap-3 items-center cursor-pointer">
                      <FaCloudDownloadAlt/>
                      <a href={user?.profile_resume}>
                      <p>Download Now</p>
                      </a>
                      
                      </div>
                   
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
