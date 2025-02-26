import { Link, useNavigate } from "react-router-dom";
import Navbar from "./../shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { axiosError } from "../../utills/axiosError";
import { toast } from "sonner";
import { apiUrl, axiosInstance } from "../../utills/api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../../redux/auth";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading}=useSelector(state=>state.auth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      const response = await axiosInstance({
        ...apiUrl.login,
        data: formData,
        withCredentials: true,
      });
      //console.log(response);
      const data = response.data;
      if (data.success) {
        setFormData({
          email: "",

          password: "",
          role: "",
        });
        toast.success(data.message);
        dispatch(setUser(data.data));
        navigate(data.data.role === "student" ? "/" : "/admin");
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (error) {
      const apiErr = axiosError(error);
      toast.error(apiErr);
    }
    finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div className="min-h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className=" w-full mt-16">
        <div className="flex flex-grow items-center justify-center px-4 mt-20">
          <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
            <h1 className="text-center font-bold text-3xl mb-6 text-gray-800">
              Login On <span className="text-red-500">Talent Track</span>
            </h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    placeholder="*******"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className=" flex items-center gap-8">
                  <Label>Select Role:</Label>
                  <RadioGroup className=" flex items-center gap-4 my-5">
                    <div className="flex items-center gap-2">
                      <Input
                        name="role"
                        type="radio"
                        value="student"
                        onChange={handleChange}
                        checked={formData.role === "student"}
                      />
                      <Label>Student</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        name="role"
                        type="radio"
                        value="recruiter"
                        onChange={handleChange}
                        checked={formData.role === "recruiter"}
                      />
                      <Label>Recruiter</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button className="w-full py-3 rounded-lg font-semibold text-lg bg-gray-800 text-white hover:bg-gray-600 hover:text-white transition duration-100">
                {loading?"...Loading":"Login Now"}
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              New To Talent Track?{" "}
              <Link
                to="/register"
                className="text-emerald-800 font-semibold hover:underline"
              >
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
