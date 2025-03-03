import { useContext, useState, useEffect } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";
import { BackgroundLines } from "../../components/ui/background-lines";
import { ColourfulText } from "../../components/ui/colourful-text";

// import { PiStarThin } from "react-icons/pi";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <BackgroundLines className="background-lines"></BackgroundLines>
      <div className="hero">
        <h1>
          World Most <br />
          Reliable <ColourfulText text={"Crypto Marketplace"} />
        </h1>
        <p>
          Coinmenu is world most reliable open source crypto data, Crypto
          news,community and more.
        </p>
        <form onSubmit={searchHandler}>
          <input
            list="coinlist"
            onChange={inputHandler}
            value={input}
            required
            type="text"
            placeholder="Search crypto.."
          />

          <datalist id="coinlist">
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24%</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoin.slice(0).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>
                {item.name} <span className="symbol-text">{item.symbol}</span>
              </p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={item.price_change_percentage_24h > 0 ? "green" : "red"}
            >
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
