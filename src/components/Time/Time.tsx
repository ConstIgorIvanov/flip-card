import { useAppSelector } from '../../hooks';

import { formatSeconds } from '../../helpers/timerView';

const Time: React.FC = () => {
  const time = useAppSelector((state) => state.card.gameTimer);
  return <div className="header__time">{formatSeconds(time)}</div>;
};

export { Time };
