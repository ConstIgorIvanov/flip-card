import { Score } from "../Score/Score";
import { Time } from "../Time/Time";
import { startGame } from "../../features/card/cardSlice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isGameStart = useSelector((state) => state.card.isGameStart);
  return (
    <div>
      <div className="header">
        <Time></Time>
        <Score></Score>
        <button
          disabled={isGameStart}
          onClick={() => dispatch(startGame())}
          className="header__btn"
        >
          START
        </button>
      </div>
    </div>
  );
};

export { Header };
