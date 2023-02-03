import React from "react";
import useEth from "../../contexts/EthContext2/useEth";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function ShowNFTs() {
  const { state } =  useEth();

  const      showNFTs =
  <>

    <div className="contract-container">
      <ContractBtns  />
    </div>

  </>;


  return (
    <div className="transfer-coin">
       <h3>Show Your NFTs</h3>
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          showNFTs
      }
    </div>
  );
}

export default ShowNFTs;
