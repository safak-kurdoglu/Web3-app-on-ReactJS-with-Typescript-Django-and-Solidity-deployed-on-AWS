import useEth from "../../contexts/EthContext1/useEth";
import { useEffect } from "react";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();

  useEffect(() => {
    const getBalance = async () => {
      try{
        const balance = await contract.methods.getBalance().call({ from: accounts[0] });
        (Array.from(document.getElementsByClassName("balance") as HTMLCollectionOf<HTMLElement>))[0].innerHTML = balance;
      }catch(error: any){
        console.log(error.message);
      }
    }
    getBalance();
  }, [accounts]);
  return    <></>;
}

export default ContractBtns;