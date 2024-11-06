/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { pic } from "../../assets";
import { useLoginMutation } from "../../redux/features/authantication/AuthenticationApi";
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useAppDispatch } from "../../redux/hooks";

import { verifyToken } from "./ulitls/VerifyToken";
import { setUser } from "../../redux/features/authantication/AuthenticationSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || location?.state?.from || "/";

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const handleDemoLogin = () => {
    setEmail("user@gmail.com");
    setPassword("123456");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = {
      email: form.email.value,
      password: form.password.value,
    };

    const res: any = await login(formData);

    if (res.error) {
      setToastMessage(res.error.data.message);
    } else {
      setToastMessage("Login successful!");
      navigate(from, { replace: true });
    }

    const user = verifyToken(res.data.token);
    dispatch(
      setUser({
        user: { user },
        token: res.data.token,
      })
    );

    form.reset();
  };

  return (
    <main className="md:flex mt-36 justify-center items-center">
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}

      <div className="w-full h-full md:hidden">
        <img className="w-full" src={pic.login} alt="" />
      </div>

      <div className="md:ml-20 md:w-3/6 m-auto p-3">
        <form onSubmit={handleSubmit} className="font-titlefont">
          <p className="font-semibold text-2xl">Login now!</p>
          <p className="text-gray-400 font-titlefont mt-2">
            Don’t have an account?{" "}
            <Link to="/signup">
              <small className="font-titlefont font-bold text-blue-500">
                Sign-Up
              </small>
            </Link>
          </p>

          <p className="font-semibold mt-2">Email address:</p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="text-[10px] w-20 bg-gray-300 hover:bg-gray-400 duration-500 p-2 rounded mt-2 text-black font-semibold"
          >
            User Demo
          </button>
          <input
            className="w-full outline-none border p-1 rounded mt-2"
            type="email"
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <p className="font-semibold mt-2">Password:</p>
          <div className="relative">
            <input
              className="w-full outline-none border p-1 rounded mt-2 pr-10"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-4"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            className="w-full bg-blue-700 opacity-80 hover:opacity-100 duration-500 p-2 rounded text-white mt-4"
            type="submit"
            value="Login"
          />

          <Link to="/signup">
            <p className="text-center mt-2 underline text-sm text-blue-600">
              Create a new account
            </p>
          </Link>
        </form>
      </div>

      <div className="md:block hidden">
        <img src={pic.login} alt="" />
      </div>
    </main>
  );
};

export default Login;
