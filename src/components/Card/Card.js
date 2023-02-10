import { useState } from "react";
import ContentLoader from "react-content-loader";
import styles from "./Card.module.scss";

function Card({
  id,
  title,
  imgUrl,
  price,
  onFavorite,
  onPlus,
  added = false,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imgUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imgUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <ContentLoader
      speed={2}
      width={210}
      height={260}
      viewBox="0 0 210 260"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="87" y="50" rx="0" ry="0" width="0" height="1" />
      <rect x="30" y="143" rx="3" ry="3" width="150" height="15" />
      <rect x="30" y="162" rx="3" ry="3" width="93" height="15" />
      <rect x="148" y="191" rx="8" ry="8" width="32" height="32" />
      <rect x="30" y="199" rx="8" ry="8" width="80" height="24" />
      <rect x="30" y="36" rx="10" ry="10" width="150" height="91" />
    </ContentLoader>
    // <div className={styles.card}>
    //   <div className={styles.favorite}>
    //     <img
    //       onClick={onClickFavorite}
    //       src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
    //       alt="Unliked-button"
    //     />
    //   </div>
    //   <img width={133} height={112} src={imgUrl} alt="Sneakers" />
    //   <h5>{title}</h5>
    //   <div className="d-flex justify-between align-center">
    //     <div className="d-flex flex-column ">
    //       <span>Цены:</span>
    //       <b>{price} руб</b>
    //     </div>
    //     <button className="button">
    //       <img
    //         className={styles.plus}
    //         src={isAdded ? "img/added.svg" : "img/addButton.svg"}
    //         alt="Plus"
    //         onClick={onClickPlus}
    //       />
    //     </button>
    //   </div>
    // </div>
  );
}

export default Card;
