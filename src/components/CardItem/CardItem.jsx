import { useDispatch, useSelector } from "react-redux";
import { cardOpen } from "../../features/card/cardSlice";

const CardItem = ({ data }) => {
  const dispatch = useDispatch();
  const { isInterfaceBlocked, isGameStart } = useSelector(
    (state) => state.card
  );
  function openCard(id, value) {
    dispatch(cardOpen(id, value));
  }
  return (
    <button
      disabled={
        isInterfaceBlocked || !data.isOnBoard || !isGameStart || data.isOpen
      }
      onClick={() => openCard(data.id, data.value)}
      className="btn__item"
    >
      <div className="card__front">{data.value}</div>
      <div className="card__back">{data.value}</div>
    </button>
  );
};

export { CardItem };
