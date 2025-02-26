import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiUrl, axiosInstance } from "../../utills/api.js";
import Navbar from "../shared/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup } from "@/components/ui/radio-group";
import { axiosError } from "../../utills/axiosError.js";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { setLoading } from "../../redux/auth/index.js";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    profile_img: "",
  });
  const navigate = useNavigate();
  const {loading}=useSelector(state=>state.auth);
  const [profileImg, setProfileImg] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&s"
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleFileChange = (e) => {
    //console.log(e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profile_img: file });
      const imgUrl = URL.createObjectURL(file);
      setProfileImg(imgUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.profile_img) {
      data.append("profile_img", formData.profile_img);
    }
dispatchEvent(setLoading(true))
    try {
      const response = await axiosInstance({
        ...apiUrl.register,
        data: data,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //console.log(response);
      if (response.data.success) {
        setFormData({
          fullName: "",
          email: "",
          phone_number: "",
          password: "",
          role: "",
          profile_img: "",
        });
        toast.success(response.data.message);
        navigate("/login");
      } else if (response.data.error) {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      //console.log(axios.isAxiosError(error))
      const apiErr = axiosError(error);
      toast.error(apiErr);
    }
    finally{
      dispatchEvent(setLoading(false))
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-grow items-center justify-center px-4 mt-20">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-center font-bold text-3xl mb-6 text-gray-800">
            Register On <span className="text-red-500">Talent Track</span>
          </h1>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-3">
              <label htmlFor="profile_img" className="cursor-pointer">
                <img
                  src={profileImg}
                  className="w-20 h-20 border-2 border-gray-300 rounded-full object-cover"
                  alt="Profile Preview"
                />
              </label>
              <Label htmlFor="profile_img" className="text-gray-600">
                Upload Profile Picture
              </Label>
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="profile_img"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Full Name:</Label>
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
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
                <Label>Phone Number:</Label>
                <Input
                  type="tel"
                  placeholder="+91 9382898643"
                  name="phone_number"
                  value={formData.phone_number}
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
              {loading?"Signing Up":"Sign Up Now"}
            </Button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
