
import { useEffect }  from "react";
import useEth from "../../contexts/EthContext2/useEth";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setNFTsToShow } from "../../../store/reducer";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNFTs = () => {
      (Array.from(document.getElementsByClassName("show-NFTs") as HTMLCollectionOf<HTMLElement>))[0].style.display = "none";
      dispatch(setNFTsToShow([]));
    };

    fetchNFTs();
  }, [accounts]); 

  const show = async () => {
    const NFTIds = await contract.methods.showNFTs().call({ from: accounts[0] });
    axios.post("yourhost/show-NFTs",{
      Ids: NFTIds
    })
    .then((resp) => {
      if(resp.data.length){
        const NFTsModel = resp.data;
        let NFTs: {id: number, name: string, image: string, power: number}[] = [];
        NFTsModel.forEach((NFTModel) => {
          const NFT: {id: number, name: string, image: string, power: number} = {id: NFTModel.pk, name: NFTModel.fields.name, image: NFTModel.fields.image, power: NFTModel.fields.power}
          NFTs.push(NFT);
        });
        dispatch(setNFTsToShow(NFTs));
        (Array.from(document.getElementsByClassName("show-NFTs") as HTMLCollectionOf<HTMLElement>))[0].style.display = "block";     
      }
      else
        alert("You don't have NFT.");
    })
    .catch((error: any) => {
      console.log(error.message + "\nCause = " + error.response.data);
    });

    return;
  };

  return (
    <div className="btns btns-main-NFT">
      <button onClick={show} className="btn btn-show">
        Show
      </button>
    </div>
  );
}

export default ContractBtns;
