import { useAppSelector, useAppDispatch } from '../../hooks';

import { Score } from '../Score/Score';
import { Time } from '../Time/Time';
import { startGame } from '../../features/card/cardSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const isGameStart = useAppSelector((state) => state.card.isGameStart);
  return (
    <div>
      <div className="header">
        <Time></Time>
        <Score></Score>
        <button
          disabled={isGameStart}
          onClick={() => dispatch(startGame())}
          className="header__btn">
          START
        </button>
      </div>
    </div>
  );
};

export { Header };
