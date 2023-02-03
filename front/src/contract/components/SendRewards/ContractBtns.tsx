
import {useEffect, useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchNFTs = async () => {
      const isOwner = await contract.methods.isOwner().call({ from: accounts[0] });
      setIsOwner(isOwner)
    }

    if(accounts && contract)
      fetchNFTs();
  }, [accounts, contract]);

  const send = () => {
    try{
      axios.get("yourhost/get-waiting-rewards-to-send")
      .then((resp) => {
        if(resp.data.status){
          const ids = resp.data.NFTsWaitingToSend;
          const winner = resp.data.winner;
          const len = ids.length;
          for(let i=0; i<len; i+=2){
            contract.methods.sendNFTsToWinner( ids[i], ids[i+1], winner ).send({ from: accounts[0] });
          }
          alert(resp.data.left + " people left.");
        }
        else{
          alert(resp.data.message);
        }
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

  const RewardButton = isOwner ? <button onClick={send} className="btn btn-send-NFT-rewards"> Send Rewards</button> : <></>
  return (
    <div className="btns send-NFT-rewards">
      {RewardButton}
     </div>
  );
}

export default ContractBtns;
