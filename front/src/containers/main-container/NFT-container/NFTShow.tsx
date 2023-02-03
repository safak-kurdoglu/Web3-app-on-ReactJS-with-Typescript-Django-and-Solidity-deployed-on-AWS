import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import leftIcon from "../../../icons/left.png";
import rightIcon from "../../../icons/right.png";

const NFTShow = () => {
  const NFTs = useSelector((state: any) => state.store).NFTstoShow;
  const [index, setIndex] = useState(0);
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [power, setPower] = useState(0);

  useEffect(() => {
    if(NFTs.length){
      setId(NFTs[index].id);
      setName(NFTs[index].name);
      setImage(NFTs[index].image);
      setPower(NFTs[index].power);
    }
  }, [index, NFTs]);

  const handleLeft = () => {
    if(index > 0){
      setIndex(index-1);
    }
    return;
  };

  const handleRight = () => {
    if(index < NFTs.length-1){
      setIndex(index+1);
    }
    return;
  };

  const closeNFTShow = () => {
    (Array.from(document.getElementsByClassName("show-NFTs") as HTMLCollectionOf<HTMLElement>))[0].style.display = "none";
    return;
  }; 

  return (
    <div className="NFT-show-container "><span className="exit-NFT-show link" onClick={closeNFTShow}>X</span>
      <div className="NFT-show-left">
        <img src={leftIcon} alt="Logo"  className="NFT-show-left-icon" onClick={handleLeft}/>   
      </div>
      <div className="ui card NFT-show-NFT">
        <div className="NFT-show-image-cont">
          <img src={"yourhost/"+image} alt="NFT-image"  className="NFT-show-image"/>
        </div>   
        <div className="content">
          <div>ID: <span className="NFT-show-id">{id}</span> </div>
          <div>Name: <span className="NFT-show-id">{name}</span> </div>
          <div>Power: <span className="NFT-show-id">{power}</span> </div>
        </div>
      </div>
      <div className="NFT-show-right">
        <img src={rightIcon} alt="Logo"  className=" NFT-show-left-icon" onClick={handleRight}/> 
      </div>
    </div>
  );
}

export default NFTShow;