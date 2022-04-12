import "./App.scss";
import { CardItem } from "./components/CardItem/CardItem";
import { Time } from "./components/Time/Time";
import { Score } from "./components/Score/Score";
function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="inner">
          <div className="header">
            <Time></Time>
            <Score></Score>
            <button className="header__btn">START</button>
          </div>
          <div className="content">
            <CardItem></CardItem>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
