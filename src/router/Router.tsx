import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/homePage/HomePage";
import Login from "../pages/authanticationPages/Login";
import Signup from "../pages/authanticationPages/Signup";
import ReviewPage from "../pages/review/ReviewPage";
import Servise from "../pages/servise/Servise";
import ServiseDetails from "../pages/servise/ServiseDetails";
import Booking from "../pages/booking/Booking";
import Success from "../pages/Success";
import ErrorPage from "../pages/ErrorPage";
import AdmiDashboard from "../pages/admin/AdmiDashboard";
import ServiseManagement from "../pages/admin/ServiseManagement";
import UserManagement from "../pages/admin/UserManagement";
import SlotManagement from "../pages/admin/SlotManagement";
import AccountInfo from "../pages/user/AccountInfo";
import UserBooking from "../pages/user/UserBooking";

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
        element: <Booking></Booking>,
      },
      {
        path: "/admin-dashboard",
        element: <AdmiDashboard></AdmiDashboard>,
        children : [
            {
                path : '',
                element : <ServiseManagement></ServiseManagement>
            },
            {
                path : 'user-management',
                element : <UserManagement></UserManagement>
            },
            {
                path : 'slot-management',
                element : <SlotManagement></SlotManagement>
            }
        ]
        
      },
      {
        path : 'userinfo',
        element : <AccountInfo></AccountInfo>
      },
      {
        path : 'my-bookings',
        element : <UserBooking></UserBooking>
      },
      {
        path: "/success",
        element: <Success></Success>,
      },
      {
        path : '*',
        element : <ErrorPage></ErrorPage>
      },
    ],
  },
 
]);

export default router;
