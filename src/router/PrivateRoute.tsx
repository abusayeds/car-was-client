import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateRouter = ({ children }: any) => {
  const {  user } = useAppSelector((state) => state.UserDetails);
//   console.log(token, user);

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRouter;  
    