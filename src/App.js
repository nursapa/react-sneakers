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
    axios
      .get("https://63a44d4d2a73744b0073637b.mockapi.io/items")
      .then((res) => setItems(res.data));
    axios
      .get("https://63a44d4d2a73744b0073637b.mockapi.io/cart")
      .then((res) => setCardItems(res.data));
    axios
      .get("https://63a44d4d2a73744b0073637b.mockapi.io/favorites")
      .then((res) => setFavorites(res.data));
  }, []);

  const onAddToCard = (obj) => {
    axios.post("https://63a44d4d2a73744b0073637b.mockapi.io/cart", obj);
    setCardItems((prev) => (prev.includes(obj) ? null : [...prev, obj]));
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63a44d4d2a73744b0073637b.mockapi.io/cart/${id}`);
    setCardItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = (obj) => {
    axios.post("https://63a44d4d2a73744b0073637b.mockapi.io/favorites", obj);
    setFavorites((prev) => (prev.includes(obj) ? null : [...prev, obj]));
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
          element={<Favorites items={favorites} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
