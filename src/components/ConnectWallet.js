import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AssetTracker from "../utils/AssetTracker.json";

import VendorForm from "./VendorForm";
import { useParams } from "react-router-dom";
import DistributorForm from "./DistributorForm";

const CONTRACT_ADDRESS = "0x911C945ca54Ba4d708735a107E57810254E6E838";

const ConnectWallet = () => {
  //console.log("abi", AssetTracker.abi);
  let { id } = useParams();
  const [currentAccount, setCurrentAccount] = useState("");
  const [wallet, setWallet] = useState("Connect to Wallet");
  const [contract, setContract] = useState(null);
  const [isopen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

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

      setupEventListener();
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
      setupEventListener();
    } catch (error) {
      console.log(error);
    }
  };

  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          AssetTracker.abi,
          signer
        );

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on(
          "AssetCreate",
          (from, id, manufacturer, customer) => {
            console.log(from, id.toNumber());
            setMessage(`QrCode`);
            setIsOpen(true);
          }
        );

        console.log("Setup event listener!");
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return (
    <>
      <div className="App">
        <div className="container">
          <div className="header-container">
            <button
              onClick={connectWallet}
              className="cta-button connect-wallet-button"
            >
              {wallet}
            </button>
            {id == 1 && (
              <VendorForm contract={contract} account={currentAccount} />
            )}
            {id == 2 && (
              <DistributorForm contract={contract} account={currentAccount} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConnectWallet;
