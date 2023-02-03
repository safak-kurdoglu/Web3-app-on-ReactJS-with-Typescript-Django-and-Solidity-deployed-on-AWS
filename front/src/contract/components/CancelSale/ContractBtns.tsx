import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNFTsOnSale } from "../../../store/reducer";

function ContractBtns({ tokenId }) {
  const { state: { contract, accounts } } = useEth();

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

  const cancelSale = async e => {
    try{
      await contract.methods.cancelSale( tokenId ).send({ from: accounts[0]});
      axios.post("yourhost/del-NFT-from-sale",{
        NFTId: tokenId
      })
      .then(() => {
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
    <div className="btns btn-buy-NFT">
      <button onClick={cancelSale} className="btn btn-transfer">
        Cancel Sale
      </button>
    </div>
  );
}

export default ContractBtns;
