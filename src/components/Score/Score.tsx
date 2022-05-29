import { useAppSelector } from '../../hooks';

const Score: React.FC = () => {
  const cardsGuessed = useAppSelector((state) => state.card.cardsGuessed);
  return (
    <div className="header__score">
      {cardsGuessed} <span> /16</span>
    </div>
  );
};

export { Score };
