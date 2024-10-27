import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRouter = ({ children }: any) => {
  const { user } = useAppSelector((state) => state.UserDetails);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default PrivateRouter;
