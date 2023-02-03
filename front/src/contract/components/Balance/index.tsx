import React from "react";
import useEth from "../../contexts/EthContext1/useEth";
import ContractBtns from "./ContractBtns";
import NoticeNoArtifact from "../NoticeNoArtifact";
import NoticeWrongNetwork from "../NoticeWrongNetwork";

function Donate() {
  const { state } =  useEth();


  const      donate =
  <>

    <div className="contract-container">
      <ContractBtns  />
    </div>

  </>;


  return (
    
    <div className="donate">
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            donate
      }
    </div>
  );
}

export default Donate;
