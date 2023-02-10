import { useState, useEffect } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Header from "./components/Header";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Drawer from "./components/Drawer";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [cardItems, setCardItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cardOpened, setCardOpened] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get(
        "https://63a44d4d2a73744b0073637b.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get(
        "https://63a44d4d2a73744b0073637b.mockapi.io/favorites"
      );
      const itemsResponse = await axios.get(
        "https://63a44d4d2a73744b0073637b.mockapi.io/items"
      );

      setCardItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData();
  }, []);

  const onAddToCard = (obj) => {
    try {
      if (cardItems.find((elem) => elem.title === obj.title)) {
        setCardItems((prev) => prev.filter((item) => item.title !== obj.title));
      } else {
        axios.post("https://63a44d4d2a73744b0073637b.mockapi.io/cart", obj);
        setCardItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Не удалось добавить в корзину");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63a44d4d2a73744b0073637b.mockapi.io/cart/${id}`);
    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((elem) => obj.title === elem.title)) {
        axios.delete(
          `https://63a44d4d2a73744b0073637b.mockapi.io/favorites/${obj.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://63a44d4d2a73744b0073637b.mockapi.io/favorites",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("не удалось добавить в избранные");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cardOpened && (
        <Drawer
          onClose={() => setCardOpened(false)}
          items={cardItems}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCard={() => setCardOpened(true)} />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home
              items={items}
              cardItems={cardItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onAddToCard={onAddToCard}
              onAddToFavorite={onAddToFavorite}
              onChangeSearchInput={onChangeSearchInput}
            />
          }
        ></Route>

        <Route
          path="/favorites"
          element={
            <Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
