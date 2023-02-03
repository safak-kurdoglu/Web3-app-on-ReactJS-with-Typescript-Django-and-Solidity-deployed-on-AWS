

import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useState } from "react";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [NFTName, setNFTName] = useState("");
  const [image, setImage] = useState<File | any>(undefined);
  const [fileName, setFileName] = useState("");
 
  const handleNFTImage = (e: any) => {
    if (/\.(jpe?g|png|webp)$/i.test(e.target.value)) {
      setImage(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
    else
      alert("Only jpg, jpeg ,png, webp extensions are allowed.")
    return;
  };

  const handleNFTName = (e: any) => {
    if (/^(?!\s*$).+/.test(e.target.value)) {
      setNFTName(e.target.value);
    }
  };

  const send = async () => {
    if (image === "") {      
      alert("Please enter NFT name.");      
      return;    
    }
    if (NFTName === "") {
      alert("Please enter NFT name.");
      return;
    }
    try{
      const returnObj = await contract.methods.mint( ).send({ from: accounts[0]});
      const tokenId = returnObj.events.Transfer.returnValues.tokenId;

      let formData = new FormData();
      const extension = image.name.substr(image.name.lastIndexOf('.'));
      formData.append("image", image, tokenId + extension);
      formData.append("imageName", fileName);

      axios.post("yourhost/save-NFT-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      axios.post("yourhost/register-new-nft",{
        address: accounts[0],
        NFTId: tokenId,
        NFTName: NFTName,
        NFTImage: (tokenId+extension).toString()
      }).then((resp) => {
          alert(resp.data);
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

      <input type="file" id="myFile" name="image" className="mint-NFT-input-file" onChange={handleNFTImage}/>

      <input className="input input-send input-address"
        type="text"
        placeholder="NFT name"
        value={NFTName}
        onChange={handleNFTName}
      /> &nbsp; &nbsp;

      <button onClick={send} className="btn btn-transfer">
        Mint
      </button>
    </div>
  );
}

export default ContractBtns;
