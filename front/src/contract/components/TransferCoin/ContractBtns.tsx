
import React, { useState } from "react";
import useEth from "../../contexts/EthContext1/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const handleAmountChange = (e: any) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  const handleAddress = (e: any) => {
    if (/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) {
      setAddress(e.target.value);
    }
  };

  const send = () => {
    if (address === "") {
      alert("Please enter the recipient address.");
      return;
    }
    if (amount === "") {
      alert("Please enter amount to send.");
      return;
    }
    try{
      const transferAmount = parseInt(amount);
      const toAddress = address;
      contract.methods.sendCoin( toAddress, transferAmount ).send({ from: accounts[0]});
    }
    catch(error: any){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns">
      <input  className="input input-send input-amount"
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={handleAmountChange}
      />  <br/>  <br/>  
      
      <input className="input input-send input-address"
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={handleAddress}
      /><br/> <br/> 

      <button onClick={send} className="btn btn-transfer">
        Send ShilaCoin 
      </button>

    </div>
  );
}

export default ContractBtns;
