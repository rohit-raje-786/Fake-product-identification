import "./App.css";

import React, { useEffect, useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
// import VendorForm from "./components/VendorForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/connectwallet/:id" element={<ConnectWallet />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
