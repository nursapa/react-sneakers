import styles from './Card.module.scss';

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src='img/heart-unliked.svg' alt='Unliked-button' />
      </div>
      <img width={133} height={112} src={props.imgUrl} alt='Sneakers' />
      <h5>{props.title}</h5>
      <div className='d-flex justify-between align-center'>
        <div className='d-flex flex-column '>
          <span>Цены:</span>
          <b>{props.price} руб</b>
        </div>
        <button className='button' onClick={() => alert('hello')}>
          <img width={11} height={11} src='img/addButton.svg' alt='Plus' />
        </button>
      </div>
    </div>
  );
}

export default Card;
