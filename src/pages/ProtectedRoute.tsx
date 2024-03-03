import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

type prop = {
  children: ReactNode;
};
const ProtectedRoute = ({ children }: prop) => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) return navigate("/");
  }, [isAuth, navigate]);

  return isAuth ? <>{children}</> : null;
};

export default ProtectedRoute;
