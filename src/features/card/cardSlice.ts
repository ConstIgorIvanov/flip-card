import { AppDispatch, RootState } from './../../store/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { shufleArr } from '../../helpers/shufle';

export type card = {
  id: number;
  isOpen: boolean;
  value: string;
  isOnBoard: boolean;
};

type openCard = {
  id: number;
  value: string;
};

interface cardsState {
  gameTimer: number;
  isInterfaceBlocked: boolean;
  openedCards: openCard[];
  cardsGuessed: number;
  isGameStart: boolean;
  isLocalTimer: boolean;
  timerId: null | number;
  intervalId: null | number;
  cards: card[];
}

const initialState: cardsState = {
  gameTimer: 0,
  isInterfaceBlocked: false,
  openedCards: [],
  cardsGuessed: 0,
  isGameStart: false,
  isLocalTimer: false,
  timerId: null,
  intervalId: null,
  cards: [
    { id: 1, isOpen: false, value: 'кот', isOnBoard: true },
    { id: 2, isOpen: false, value: 'кот', isOnBoard: true },
    { id: 3, isOpen: false, value: 'пес', isOnBoard: true },
    { id: 4, isOpen: false, value: 'пес', isOnBoard: true },
    { id: 5, isOpen: false, value: 'рыба', isOnBoard: true },
    { id: 6, isOpen: false, value: 'рыба', isOnBoard: true },
    { id: 7, isOpen: false, value: 'динозавр', isOnBoard: true },
    { id: 8, isOpen: false, value: 'динозавр', isOnBoard: true },
    { id: 9, isOpen: false, value: 'мышь', isOnBoard: true },
    { id: 10, isOpen: false, value: 'мышь', isOnBoard: true },
    { id: 11, isOpen: false, value: 'птица', isOnBoard: true },
    { id: 12, isOpen: false, value: 'птица', isOnBoard: true },
    { id: 13, isOpen: false, value: 'змея', isOnBoard: true },
    { id: 14, isOpen: false, value: 'змея', isOnBoard: true },
    { id: 15, isOpen: false, value: 'человек', isOnBoard: true },
    { id: 16, isOpen: false, value: 'человек', isOnBoard: true },
  ],
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCardOpen: (state, action: PayloadAction<number>) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload) {
          card.isOpen = true;
        }
        return card;
      });
    },
    setLocalTimer: (state, action: PayloadAction<boolean>) => {
      state.isLocalTimer = action.payload;
    },
    addCardToOpen: (state, action: PayloadAction<openCard>) => {
      state.openedCards = [...state.openedCards, action.payload];
    },
    closeAllCard: (state) => {
      state.cards = state.cards.map((card) => {
        card.isOpen = false;
        return card;
      });
      state.openedCards = [];
    },
    toggleBlockedInterface: (state, action: PayloadAction<boolean>) => {
      state.isInterfaceBlocked = action.payload;
    },
    toggleGameStarted: (state, action: PayloadAction<boolean>) => {
      state.isGameStart = action.payload;
    },
    addCardToGuessedCard: (state, action: PayloadAction<number[]>) => {
      state.cardsGuessed = state.cardsGuessed + 2;
      state.cards = state.cards.map((card) => {
        if (action.payload.some((id) => id === card.id)) {
          card.isOnBoard = false;
        }
        return card;
      });
    },
    setGameTimer: (state, action: PayloadAction<number>) => {
      state.gameTimer = action.payload;
    },
    resetGame: (state) => {
      state.cardsGuessed = 0;
      state.gameTimer = 0;
      state.cards = shufleArr(
        state.cards.map((card) => {
          card.isOnBoard = true;
          return card;
        }),
      );
    },
    setTimerId: (state, action: PayloadAction<number>) => {
      state.timerId = action.payload;
    },
    setIntervalId: (state, action: PayloadAction<number>) => {
      state.intervalId = action.payload;
    },
  },
});

export const {
  addCardToOpen,
  setCardOpen,
  closeAllCard,
  toggleBlockedInterface,
  toggleGameStarted,
  addCardToGuessedCard,
  setGameTimer,
  resetGame,
  setTimerId,
  setIntervalId,
  setLocalTimer,
} = cardSlice.actions;

const addCardsToGuessedThunk = (id1: number, id2: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(toggleBlockedInterface(true));
    setTimeout(() => {
      dispatch(addCardToGuessedCard([id1, id2]));
      dispatch(toggleBlockedInterface(false));
    }, 1000);
  };
};
const closeAllCardsThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch(toggleBlockedInterface(true));
    setTimeout(() => {
      dispatch(closeAllCard());
      dispatch(toggleBlockedInterface(false));
    }, 1000);
  };
};

export const startGame = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(toggleGameStarted(true));
    dispatch(resetGame());
    let gameTimer = getState().card.gameTimer;
    let intervalId = setInterval(() => {
      gameTimer++;
      dispatch(setGameTimer(gameTimer));
    }, 1000);
    dispatch(setIntervalId(Number(intervalId)));
  };
};
export const endGame = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    let intervalId = getState().card.intervalId;
    dispatch(toggleGameStarted(false));
    clearInterval(Number(intervalId));
  };
};

export const cardOpen = (id: number, value: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setCardOpen(id));
    let { openedCards, cardsGuessed, isLocalTimer } = getState().card;
    if (!isLocalTimer) {
      dispatch(setLocalTimer(true));
      let timerId = setTimeout(() => {
        dispatch(setLocalTimer(false));
        dispatch(closeAllCard());
      }, 3000);
      dispatch(setTimerId(Number(timerId)));
    }
    if (openedCards.length === 1) {
      if (openedCards[0].value === value) {
        dispatch(addCardsToGuessedThunk(openedCards[0].id, id));
        if (cardsGuessed === 14) {
          dispatch(endGame());
        }
      }
      dispatch(closeAllCardsThunk());
      dispatch(setLocalTimer(false));
      window.clearTimeout(Number(getState().card.timerId));
    } else {
      dispatch(addCardToOpen({ id, value }));
    }
  };
};
export default cardSlice.reducer;
