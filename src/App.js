import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';

function App() {
  return (
    <div className='wrapper clear'>
      <Drawer />
      <Header />
      <div className='content p-40'>
        <div className='d-flex align-center justify-between mb-40'>
          <h1>Все Крассовки</h1>
          <div className='search-block d-flex'>
            <img src='img/search.svg' alt='Search' />
            <input type='text' placeholder='Поиск...' />
          </div>
        </div>
        <div className='d-flex justify-between'>
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
