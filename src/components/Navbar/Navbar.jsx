import { useContext } from "react";
import "./Navbar.css";

import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "ngn":
        setCurrency({
          name: "ngn",
          symbol: "₦",
        });
        break;

      case "usd":
        setCurrency({
          name: "usd",
          symbol: "$",
        });
        break;

      case "gbp":
        setCurrency({
          name: "gbp",
          symbol: "£",
        });
        break;

      case "eur":
        setCurrency({
          name: "eur",
          symbol: "€",
          // "\u20AC"
        });
        break;

      default:
        setCurrency({
          name: "ngn",
          symbol: "₦",
        });
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to={"/"}>
        <div className="logo">Coinmenu</div>
      </Link>

      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="ngn">NGN</option>
          <option value="usd">USD</option>
          <option value="gbp">GBP</option>
          <option value="eur">EUR</option>
        </select>
        <a
          href="https://github.com/mrfinndev"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            GitHub <img src={arrow_icon} alt="" />
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
