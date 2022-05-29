import { useAppDispatch, useAppSelector } from '../../hooks';
import { cardOpen } from '../../features/card/cardSlice';
import { card } from '../../features/card/cardSlice';

const CardItem: React.FC<card> = ({ id, isOpen, isOnBoard, value }) => {
  const dispatch = useAppDispatch();
  const { isInterfaceBlocked, isGameStart } = useAppSelector((state) => state.card);

  function openCard(id: number, value: string) {
    dispatch(cardOpen(id, value));
  }
  return (
    <button
      disabled={isInterfaceBlocked || !isOnBoard || !isGameStart || isOpen}
      onClick={() => openCard(id, value)}
      className="btn__item">
      <div className={`card ${isOpen && 'is-flipped'} ${!isOnBoard && 'hide'}`}>
        <div className="card__face card__face--front"></div>
        <div className="card__face card__face--back">{value}</div>
      </div>
    </button>
  );
};

export { CardItem };
