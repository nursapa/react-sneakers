import { useState } from "react";
import styles from "./Card.module.scss";

function Card({ title, imgUrl, price, onFavorite, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);

  const onClickPlus = () => {
    onPlus({ title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="img/heart-unliked.svg" alt="Unliked-button" />
      </div>
      <img width={133} height={112} src={imgUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цены:</span>
          <b>{price} руб</b>
        </div>
        <button className="button">
          <img
            className={styles.plus}
            src={isAdded ? "img/added.svg" : "img/addButton.svg"}
            alt="Plus"
            onClick={onClickPlus}
          />
        </button>
      </div>
    </div>
  );
}

export default Card;
