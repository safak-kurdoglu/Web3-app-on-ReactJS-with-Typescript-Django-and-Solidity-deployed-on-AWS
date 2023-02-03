
import { useState } from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNFTsOnSale } from "../../../store/reducer";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  
  const fetchNFTs =  () => {
    axios.get("yourhost/get-NFTs-on-sale")
    .then((resp) => {
      const NFTsOnSaleModel = resp.data;
      let NFTsOnSale: {id: number, name: string, image: string, power: number}[] = [];
      NFTsOnSaleModel.forEach((NFTOnSaleModel) => {
      const NFTOnSale: {id: number, name: string, image: string, power: number} = {id: NFTOnSaleModel.pk, name: NFTOnSaleModel.fields.name, image: NFTOnSaleModel.fields.image, power: NFTOnSaleModel.fields.power}
      NFTsOnSale.push(NFTOnSale);
    });
      dispatch(setNFTsOnSale(NFTsOnSale));
    })
    .catch((error: any) => {
      console.log(error.message + "\nCause = " + error.response.data);
    });
  };

  const handleId = (e: any) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setTokenId(e.target.value);
    }
  };

  const handlePrice = (e: any) => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setPrice(e.target.value);
    }
  };

  const sell = async (e: any) => {
    if (tokenId === "") {
      alert("Please enter the NFT Id to sell.");
      return;
    }
    if (price === "") {
      alert("Please enter the NFT the price to sell.");
      return;
    }
    try{
      const NFTid = parseInt(tokenId);
      const NFTPrice = parseInt(price);
      await contract.methods.startSale( NFTid, NFTPrice ).send({ from: accounts[0]});
      axios.post("yourhost/put-NFT-to-sale",{
        NFTId: tokenId,
        price: NFTPrice
      })
      .then((resp) => {
        alert(resp.data);
        fetchNFTs(); 
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

      <input className="input input-send input-address"
        type="text"
        placeholder="price"
        value={price}
        onChange={handlePrice}
      /> &nbsp; &nbsp;

      <button onClick={sell} className="btn btn-sell">
        Sell NFT
      </button>

    </div>
  );
}

export default ContractBtns;
