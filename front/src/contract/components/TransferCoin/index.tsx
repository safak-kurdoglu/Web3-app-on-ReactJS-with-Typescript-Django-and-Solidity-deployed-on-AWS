import React from "react";
import useEth from "../../contexts/EthContext1/useEth";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function TransferCoin() {
  const { state } =  useEth();

  const      transfer =
  <>

    <div className="contract-container">
      <ContractBtns  />
    </div>

  </>;


  return (
    <div className="transfer-coin">
      <h2>Send ShilaCoin</h2>
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
          transfer
      }
    </div>
  );
}

export default TransferCoin;
