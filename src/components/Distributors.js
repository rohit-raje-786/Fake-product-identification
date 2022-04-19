import React, { useEffect, useState } from "react";
import "../css/distributors.css";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Distributors({ contract }) {
  const navigate = useNavigate();
  const [distributors, setDistributors] = useState([]);

  const getDistributor = async () => {
    try {
      const di = await contract.getAlldistributors();
      console.log(di);

      setDistributors(di);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDistributor();
  }, []);

  return (
    <div>
      <FontAwesomeIcon
        icon="fa-solid fa-arrow-left"
        className="menu-icon"
        style={{ cursor: "pointer", marginTop: 20 }}
        onClick={() => navigate(-1)}
      />
      <Title title="List Of Available Distributors" />
      <br />
      {distributors && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {distributors.map((d, i) => (
              <tr key={i}>
                <td>{i}</td>
                <td>{d.name}</td>
                <td>{d.add}</td>
                <td>{d.email}</td>
                <td>{d.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Distributors;
