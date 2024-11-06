/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useSingleUserQuery } from "../../redux/features/user/userApi";
import { useChangePasswordMutation } from "../../redux/features/authantication/AuthenticationApi";
import Toast from "../../components/ulittls/Toast";
import { useNavigate } from "react-router-dom";

// Define an interface for the errors object
interface Errors {
  email?: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.UserDetails);
  const { data: singleUser } = useSingleUserQuery(user?.user?.id);
  const [changePassword] = useChangePasswordMutation();
  const [email, setEmail] = useState<string>(singleUser?.data?.email);
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  // Form validation function
  const validateForm = (): boolean => {
    const errors: Errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!oldPassword) {
      errors.oldPassword = "Please enter your old password.";
    }
    if (!newPassword || newPassword.length < 6) {
      errors.newPassword = "New password must be at least 6 characters long.";
    }
    if (oldPassword === newPassword) {
      errors.newPassword =
        "New password must be different from the old password.";
    }
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword =
        "New password and confirm new password do not match.";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const args = {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      const res: any = await changePassword(args);
      if (res?.error) {
        setToastMessage(res?.error?.data?.errorSources[0]?.message);
      }
      console.log(res?.error?.data?.errorSources[0]?.message);

      if (res?.data?.success) {
        setToastMessage("Password update successfully");
        setTimeout(() => {
          navigate("/user-dashboard");
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        }, 2000);
      }
    }
  };
  const handleClosePassword = () => {
    navigate("/user-dashboard");
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };
  const handleCloseToast = () => {
    setToastMessage(null);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Change Password
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Old Password Field */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showOldPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.oldPassword}</p>
            )}
          </div>

          {/* New Password Field */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password Field */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmNewPassword"
            >
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showConfirmNewPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>

          {/* Submit and Close Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleClosePassword()}
              type="button"
              className="text-blue-500"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
