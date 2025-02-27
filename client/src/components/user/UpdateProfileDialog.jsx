import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { axiosError } from "../../utills/axiosError";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import PropTypes from 'prop-types';
import { apiUrl, axiosInstance } from "../../utills/api";
import { setUser } from "../../redux/auth";


const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const [data, setData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    profile_bio: user.profile_bio || "",
    resume: "",
  });
  const [updatedFields, setUpdatedFields] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
    setUpdatedFields({ ...updatedFields, [name]: value })
  }


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    //console.log("file",file)
    if (file) {
      setData({ ...data, resume: file });
      setUpdatedFields({ ...updatedFields, resume: file });
    }
  }
  //console.log("data", data);
  //console.log("updated_fields", updatedFields);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(updatedFields).length === 0) {
      toast.error("No Update Detected.");
      return;
    }
    const formData = new FormData();
    Object.entries(updatedFields).forEach(([key, value]) => {
      formData.append(key, value)
    }
    )



    try {
      const response = await axiosInstance.post(apiUrl.updateprofile.url, formData, {

        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
      //console.log("api_response",response)
      if (response.data.success) {
        dispatch(setUser(response.data.data))
        toast.success(response.data.message);
        setUpdatedFields({});
        setOpen(false);
      }
    }
    catch (error) {
      console.log(error)
      const apiError = axiosError(error);
      toast.error(apiError)
    }
  }



  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent onInteractOutside={() => setOpen(false)} className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-center">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid  items-center gap-4 ">


                <div className="space-y-2">
                  <Label>Full Name:</Label>
                  <Input name="fullName" value={data.fullName} type="text" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Email:</Label>
                  <Input name="email" value={data.email} type="email" onChange={handleChange} />
                </div>
                <div>
                  <Label>Phone Number:</Label>
                  <Input name="phone_number" value={data.phone_number} type="number" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Bio:</Label>
                  <Input name="profile_bio" value={data.profile_bio} type="text" onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Resume:</Label>
                  <Input name="resume" type="file" accept="application/pdf" onChange={handleFileChange} />
                </div>
              </div>
            </div>
            <Button className="w-full bg-gray-300 text-black font-bold hover:bg-gray-100 " >Update Profile</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

UpdateProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default UpdateProfileDialog;
