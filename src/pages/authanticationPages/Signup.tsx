/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { pic } from "../../assets";
import { useState } from "react";
import { useSignupMutation } from "../../redux/features/authantication/AuthenticationApi";
import Toast from "../../components/ulittls/Toast";

const Signup = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [signup] = useSignupMutation();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleCheckboxChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: form.address.value,
      password: form.password.value,
    };

    try {
      const res: any = await signup(formData);

      if (res.error) {
        setToastMessage(res.error.data.message);
      } else {
        setToastMessage("Registration successful!");
        navigate("/login");
        form.reset();
      }
    } catch {
      setToastMessage("Something went wrong");
      form.reset();
    }

  };

  return (
    <main className="md:flex mt-36 justify-center items-center">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      {/* sm device */}
      <div className="w-full h-full md:hidden">
        <img className="w-full" src={pic.login} alt="" />
      </div>

      {/* form section */}
      <div className="md:ml-20 md:w-3/6 m-auto p-3">
        <form onSubmit={handleSubmit} className="font-titlefont">
          <p className="font-semibold text-2xl">Registration now!</p>
          <p className="text-gray-400 mt-2">
            Already have an account?
            <Link to="/login">
              <small className="font-semibold ml-3 text-blue-500">Login</small>
            </Link>
          </p>
          <p className="font-bodyfont mt-2">Name</p>
          <input
            className="w-full outline-none border p-1 rounded mt-1"
            type="text"
            name="name"
            placeholder="Your name"
            required
          />
          <p className="font-bodyfont mt-2">Email address:</p>
          <input
            className="w-full outline-none border p-1 rounded mt-1"
            type="email"
            name="email"
            placeholder="Your email"
            required
          />
          <p className="font-bodyfont mt-2">Phone No:</p>
          <input
            className="w-full outline-none border p-1 rounded mt-1"
            type="text"
            name="phone"
            placeholder="Your phone no"
            required
          />
          <p className="font-bodyfont mt-2">Address:</p>
          <input
            className="w-full outline-none border p-1 rounded mt-1"
            type="text"
            name="address"
            placeholder="Your address"
            required
          />
          <p className="font-bodyfont mt-2">Password</p>
          <input
            className="w-full outline-none border p-1 rounded mt-1"
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <div className="flex gap-2 mt-2">
            <input type="checkbox" onChange={handleCheckboxChange} />
            <p>Remember you</p>
          </div>
          <input
           className={`w-full p-2 rounded bg-blue-700 ${isChecked ? 'opacity-80 hover:opacity-100 cursor-pointer' : 'opacity-55 cursor-not-allowed'} duration-500 text-white mt-4`}

            type="submit"
            value="Registration"
            disabled={!isChecked}
          />
        </form>
      </div>

      {/* lg device */}
      <div className="md:block hidden">
        <img src={pic.login} alt="" />
      </div>
    </main>
  );
};

export default Signup;
