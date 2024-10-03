import React, { useEffect } from "react";
import "./DashboardLayout.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import ChatMenu from "../../components/ChatMenu/ChatMenu";

const DashboardLayout = () => {
  const { userId, isLoaded } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  if (!isLoaded) return "Loading...";

  return (
    <div className="dashboardLayout">
      <div className="dashboardMenu">
        <ChatMenu />
      </div>
      <div className="dashboardContent">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
