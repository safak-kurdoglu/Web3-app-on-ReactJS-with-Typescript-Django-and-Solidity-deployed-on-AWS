import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStrikes, setNFTF, setNFTS, setFirstStriker, setMessage, isNFTFighting } from "../../store/reducer";
import useEth from "../../contract/contexts/EthContext2/useEth";
import TakeNFTtoFight from "../../contract/components/TakeNFTtoFight";
import FightingNFT from "./Fight-container/FightingNFT"
import axios from "axios";

const FightNFT = () => {
  const { state: { accounts } } = useEth();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [image, SetImage] = useState("");
  const [power, setPower] = useState(0);
  let isWaiting = useSelector((state: any) => state.store).isNFTWaiting
 
  useEffect(() => {
    const fetchWaitingNFT = async () => {
      axios.post("yourhost/get-waiting-NFT",{
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        if(resp.data.status){
          (Array.from(document.getElementsByClassName("NFT-fight-waiting-NFT") as HTMLCollectionOf<HTMLElement>))[0].style.display = "flex";
          const NFTWaitingOpponent: any = JSON.parse(resp.data.NFT)[0]
          setId(NFTWaitingOpponent.fields.id);
          setName(NFTWaitingOpponent.fields.name);
          SetImage(NFTWaitingOpponent.fields.image);
          setPower(NFTWaitingOpponent.fields.power);
        }
        //if there is no waiting NFT, then there can be waiting datas for the finished fight.
        else{
          axios.post("yourhost/get-finished-fight-data",{
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
          })
          .catch((error: any) => {
            console.log(error.message + "\nCause = " + error.response.data);
          });
        }
      })
      .catch((error: any) => {
        console.log(error.message + "\nCause = " + error.response.data);
      });
    }

    const fetchWaitingRewards = async () => {
      axios.post("yourhost/get-waiting-rewards",{
        owner: accounts[0].toLowerCase()
      })
      .then((resp) => {
        (Array.from(document.getElementsByClassName("waiting-rewards") as HTMLCollectionOf<HTMLElement>))[0].innerHTML = resp.data;
      })
      .catch((error: any) => {
        console.log(error.message + "\nCause = " + error.response.data);
      });
    }

    if(accounts){
      fetchWaitingNFT();
      fetchWaitingRewards();
    }
  }, [accounts, isWaiting]);

  let resp = (useSelector((state: any) => state.store).isNFTFighting) ? <FightingNFT/> : 
    <div className="NFT-fight">
      <div className="fight-container-left fight-container-buttons">
        <TakeNFTtoFight/><br/>
        <p className="waiting-rewards"></p>
      </div>
      <div className="fight-container-right">
        <div className="NFT-fight-waiting-NFT ui card" style={{display: "none" }}>
          <p>Your NFT is waiting opponent!</p> 
          <div className="NFT-fight-image-cont">
            <img src={"yourhost/"+image} alt="NFT-image"  className="NFT-fight-image"/>
          </div>
          <div className="content">
            <div>ID: <span className="NFT-show-id">{id}</span> </div>
            <div>Name: <span className="NFT-show-id">{name}</span> </div>
            <div>Power: <span className="NFT-show-id">{power}</span> </div>
          </div>
        </div>
      </div>
    </div>

  return  ( 
    resp
  );
};

export default FightNFT;
