import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/");
    }
  }, [user]);

  return user ? children : null;
}

export default ProtectedRoute;