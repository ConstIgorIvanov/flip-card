import { useSelector, useDispatch } from "react-redux";
import { setGameTimer } from "../../features/card/cardSlice";
import {formatSeconds} from '../../helpers/timerView'
const Time = () => {
  const time = useSelector((state) => state.card.gameTimer);
  return <div className="header__time">{formatSeconds(time)}</div>;
};

export { Time };
