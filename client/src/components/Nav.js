import React from "react";
import { useNavigate } from "react-router-dom";
import { NovuProvider, PopoverNotificationCenter, NotificationBell } from "@novu/notification-center";

const Nav = () => {
  const navigate = useNavigate();

  const onNotificationClick = (notification) => {
    navigate(notification.cta.data.url);
  };

  const handleLogOut = () => {
    localStorage.removeItem("_username");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div>
        <img
          src="https://images.pexels.com/photos/1111371/pexels-photo-1111371.jpeg"
          alt="Jeet Desai"
          className="logo"
        />
      </div>
      <div className="notification__container">
        <div>
          <NovuProvider subscriberId="63fa0240bdd3d94974a05059" applicationIdentifier="jBncmj-F0kdo">
            <PopoverNotificationCenter
              onNotificationClick={onNotificationClick}
              colorScheme="light"
              showUserPreferences={false}
            >
              {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
            </PopoverNotificationCenter>
          </NovuProvider>
        </div>
        <button className="logOutBtn" onClick={handleLogOut}>
          LOG OUT
        </button>
      </div>
    </nav>
  );
};
export default Nav;
