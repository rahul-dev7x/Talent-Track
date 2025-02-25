import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiUrl, axiosInstance } from "../../utills/api.js";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone_number: "",
    password: "",
    role: "",
    profile_img: "",
  });

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
    const data=new FormData();
    data.append("fullName",formData.fullName);
    data.append("email",formData.email);
    data.append("phone_number",formData.phone_number);
    data.append("password",formData.password);
    if(formData.profile_img)
    {
      data.append("profile_img",formData.profile_img)
    }

    try {

      const response=await axiosInstance({...apiUrl.register,data:data,headers:{
        "Content-Type":"multipart/form-data"
      }});
      console.log(response)
    } catch (error) {




    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-center font-bold text-2xl mb-6 text-gray-800">
          Register On Talent Track
        </h1>
        <form className="space-y-6  p-4 " onSubmit={handleSubmit}>
          <div className="space-y-2  flex items-center justify-center flex-col gap-4">
            <img
              src={profileImg}
              className="cursor-pointer border rounded-full"
              width={56}
              height={32}
            />
            <Label htmlFor="profile_img">Profile Picture</Label>

            <Input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="profile_img"
            />
          </div>

          <div className="space-y-2">
            <Label>Full Name:</Label>
            <Input
              type="text"
              placeholder="Enter Your Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
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
              type="number"
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
          <Button
            className="w-full max-w-4xl p-6 rounded-xl font-bold text-xl "
            type="submit"
          >
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
