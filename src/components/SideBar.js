import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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

  const [show, setShow] = useState(false);
  console.log(account);
  console.log(account, process.env.REACT_APP_WALLET_ADD);

  const checkAccount = () => {
    setShow(account === process.env.REACT_APP_WALLET_ADD);
  };

  useEffect(() => {
    checkAccount();
  }, []);

  return (
    <>
      {show ? (
        <div className="dashboard-container">
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-left"
            className="menu-icon"
            style={{ cursor: "pointer", marginTop: 20 }}
            onClick={() => navigate(-1)}
          />
          <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
            Wallet Address:{account}
          </h4>
          <br />
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
      ) : (
        <div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <h2>OOPs 🙊 your company is not registerd</h2>
            <p>Please do register your company to avail our services</p>
            <br />
            <a href="/google.com">Proceed to the Home Page</a>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
