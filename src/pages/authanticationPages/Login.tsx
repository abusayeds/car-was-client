/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link, useNavigate } from "react-router-dom";
import { pic } from "../../assets";
import { useLoginMutation } from "../../redux/features/authantication/AuthenticationApi";
import { useState } from "react";
import Toast from "../../components/ulittls/Toast";
import { useAppDispatch } from "../../redux/hooks";

import { verifyToken } from "./ulitls/VerifyToken";
import { setUser } from "../../redux/features/authantication/AuthenticationSlice";

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const handleCloseToast = () => {
    setToastMessage(null);
  };

  const hendelSubmit = async (event: any) => {
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
      setToastMessage("Login successful ! ");

      navigate("/");
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
    <main className=" md:flex mt-36 justify-center items-center ">
      {/* Toast Component */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => handleCloseToast()} />
      )}
      {/* sm devise */}
      <div className="w-full h-full md:hidden">
        <img className="w-full" src={pic.login} alt="" />
      </div>
      {/* sm devise */}
      <div className=" md:ml-20  md:w-3/6 m-auto p-3  ">
        <form onSubmit={hendelSubmit} className=" font-titlefont">
          <p className="font-semibold text-2xl"> Login now ! </p>
          <p className="text-gray-400 font-titlefont mt-2">
            Doesn,t have an account ?{" "}
            <Link to="/signup">
              {" "}
              <small className=" font-titlefont font-bold text-blue-500">
                Sign-Up
              </small>
            </Link>
          </p>

          <p className=" font-semibold mt-2">Email address : </p>
          <input
            className="w-full outline-none border p-1 rounded mt-2 "
            type="email"
            name="email"
            placeholder="Your email"
            required
          />

          <br />
          <p className=" font-semibold mt-2">Password</p>
          <input
            className="w-full outline-none border p-1 rounded mt-2 "
            type="password"
            name="password"
            placeholder="password"
            required
          />
          <br />

          <br />
          <input
            className="w-full bg-blue-700 opacity-80 hover:opacity-100 duration-500 p-2 rounded text-white"
            type="submit"
            value="Login"
          />
          <br />
          <Link to="/signup">
            <p className="  text-center mt-2 underline text-sm  text-blue-600">
              create a new account
            </p>
          </Link>
        </form>
      </div>
      <div className=" md:block hidden ">
        <img className="" src={pic.login} alt="" />
      </div>
    </main>
  );
};

export default Login;
