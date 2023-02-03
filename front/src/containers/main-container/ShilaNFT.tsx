import ContractTransfer from "../../contract/components/TransferNFT";
import ContractShow from "../../contract/components/ShowNFTs";
import ContractSendRewards from "../../contract/components/SendRewards";
import ContractMint from "../../contract/components/Mint";
import NFTShow from "./NFT-container/NFTShow";

const ShilaNFT = () => {

  return  (
    <div className="shila-NFT">
      <ContractSendRewards/>
      <div className="shila-NFT-menu">
        <h2>Shila NFT</h2>
        <ContractShow/><br/><br/>
        <ContractMint/><br/><br/>
        <ContractTransfer/><br/><br/>
      </div>
      <div className="show-NFTs">
        <NFTShow/>
      </div>
    </div>
  )
};

export default ShilaNFT;
