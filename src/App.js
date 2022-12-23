import { useState, useEffect } from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card/Card";
import axios from "axios";
function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cardOpened, setCardOpened] = useState(false);

  useEffect(() => {
    axios
      .get("https://63a44d4d2a73744b0073637b.mockapi.io/items")
      .then((res) => setItems(res.data));
    axios
      .get("https://63a44d4d2a73744b0073637b.mockapi.io/cart")
      .then((res) => setCardItems(res.data));
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://63a44d4d2a73744b0073637b.mockapi.io/cart", obj);
    setCardItems((prev) => (prev.includes(obj) ? null : [...prev, obj]));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  console.log(cardItems);

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer onClose={() => setCardOpened(false)} items={cardItems} />
      )}
      <Header onClickCard={() => setCardOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue ? `Поиск по запросу: ${searchValue}` : "Все крассовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="img/btn-remove.svg"
                alt="clear"
              />
            )}
            <input
              onChange={onChangeSearchInput}
              type="text"
              value={searchValue}
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((item) =>
              item.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imgUrl={item.imgUrl}
                onFavorite={() => console.log("You add to favorite list")}
                onPlus={(obj) => onAddToCard(obj)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
