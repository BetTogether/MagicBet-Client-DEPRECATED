import React, { useState, useEffect } from "react";
import { ethers, Contract } from "ethers";
import Navbar from "./components/Navbar";
import { DAI_ABI } from "./abi/daiABI";

const connectWallet = () => (window as any).ethereum.enable();

function App() {
  const [activeAddress, setActiveAddress] = useState("");
  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const DAI_ADDRESS = "0x2448eE2641d78CC42D7AD76498917359D961A783";

  useEffect(() => {
    (async () => {
      try {
        (window as any).ethereum.enable();
        const provider = new ethers.providers.Web3Provider(
          (window as any).web3.currentProvider
        );
        const wallet = provider.getSigner();
        const activeAddress = await wallet.getAddress();
        setActiveAddress(activeAddress);

        const ethBalance = await wallet.getBalance();
        const ethBalanceFormatted = +parseFloat(
          ethers.utils.formatEther(ethBalance)
        ).toFixed(2);
        setEthBalance(ethBalanceFormatted);

        const contract = new Contract(DAI_ADDRESS, DAI_ABI, provider);
        const daiBalance = await contract.balanceOf(activeAddress);
        const daiBalanceFormatted = +parseFloat(daiBalance);
        setDaiBalance(daiBalanceFormatted);
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  return (
    <>
      <Navbar
        activeAddress={activeAddress}
        connectWallet={connectWallet}
        ethBalance={ethBalance}
        daiBalance={daiBalance}
      />
    </>
  );
}

export default App;
