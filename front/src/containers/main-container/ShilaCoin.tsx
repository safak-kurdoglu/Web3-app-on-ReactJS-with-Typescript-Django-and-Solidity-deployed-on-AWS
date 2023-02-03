import { useEffect } from "react";
import useEth from "../../contract/contexts/EthContext1/useEth";
import axios from "axios";
import ContractBalance from "../../contract/components/Balance";
import ContractTransfer from "../../contract/components/TransferCoin";
import ReqShilaCoin from "./coin-container/ReqShilaCoin";

const ShilaCoin = () => {
  const { state: { accounts } } = useEth();

  useEffect( () => {
    if(accounts !== null){
      axios.post("yourhost/get-shila-point",{
        address: accounts[0].toLowerCase()
      })
      .then((resp) => {
        (Array.from(document.getElementsByClassName("point") as HTMLCollectionOf<HTMLElement>))[0].innerHTML = resp.data.amount;
      })
      .catch((error: any) => {
        console.log(error.message + "\nCause = " + error.response.data);
    });
    }
  }, [accounts]);

  return  (
    <div className="shila-coin-menu">
      <h2>Shila Coin</h2>
      <p>You have <strong className="balance">loading...</strong> Shila Coin</p>
      <p>You have <strong className="point">loading...</strong> Shila Point &nbsp;&nbsp;<ReqShilaCoin/></p>
     
      <ContractBalance/> 
      <ContractTransfer/> 
    </div>
  )
};

export default ShilaCoin;
