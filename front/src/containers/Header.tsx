import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="ui fixed menu">
      <div className="ui container center header">
        <Link to={`/`}>
          <h2>Shila</h2>
        </Link>
        <h2 className="header-store"><Link to={`/store`}>Store</Link></h2>
        <p className="game-button"><Link to={`/game`}>Play to Earn</Link></p>
      </div>
    </div>
  );
};

export default Header;
