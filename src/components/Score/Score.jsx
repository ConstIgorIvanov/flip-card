import {useSelector} from 'react-redux'
const Score = () => {
  const cardGueses = useSelector((state)=>state.card.cardGueses)
  return (
    <div className="header__score">
      {cardGueses}
      <span>/16</span>
    </div>
  );
};

export { Score };
