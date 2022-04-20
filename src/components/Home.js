import React from "react";
import "../css/home.css";
import Title from "./Title";

const Home = ({ contract }) => {
  return (
    <div className="container">
      <h1
        style={{
          textAlign: "center",
          position: "relative",
          top: 30,
          color: "#551a8a",
        }}
      >
        Welcome To Blockchain Based Asset Tracker
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
      </div>
    </div>
  );
};

export default Home;
