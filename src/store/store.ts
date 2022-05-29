import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../features/card/cardSlice';
const store = configureStore({
  reducer: {
    card: cardSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
