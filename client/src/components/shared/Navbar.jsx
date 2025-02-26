import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SlLogout } from "react-icons/sl";
import { GrLinkNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user}=useSelector(state=>state.auth)
  return (
    <div className="bg-white shadow-md fixed top-0 left-0 w-full  p-4 ">
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
              <Link to="/">Home</Link>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>
          </div>
          <div className="flex items-center gap-4 ">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="cursor-pointer w-48 bg-white p-8">
                    <DropdownMenuLabel className="border-b-2">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="">
                      <div className="flex items-center gap-2 ">
                        <GrLinkNext />
                        <DropdownMenuItem className="cursor-pointer">
                          My Profile
                        </DropdownMenuItem>
                      </div>
                      <div className="flex gap-2 items-center ">
                        <SlLogout />
                        <DropdownMenuItem className="cursor-pointer">
                          Logout
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
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
