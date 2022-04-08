import React, { useState } from "react";

import "./Distributor.css";

const DistributorForm = (props) => {
  const contract = props.contract;
  const [state, setState] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const handler = (e) => {
    e.preventDefault();
    const val = e.target.value;
    setState({ ...state, [e.target.name]: val });
    console.log(e.target.value);
  };

  const Submit = async (e) => {
    e.preventDefault();
    try {
      let createDistributor = await contract.insertDistributor(
        state.name,
        state.address,
        state.email,
        state.phone
      );
      await createDistributor.wait();
      console.log(createDistributor.hash);
    } catch (e) {
      console.log(e);
    }
  };

  const GetDistributors = async (e) => {
    e.preventDefault();
    try {
      let getDistributors = await contract.getAlldistributors();
      getDistributors.forEach((d, i) => {
        console.log(i + "->");
        console.log(d.name);
        console.log(d.email);
        console.log(d.add);
        console.log(d.phone);
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div>
        <form>
          <label>Name</label>
          <input
            type="text"
            id="fname"
            name="name"
            placeholder="Your name.."
            onChange={handler}
          />

          <label>Address</label>
          <input
            type="text"
            id="lname"
            name="address"
            placeholder="Your add.."
            onChange={handler}
          />

          <label>Email</label>
          <input
            type="text"
            id="lname"
            name="email"
            placeholder="Your email.."
            onChange={handler}
          />

          <label>Phone</label>
          <input
            type="text"
            id="lname"
            name="phone"
            placeholder="Your Phone.."
            onChange={handler}
          />
          <button className="submit" onClick={Submit}>
            Create Distributor
          </button>
          <button className="submit" onClick={GetDistributors}>
            Get Distributors
          </button>
        </form>
      </div>
    </>
  );
};

export default DistributorForm;
