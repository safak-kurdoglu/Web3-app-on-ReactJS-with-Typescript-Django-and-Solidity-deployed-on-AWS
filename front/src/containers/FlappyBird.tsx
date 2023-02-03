import "./game-container/script";
import {  useEffect } from "react";

const FlappyBird = () => {

  useEffect(() => {
    (document.getElementById("game-container") as HTMLElement).style.display = "block";
    
  }, []);

  return  <></>;
};
  
export default FlappyBird;
  
