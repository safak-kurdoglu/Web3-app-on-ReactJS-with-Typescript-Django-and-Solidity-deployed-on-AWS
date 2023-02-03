
import { useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [id, setId] = useState("");
  const [address, setAddress] = useState("");

  const handleIdChange = (e: any) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setId(e.target.value);
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
    if (id === "") {
      alert("Please enter the NFT Id to send.");
      return;
    }
    try{
      const transferId = parseInt(id);
      const toAddress = address;
      contract.methods.transfer( toAddress, transferId ).send({ from: accounts[0]});
    }
    catch(error: any){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns btns-main-NFT">
      <input  className="input input-send input-id"
        type="text"
        placeholder="NFT ID"
        value={id}
        onChange={handleIdChange}
      />  &nbsp; &nbsp;
      
      <input className="input input-send input-address"
        type="text"
        placeholder="Recipient Address"
        value={address}
        onChange={handleAddress}
      /> &nbsp; &nbsp;

      <button onClick={send} className="btn btn-transfer">
        Send NFT
      </button>

    </div>
  );
}

export default ContractBtns;
