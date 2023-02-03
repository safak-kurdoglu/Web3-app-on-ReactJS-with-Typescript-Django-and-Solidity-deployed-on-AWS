import { useState } from "react";
import { useDispatch } from "react-redux";
import { isNFTWaiting, isNFTFighting, setStrikes, setNFTF, setNFTS, setFirstStriker, setMessage } from "../../../store/reducer";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [tokenId, setTokenId] = useState("");
  const dispatch = useDispatch();

  const handleId = (e: any) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setTokenId(e.target.value);
    }
  };

  const fight = async () => {
    if (tokenId === "") {
      alert("Please enter the NFT Id to send.");
      return;
    }

    try{
      const NFTid = parseInt(tokenId);
      await contract.methods.takeNFT( NFTid ).send({ from: accounts[0], value:100000000000000000});
      axios.post("yourhost/put-NFT-to-fight",{
        NFTId: tokenId,
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(resp.data.status){
          dispatch(setStrikes(resp.data.strikes));
          dispatch(setNFTF(JSON.parse(resp.data.firstNFT)));
          dispatch(setNFTS(JSON.parse(resp.data.secondNFT)));
          dispatch(setFirstStriker(resp.data.firstAttacking));
          dispatch(setMessage(resp.data.message));
          dispatch(isNFTFighting(true));
        }
        else{
          alert(resp.data.message);
          dispatch(isNFTWaiting(true));
        }
        return;
      })
      .catch((error: any) => {
        console.log(error.message + "\nCause = " + error.response.data);
      });
    }
    catch(error: any){
      alert(error.message);
    }
    return;
  };

  return (
    <div className="btns btns-main-NFT">
      
      <input className="input input-send input-address"
        type="text"
        placeholder="TokenId"
        value={tokenId}
        onChange={handleId}
      /> &nbsp; &nbsp;

      <button onClick={fight} className="btn btn-fight">
        Fight Your NFT 
      </button>

    </div>
  );
}

export default ContractBtns;
