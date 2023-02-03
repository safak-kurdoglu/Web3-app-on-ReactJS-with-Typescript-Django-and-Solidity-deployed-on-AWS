
const HeaderMain = () => {

  const handleCoin = () => {
    (Array.from(document.getElementsByClassName("main-coin") as HTMLCollectionOf<HTMLElement>))[0].style.display = "block";
    (Array.from(document.getElementsByClassName("main-NFT") as HTMLCollectionOf<HTMLElement>))[0].style.display = "none";
  };

  const handleNFT = () => {
    (Array.from(document.getElementsByClassName("main-coin") as HTMLCollectionOf<HTMLElement>))[0].style.display = "none";
    (Array.from(document.getElementsByClassName("main-NFT") as HTMLCollectionOf<HTMLElement>))[0].style.display = "block";
  };


  return (
    <div className="menu">
      <div className="header-main">
      <button onClick={handleCoin} className="btn btn-main btn-coin">
        SHILA COIN 
      </button>
      <button onClick={handleNFT} className="btn btn-main btn-NFT">
        NFT
      </button>
      </div>
    </div>
  );
};

export default HeaderMain;
