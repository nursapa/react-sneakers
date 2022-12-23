import { useState, useEffect } from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Card from "./components/Card/Card";

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([
    {
      title: "Мужские Кроссовки Nike Blazer Mid Suede",
      price: 12999,
      imgUrl: "img/sneakers/1.jpg",
    },
    {
      title: "Мужские Кроссовки Nike Air Max 270",
      price: 15690,
      imgUrl: "img/sneakers/2.jpg",
    },
  ]);
  const [cardOpened, setCardOpened] = useState(false);

  useEffect(() => {
    fetch("https://63a44d4d2a73744b0073637b.mockapi.io/items")
      .then((res) => {
        return res.json();
      })
      .then((json) => setItems(json));
  }, []);

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer onClose={() => setCardOpened(false)} items={cardItems} />
      )}
      <Header onClickCard={() => setCardOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все Крассовки</h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((obj) => (
            <Card title={obj.title} price={obj.price} imgUrl={obj.imgUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
