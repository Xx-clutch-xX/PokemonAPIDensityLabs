import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import ListaSlice from '../features/ListaPokemon/ListaSlice';
import ListSlice from '../features/PokemonList/ListSlice';

export const store = configureStore({
  reducer: {
    // ListaSlicerino: ListaSlice,
    ListSliceReducer: ListSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
