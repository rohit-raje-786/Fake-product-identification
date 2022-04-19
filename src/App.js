import "./App.css";

import React, { useEffect, useState } from "react";

import VendorForm from "./components/VendorForm";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";
import AssetTracker from "./utils/AssetTracker.json";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Products from "./components/TrackProducts";
import Distributors from "./components/Distributors";

import SideBar from "./components/SideBar";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADD;

library.add(fas);

const App = () => {
  const customStyle = {
    content: {
      top: "40%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "250px",
      borderRadius: "20px",
    },
  };

  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [contract, setContract] = useState(null);
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      if (account != process.env.REACT_APP_WALLET_ADD) {
        setModalIsOpen(true);
        return;
      }

      console.log("Found an authorized account:", account);
      setWallet("Connected");

      setCurrentAccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      console.log("contract", contract);
      setContract(contract);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      if (accounts[0] != process.env.REACT_APP_WALLET_ADD) {
        setModalIsOpen(true);
        return;
      }
      setWallet("Connected");

      setCurrentAccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      setContract(contract);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <>
      {contract ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home contract={contract} />}></Route>
            <Route path="/vendor" element={<SideBar />}></Route>
            <Route
              path="/distributorform"
              element={<DistributorForm contract={contract} />}
            ></Route>
            <Route
              path="/vendor/products"
              element={<Products contract={contract} />}
            ></Route>
            <Route
              path="/vendor/addproduct"
              element={<VendorForm contract={contract} />}
            />
            <Route
              path="/vendor/available-distributors"
              element={<Distributors contract={contract} />}
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            ariaHideApp={false}
            style={customStyle}
          >
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <h2>OOPs 🙊 your company is not registerd</h2>
              <p>Please do register your company to avail our services</p>
              <br />
              <a href="/google.com">Proceed to the Home Page</a>
            </div>

            <span
              onClick={closeModal}
              style={{
                position: "absolute",
                top: 3,
                right: 20,
                fontSize: 28,
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </span>
          </Modal>
          <div>
            <div>
              <div className="connectWalletContainer">
                {wallet == "Please Connect Your Wallet to Proceed" && (
                  <button onClick={connectWallet} className="connectWalletBtn">
                    <img
                      src={
                        "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                      }
                      className="img"
                    />{" "}
                    {wallet}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
