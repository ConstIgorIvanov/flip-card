import { createSlice } from "@reduxjs/toolkit";
import { shufleArr } from "../../helpers/shufle";
const initialState = {
  gameTimer: 0,
  isInterfaceBlocked: false,
  openedCards: [],
  cardsGuessed: 0,
  isGameStart: false,
  isLocalTimer: false,
  timerId: undefined,
  intervalId: undefined,
  cards: [
    { id: 1, isOpen: false, value: "кот", isOnBoard: true },
    { id: 2, isOpen: false, value: "кот", isOnBoard: true },
    { id: 3, isOpen: false, value: "пес", isOnBoard: true },
    { id: 4, isOpen: false, value: "пес", isOnBoard: true },
    { id: 5, isOpen: false, value: "рыба", isOnBoard: true },
    { id: 6, isOpen: false, value: "рыба", isOnBoard: true },
    { id: 7, isOpen: false, value: "динозавр", isOnBoard: true },
    { id: 8, isOpen: false, value: "динозавр", isOnBoard: true },
    { id: 9, isOpen: false, value: "мышь", isOnBoard: true },
    { id: 10, isOpen: false, value: "мышь", isOnBoard: true },
    { id: 11, isOpen: false, value: "птица", isOnBoard: true },
    { id: 12, isOpen: false, value: "птица", isOnBoard: true },
    { id: 13, isOpen: false, value: "змея", isOnBoard: true },
    { id: 14, isOpen: false, value: "змея", isOnBoard: true },
    { id: 15, isOpen: false, value: "человек", isOnBoard: true },
    { id: 16, isOpen: false, value: "человек", isOnBoard: true },
  ],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setCardOpen: (state, action) => {
      state.cards = state.cards.map((card) => {
        if (card.id === action.payload) {
          card.isOpen = true;
        }
        return card;
      });
    },
    setLocalTimer: (state, action) => {
      state.isLocalTimer = action.payload;
    },
    addCardToOpen: (state, action) => {
      state.openedCards = [...state.openedCards, action.payload];
    },
    closeAllCard: (state, action) => {
      state.cards = state.cards.map((card) => {
        card.isOpen = false;
        return card;
      });
      state.openedCards = [];
    },
    toggleBlockedInterface: (state, action) => {
      state.isInterfaceBlocked = action.payload;
    },
    toggleGameStarted: (state, action) => {
      state.isGameStart = action.payload;
    },
    addCardToGuessedCard: (state, action) => {
      state.cardsGuessed = state.cardsGuessed + 2;
      state.cards = state.cards.map((card) => {
        if (action.payload.some((id) => id === card.id)) {
          card.isOnBoard = false;
        }
        return card;
      });
    },
    setGameTimer: (state, action) => {
      state.gameTimer = action.payload;
    },
    resetGame: (state, action) => {
      state.cardsGuessed = 0;
      state.gameTimer = 0;
      state.cards = shufleArr(
        state.cards.map((card) => {
          card.isOnBoard = true;
          return card;
        })
      );
    },
    setTimerId: (state, action) => {
      state.timerId = action.payload;
    },
    setIntervalId: (state, action) => {
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

const addCardsToGuessedThunk = (id1, id2) => {
  return (dispatch) => {
    dispatch(toggleBlockedInterface(true));
    setTimeout(() => {
      dispatch(addCardToGuessedCard([id1, id2]));
      dispatch(toggleBlockedInterface(false));
    }, 1000);
  };
};
const closeAllCardsThunk = () => {
  return (dispatch) => {
    dispatch(toggleBlockedInterface(true));
    setTimeout(() => {
      dispatch(closeAllCard());
      dispatch(toggleBlockedInterface(false));
    }, 1000);
  };
};

export const startGame = () => {
  return (dispatch, getState) => {
    dispatch(toggleGameStarted(true));
    dispatch(resetGame());  
    let gameTimer = getState().card.gameTimer;
    let intervalId = setInterval(() => {
      gameTimer++;
      dispatch(setGameTimer(gameTimer));
    }, 1000);
    dispatch(setIntervalId(intervalId));
  };
};
export const endGame = () => {
  return (dispatch, getState) => {
    let intervalId = getState().card.intervalId;
    dispatch(toggleGameStarted(false));
    clearInterval(intervalId);
  };
};

export const cardOpen = (id, value) => {
  return (dispatch, getState) => {
    dispatch(setCardOpen(id));
    let { openedCards, cardsGuessed, isLocalTimer } = getState().card;
    if (!isLocalTimer) {
      dispatch(setLocalTimer(true));
      let timerId = setTimeout(() => {
        dispatch(setLocalTimer(false));
        dispatch(closeAllCard());
      }, 3000);
      dispatch(setTimerId(timerId));
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
      window.clearTimeout(getState().card.timerId);
    } else {
      dispatch(addCardToOpen({ id, value }));
    }
   
  };
};
export default cardSlice.reducer;
