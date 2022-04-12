import "./App.scss";
import { CardItem } from "./components/CardItem/CardItem";
import { Header } from "./components/Header/Header";
import { useSelector } from "react-redux";

function App() {
  const { cards, isGameStart } = useSelector((state) => state.card);
  return (
    <div className="app">
      <div className="container">
        <div className="inner">
          <Header></Header>
          <div className="content">
            {cards.map((card) => (
              <CardItem data={card} key={card.id}></CardItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
