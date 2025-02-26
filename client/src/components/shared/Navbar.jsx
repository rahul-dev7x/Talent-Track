import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SlLogout } from "react-icons/sl";
import { GrLinkNext } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { axiosError } from "../../utills/axiosError";
import { toast } from "sonner";
import { apiUrl, axiosInstance } from "../../utills/api";
import { setUser } from "../../redux/auth";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axiosInstance({
        ...apiUrl.logout,
        withCredentials: true,
      });
      //console.log(response);
      if (response.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      const apiErrMessage = axiosError(error);
      toast.error(apiErrMessage);
    }
  };
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 w-full p-4">
      <div className="max-w-7xl flex justify-between items-center mx-auto">
        <div>
          <Link to={"/"}>
            <h1 className="text-2xl font-semibold">
              Talent<span className="text-2xl text-red-600">Track</span>
            </h1>
          </Link>
        </div>
        <div className="flex items-center justify-between gap-6">
          <div className="flex justify-between items-center gap-3">
            <ul className="flex gap-3 cursor-pointer">
              <Link to="/"><li>
              Home
                </li></Link>
              
              <Link to={"/jobs"}>
              <li>Jobs</li>
              </Link>
              <Link to={"/browse"}>
              <li>Browse</li>
              </Link>
              
            </ul>
          </div>
          <div className="flex items-center gap-4 ">
            {user ? (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="outline-none">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent
                    align="center"
                    sideOffset={18}
                    className="w-48 bg-white p-4 shadow-md rounded-lg"
                  >
                    <div className="border-b pb-2 mb-2 font-semibold text-gray-700">
                      My Account
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link to="/profile" className="flex items-center gap-2 ">
                        <GrLinkNext />
                        My Profile
                      </Link>
                      <button
                        className="flex items-center gap-2 "
                        onClick={handleLogout}
                      >
                        <SlLogout />
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              <>
                <Link to={"/register"}>
                  <Button variant="outline">SignUp</Button>
                </Link>
                <Link to={"/login"}>
                  <Button className="bg-blue-500 text-white font-semibold border border-blue-500 hover:bg-white hover:text-blue-500">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
