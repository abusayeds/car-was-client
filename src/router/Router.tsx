import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/homePage/HomePage";
import Login from "../pages/authanticationPages/Login";
import Signup from "../pages/authanticationPages/Signup";
import ReviewPage from "../pages/review/ReviewPage";
import Servise from "../pages/servise/Servise";
import ServiseDetails from "../pages/servise/ServiseDetails";
import Booking from "../pages/booking/Booking";

import Failed from "../pages/Failed";
import ErrorPage from "../pages/ErrorPage";
import AdmiDashboard from "../pages/admin/AdmiDashboard";
import ServiseManagement from "../pages/admin/ServiseManagement";
import UserManagement from "../pages/admin/UserManagement";
import SlotManagement from "../pages/admin/SlotManagement";
import AccountInfo from "../pages/user/AccountInfo";
import UserBooking from "../pages/user/UserBooking";
import About from "../pages/about/About";
import PrivateRouter from "./PrivateRoute";
import ProfileUpdate from "../pages/user/ProfileUpdate";
import UserReview from "../pages/user/UserReview";
import ChangePassword from "../pages/user/ChangePassword";
import UserInfo from "../pages/user/UserInfo";
import ReviewManagement from "../pages/admin/ReviewManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/review",
        element: <ReviewPage></ReviewPage>,
      },
      {
        path: "/servise",
        element: <Servise></Servise>,
      },
      {
        path: "/servise-details",
        element: <ServiseDetails></ServiseDetails>,
      },
      {
        path: "/booking",
        element: (
          //   <PrivateRouter>
          <Booking></Booking>
          //   </PrivateRouter>
        ),
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/admin-dashboard",
        element: <AdmiDashboard></AdmiDashboard>,
        children: [
          {
            path: "",
            element: <ServiseManagement></ServiseManagement>,
          },
          {
            path: "user-management",
            element: <UserManagement></UserManagement>,
          },
          {
            path: "slot-management",
            element: <SlotManagement></SlotManagement>,
          },
          {
            path: "review-management",
            element: <ReviewManagement />,
          },
        ],
      },
      {
        path: "/user-dashboard",
        element: <AccountInfo></AccountInfo>,
        children: [
          {
            path: "",
            element: <UserInfo />,
          },
          {
            path: "profile-update",
            element: <ProfileUpdate />,
          },
          {
            path: "user-review",
            element: <UserReview />,
          },
          {
            path: "change-password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "my-bookings",
        element: (
          <PrivateRouter>
            <UserBooking></UserBooking>
          </PrivateRouter>
        ),
      },

      {
        path: "/failed",
        element: <Failed></Failed>,
      },

      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
    ],
  },
]);

export default router;
