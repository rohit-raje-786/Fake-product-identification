import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/sidebar.css";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const MenuItem = ({ iconName, title, isActive, url }) => {
  let menuClass = "menu-item";
  if (isActive) {
    menuClass += " active-menu";
  }
  return (
    <div className={menuClass}>
      <NavLink className="menu-link" to={url}>
        <FontAwesomeIcon
          icon={iconName}
          className="menu-icon"
          style={{ color: "#fff" }}
        />

        <h1 className="menu-title" style={{ color: "#fff" }}>
          {title}
        </h1>
      </NavLink>
    </div>
  );
};

const SideBar = ({ contract, account }) => {
  const navigate = useNavigate();
  console.log(account);
  return (
    <div className="dashboard-container">
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-left"
        className="menu-icon"
        style={{ cursor: "pointer", marginTop: 20 }}
        onClick={() => navigate(-1)}
      />
      <Title title="Vendors Dashboard" />

      <div id="sidebar-container">
        <div id="menu-item-container">
          <MenuItem
            iconName={"fa-solid fa-truck"}
            title="Track Products."
            url="/vendor/products"
          />
          <MenuItem
            iconName={"fa-solid fa-shirt"}
            title="Add Product."
            url="/vendor/addproduct"
          />
          <MenuItem
            iconName={"fa-solid fa-user"}
            title="Distributors."
            url="/vendor/available-distributors"
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
