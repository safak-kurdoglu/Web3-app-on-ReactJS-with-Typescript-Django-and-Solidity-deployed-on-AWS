
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./containers/Header";
import Main from "./containers/Main";
import NFTSale from "./containers/ShilaNFTSale";
import FlappyBird from "./containers/FlappyBird";
import "./App.css";

export default function App() {
  return ( 
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/store" element={<NFTSale />} />
          <Route path="/game" element={<FlappyBird />} />
          <Route>404 Not Found!</Route>
        </Routes>
      </Router>
    </div>
  ); 
}
