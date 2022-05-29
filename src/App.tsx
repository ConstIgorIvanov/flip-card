import { useAppSelector } from './hooks';

import { CardItem } from './components/CardItem/CardItem';
import { Header } from './components/Header/Header';

import './App.scss';

const App: React.FC = () => {
  const { cards } = useAppSelector((state) => state.card);
  return (
    <div className="app">
      <div className="container">
        <div className="inner">
          <Header></Header>
          <div className="content">
            {cards.map((card) => (
              <CardItem {...card} key={card.id}></CardItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
