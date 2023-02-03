import useEth from "../../../contract/contexts/EthContext1/useEth";
import axios from "axios";

const ReqShilaCoin = () => {
  const { state: { accounts } } = useEth();
  
  const req = async () => {
    axios.post("yourhost/request-shila-coin",{
      address: accounts[0].toLowerCase()
    })
    .then((resp) => {
      alert(resp.data);
      axios.post("yourhost/get-shila-point",{
        address: accounts[0].toLowerCase()
      })
      .then((resp) => {
        (Array.from(document.getElementsByClassName("point") as HTMLCollectionOf<HTMLElement>))[0].innerHTML = resp.data.amount;
      });
    })
    .catch((error: any) => {
      console.log(error.message + "\nCause = " + error.response.data);
    });
    return;
  };

  return (
    <button  onClick={req} className="btn btn-request">
      Request ShilaCoin 
    </button>
  )
};
  
export default ReqShilaCoin;
  