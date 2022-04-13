import {useSelector} from 'react-redux'
const Score = () => {
  const cardsGuessed = useSelector((state) => state.card.cardsGuessed);
  return (
    <div className="header__score">
      {cardsGuessed} <span> /16</span>
    </div>
  );
};

export { Score };
