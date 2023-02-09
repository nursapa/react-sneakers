import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className='d-flex justify-between align-center p-40'>
      <Link to={'/'}>
        <div className='d-flex align-center'>
          <img width={40} height={40} src='/img/logo.png' alt='' />
          <div>
            <h3 className='text-uppercase'>React Sneakers</h3>
            <p className='opacity-5'>Магазин лучших крассовок</p>
          </div>
        </div>
      </Link>
      <ul className='d-flex'>
        <li className='mr-30 cu-p' onClick={props.onClickCard}>
          <img width={18} height={18} src='img/basket.svg' alt='basket' />
          <span>1205 руб</span>
        </li>
        <li className='mr-20 cu-p'>
          <Link to={'/favorites'}>
            <img src='img/heart.svg' alt='Закладки' />
          </Link>
        </li>
        <li>
          <img src='img/user.svg' alt='Профиль' />
        </li>
      </ul>
    </header>
  );
}

export default Header;
