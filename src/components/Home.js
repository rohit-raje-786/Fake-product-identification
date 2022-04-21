import React from "react";
import "../css/home.css";
import Title from "./Title";
import { NavLink } from "react-router-dom";

const Home = ({ account }) => {
  return (
    <div className="container">
      {/* { <h4 style={{ color: "#000", position: "fixed", right: 8, top: 2 }}>
        Wallet Address:{account}
      </h4>
      <br />
      <h1
        style={{
          textAlign: "center",
          position: "relative",
          top: 30,
          color: "#551a8a",
        }}
      >
        Welcome To Blockchain Based Fake Product Detection 🕵️‍♀️
      </h1>

      <div className="bg">
        <section className="panel">
          <h2 style={{ color: "#fff" }}>Enroll as Vendor</h2>
          <br />
          <div className="card__text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              tenetur vel accusamus. Cumque, iste asperiores. Perferendis odio
              magnam nisi, eos provident nobis maxime nostrum nam, ipsum
              blanditiis quasi saepe aliquid!
            </p>
          </div>

          <a href="/vendor" className="button">
            Enroll
          </a>
        </section>
        <section className="panel">
          <h2 style={{ color: "#fff" }}>Enroll as Distributor</h2>
          <br />
          <div className="card__text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              tenetur vel accusamus. Cumque, iste asperiores. Perferendis odio
              magnam nisi, eos provident nobis maxime nostrum nam, ipsum
              blanditiis quasi saepe aliquid!
            </p>
          </div>

          <a href="/distributorform" className="button">
            Enroll
          </a>
        </section>
        <section className="panel">
          <h2 style={{ color: "#fff" }}>Authenticate Product</h2>
          <br />
          <div className="card__text">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
              tenetur vel accusamus. Cumque, iste asperiores. Perferendis odio
              magnam nisi, eos provident nobis maxime nostrum nam, ipsum
              blanditiis quasi saepe aliquid!
            </p>
          </div>

          <a href="/authenticate" className="button">
            Authenticate
          </a>
        </section>
      </div>} */}

      <div id="login-type-container">
        <div id="login-type">
          <h1 id="greetings">Welcome to Asset Tracker!</h1>
          <h1 id="subtitle-txt">
            A Blockchain Based Fake Product Detection 🕵️‍♀️
          </h1>
          <div id="options-container">
            <NavLink to="/vendor" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/manufacturer.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">Manufacturer Login</h1>
              </div>
            </NavLink>
            <NavLink to="/distributorform" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/distributor.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">Distributor Login</h1>
              </div>
            </NavLink>
            <NavLink to="/authenticate" className="select-link">
              <div className="options">
                <img
                  src="/assets/images/qr-code-scan.png"
                  alt="manufacturer"
                  className="options-image"
                />
                <h1 className="options-image-caption">Authenticate Product</h1>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
