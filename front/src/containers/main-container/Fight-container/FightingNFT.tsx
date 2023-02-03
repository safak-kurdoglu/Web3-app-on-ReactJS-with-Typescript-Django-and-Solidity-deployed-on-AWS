import { useEffect } from "react";
import { useSelector } from "react-redux";
import { isNFTFighting } from "../../../store/reducer";
import { useDispatch } from "react-redux";
import useEth from "../../../contract/contexts/EthContext2/useEth";
import attackRIcon from "../../../icons/attackR.png";
import attackLIcon from "../../../icons/attackL.png";
import axios from "axios";

const FightingNFT = () => {
  const dispatch = useDispatch();
  const { state: { accounts } } = useEth();
  let strikes = useSelector((state: any) => state.store).strikes
  let firstNFT = useSelector((state: any) => state.store).NFTF
  let secondNFT = useSelector((state: any) => state.store).NFTS
  let firstStriker = useSelector((state: any) => state.store).firstStriker
  let message = useSelector((state: any) => state.store).message

  useEffect(() => {
    if(firstStriker != -1){
      const hpR = (Array.from(document.getElementsByClassName('hp-line-right') as HTMLCollectionOf<HTMLElement>))[0];
      const hpL = (Array.from(document.getElementsByClassName('hp-line-left') as HTMLCollectionOf<HTMLElement>))[0];
      const attackL = (Array.from(document.getElementsByClassName('attack-icon-cont-left') as HTMLCollectionOf<HTMLElement>))[0];
      const attackR = (Array.from(document.getElementsByClassName('attack-icon-cont-right') as HTMLCollectionOf<HTMLElement>))[0];
      const damageL = (Array.from(document.getElementsByClassName('damage-left') as HTMLCollectionOf<HTMLElement>))[0];
      const damageR = (Array.from(document.getElementsByClassName('damage-right') as HTMLCollectionOf<HTMLElement>))[0];
      let hpF = 270;
      let hpS = 270;
      let realHpF = 1000;
      let realHpS = 1000;
      let i = 0;
      let striker = firstStriker;
      const strikeLen = strikes.length;

      const attack = () => {
        //if there no more strike left
        if(i==strikeLen){
          clearInterval(attackInterval);
          alert(message)
          dispatch(isNFTFighting(false));
          //get new waiting rewards.
          axios.post("yourhost/get-waiting-rewards",{
            owner: accounts[0].toLowerCase()
          })
          .then((resp) => {
            (Array.from(document.getElementsByClassName("waiting-rewards") as HTMLCollectionOf<HTMLElement>))[0].innerHTML = resp.data;
          })
          .catch((error: any) => {
            console.log(error.message + "\nCause = " + error.response.data);
          });
        }
        else{
          const strike = strikes[i]*(27/100);
          //if left NFT strikes
          if(striker == 0){
            hpS -= strike;
            realHpS -= strikes[i];
            if(hpS < 0){
              hpS=0;
              realHpS=0;
            } 
            const poseXF = 300;
            let poseX = poseXF;
            let Rdeg = 0;
            //left strike move
            const leftAttack = () => {
              poseX++;
              Rdeg-=1.5;
              attackL.style.left = poseX+"px";
              attackL.style.transform = "rotate("+Rdeg+"deg)";
              //if strike is reached the aim.
              if(poseX == 550){
                clearInterval(leftAttackInterval);
                hpR.style.width = hpS+"px";
                attackL.style.display = "none"
                damageR.innerHTML = strikes[i].toString();
                damageR.style.opacity = "1";
                let top = 50;
                let left = -30;
                let j = 1;
                //Damage inflicted to right.
                const damageRight = () => {
                  if(j>80)
                    top += Math.log(j)*8 / j;
                  else if(j>60)
                    top -= Math.log(j) / j;
                  else
                    top -=  Math.log(j)*5 / j;
                
                  left += Math.log(j)*j / (500)

                  damageR.style.top = top+"px";
                  damageR.style.left = left+"px";
                  damageR.style.opacity = ((100-j)/100).toString();
                  j+=1;
                  if(j==100)
                    clearInterval(damageRightInterval);
                }
                (Array.from(document.getElementsByClassName('hp-remaining-right') as HTMLCollectionOf<HTMLElement>))[0].innerHTML = realHpS.toString();
                const damageRightInterval = setInterval(damageRight, 10);
                i++;
              }
            }
            const leftAttackInterval = setInterval(leftAttack, 4);
            attackL.style.display = "block"
            attackL.style.left = poseXF+"px"
          }
          else{
            hpF -= strike;
            realHpF-= strikes[i];
            if(hpF < 0){
              hpF=0;
              realHpF=0;
            }
            const poseXF = -50;
            let poseX = poseXF;
            let Rdeg = 0;
            const attackRight = () => {
              poseX--;
              Rdeg-=1.5;
              attackR.style.left = poseX+"px";
              attackR.style.transform = "rotate("+Rdeg+"deg)";
              if(poseX == -300){
                clearInterval(attackRightInterval);
                hpL.style.width = hpF+"px";
                attackR.style.display = "none"
                damageL.innerHTML = strikes[i].toString();
                damageL.style.opacity = "1";
                let top = 50;
                let left = 280;
                let j = 1;
                const damageLeft = () => {
                  if(j>80)
                    top += Math.log(j)*8 / j;
                  else if(j>60)
                    top -= Math.log(j) / j;
                  else
                    top -=  Math.log(j)*5 / j;
      
                  left -= Math.log(j)*j / (500)

                  damageL.style.top = top+"px";
                  damageL.style.left = left+"px";
                  damageL.style.opacity = ((100-j)/100).toString();
                  j+=1;
                  if(j==100)
                    clearInterval(damageLeftInterval);
                }
                (Array.from(document.getElementsByClassName('hp-remaining-left') as HTMLCollectionOf<HTMLElement>))[0].innerHTML = realHpF.toString();
                const damageLeftInterval = setInterval(damageLeft, 10);
                i++;
              }
            }
            const attackRightInterval = setInterval(attackRight, 4);
            attackR.style.display = "block"
            attackR.style.left = poseXF+"px"
          }
      
          striker = 1 - striker;
        }
      }
      const attackInterval = setInterval(attack, 2000);
    }
  }, [firstStriker]);

  return  (
    <div className="NFT-fighting-cont" >

      <div className="NFT-fighting-left NFT-fighting">
        <p className="hp-remaining-left">1000</p>
        <div className="NFT-fighting-image-cont NFT-fighting-image-cont-left">
          <div className="hp-line-left hp-line"></div>
          <div className="strike-line strike-line-left"></div>
          <img src={"yourhost/"+firstNFT[0].fields.image} className="fight-image-left" alt="NFT-image" width="270" height="300"/>
        </div>
        <div className="NFT-fighting-content">
          <div>ID: <span className="NFT-show-id">{firstNFT[0].pk}</span> </div>
          <div>Name: <span className="NFT-show-name">{firstNFT[0].fields.name}</span> </div>
          <div>Power: <span className="NFT-show-power">{firstNFT[0].fields.power}</span> </div>
        </div>
        <div className="attack-icon-cont attack-icon-cont-left">
          <img src={attackLIcon} alt="Logo"  className="attack-icon attack-icon-left"/> 
        </div>
        <p className="damage-left"></p> 
      </div>

      <div className="NFT-fighting-right NFT-fighting">
        <p className="hp-remaining-right">1000</p>
        <div className="NFT-fighting-image-cont NFT-fighting-image-cont-right">
          <div className="hp-line-right hp-line"></div>
          <div className="strike-line strike-line-right"></div>
          <img src={"yourhost/"+secondNFT[0].fields.image} className="fight-image-right" alt="NFT-image" width="270" height="300"/>
        </div>
        <div className="NFT-fighting-content">
          <div>ID: <span className="NFT-show-id">{secondNFT[0].pk}</span> </div>
          <div>Name: <span className="NFT-show-name">{secondNFT[0].fields.name}</span> </div>
          <div>Power: <span className="NFT-show-power">{secondNFT[0].fields.power}</span> </div>
        </div>
        <div className="attack-icon-cont attack-icon-cont-right">
         <img src={attackRIcon} alt="Logo"  className="attack-icon attack-icon-right"/>
        </div>
        <p className="damage-right"></p>
      </div>
    </div>
  );
};
  
export default FightingNFT;
