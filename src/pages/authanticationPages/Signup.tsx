/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { pic } from "../../assets";
import { useState } from "react";
import { useSignupMutation } from "../../redux/features/authantication/AuthenticationApi";
import Toast from "../../components/ulittls/Toast";
import { uploadImageToImgBB } from "../../utils/ImageUpload";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  profileImage: string | null;
  coverImage: string | null;
}

const Signup = () => {
  const [signup] = useSignupMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility toggle
  const navigate = useNavigate();

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData: FormData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      password: form.password.value,
      profileImage: profileImageUrl,
      coverImage: coverImageUrl,
    };
    console.log(formData);

    try {
      const res: any = await signup(formData);

      if (res?.error) {
        setToastMessage(res?.error?.data?.message);
      } else {
        setToastMessage("Registration successful!");
        navigate("/login");
        form.reset();
        setProfileImageUrl(null);
        setCoverImageUrl(null);
      }
    } catch {
      setIsUploading(false);
      setToastMessage("Something went wrong");
      form.reset();
    }
  };

  const profileImgUpload = async (profileImage: any) => {
    setIsUploading(true);
    const imgURL = await uploadImageToImgBB(profileImage);
    if (imgURL) {
      setProfileImageUrl(imgURL);
      setIsUploading(false);
    } else {
      setProfileImageUrl(null);
      setIsUploading(false);
    }
  };

  const coverImgUpload = async (profileImage: any) => {
    setIsUploading(true);
    const imgURL = await uploadImageToImgBB(profileImage);
    if (imgURL) {
      setCoverImageUrl(imgURL);
      setIsUploading(false);
    } else {
      setCoverImageUrl(null);
      setIsUploading(false);
    }
  };

  return (
    <main className="md:flex my-20 justify-center items-center">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}

      {/* sm device */}
      <div className="w-full h-full md:hidden">
        <img className="w-full object-cover" src={pic.login} alt="" />
      </div>

      {/* form section */}
      <div className="md:ml-20 md:w-5/6 m-auto p-3">
        <form onSubmit={handleSubmit} className="font-titlefont w-full">
          <p className="font-semibold text-2xl">Register now!</p>
          <p className="text-gray-400 mt-2">
            Already have an account?
            <Link to="/login">
              <small className="font-semibold ml-3 text-blue-500">Login</small>
            </Link>
          </p>

          <div className="md:flex gap-2 w-full">
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Name</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="name"
                placeholder="Your name"
                required
              />
            </ul>
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Address:</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="address"
                placeholder="Your address"
                required
              />
            </ul>
          </div>
          <div className="md:flex gap-2 w-full">
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Phone No:</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full"
                type="text"
                name="phone"
                placeholder="Your phone no"
                required
              />
            </ul>
            <ul className="md:w-1/2 relative">
              <p className="font-bodyfont mt-2">Password</p>
              <input
                className="outline-none border p-1 rounded mt-1 w-full pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                required
              />
              <span
                className="absolute right-2 md:top-11 top-9 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </ul>
          </div>
          <div>
            <p className="font-bodyfont mt-2">Email address:</p>
            <input
              className="md:w-full outline-none border p-1 rounded mt-1"
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
          </div>
          <div className="md:flex gap-2 w-full">
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Profile Image:</p>
              <input
                type="file"
                className="outline-none border p-1 rounded mt-1 w-full"
                accept="image/*"
                onChange={(e) => {
                  profileImgUpload(e.target.files?.[0] || null);
                }}
              />
              {profileImageUrl && (
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="mt-2 w-32 h-32 rounded-md object-cover"
                />
              )}
            </ul>
            <ul className="md:w-1/2">
              <p className="font-bodyfont mt-2">Cover Image:</p>
              <input
                type="file"
                className="outline-none border p-1 rounded mt-1 w-full"
                accept="image/*"
                onChange={(e) => {
                  coverImgUpload(e.target.files?.[0] || null);
                }}
              />
              {coverImageUrl && (
                <img
                  src={coverImageUrl}
                  alt="Cover"
                  className="mt-2 w-32 h-32 rounded-md object-cover"
                />
              )}
            </ul>
          </div>
          {isUploading ? (
            <p className="w-full text-center p-2 rounded bg-blue-700 hover:opacity-90 cursor-pointer duration-500 text-white mt-4">
              Loading ...
            </p>
          ) : (
            <input
              className="w-full p-2 rounded bg-blue-700 hover:opacity-90 cursor-pointer duration-500 text-white mt-4"
              type="submit"
              value="Register"
              disabled={isUploading}
            />
          )}
        </form>
      </div>

      {/* lg device */}
      <div className="md:block hidden">
        <img className="object-cover" src={pic.login} alt="" />
      </div>
    </main>
  );
};

export default Signup;
