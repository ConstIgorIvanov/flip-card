import { useDispatch, useSelector } from "react-redux";
import { cardOpen } from "../../features/card/cardSlice";

const CardItem = ({ data }) => {
  const dispatch = useDispatch();
  const { isInterfaceBlocked, isGameStart } = useSelector(
    (state) => state.card
  );

  function openCard(id, value) {
    dispatch(cardOpen(id, value));
    console.log(id, value);
  }
  return (
    <button
      disabled={
        isInterfaceBlocked || !data.isOnBoard || !isGameStart || data.isOpen
      }
      onClick={() => openCard(data.id, data.value)}
      className="btn__item"
    >
      <div
        className={`card ${data.isOpen && "is-flipped"} ${
          !data.isOnBoard && "hide"
        }`}
      >
        <div className="card__face card__face--front"></div>
        <div className="card__face card__face--back">{data.value}</div>
      </div>
    </button>
  );
};

export { CardItem };
