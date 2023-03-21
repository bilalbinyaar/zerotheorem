import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import produce from "immer";

const persistConfig = {
  key: "root",
  storage,
};

const initialState = {
  theme: "light-theme",
};

const counterSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    set_day_mode: (state) => {
      return produce(state, (draftState) => {
        draftState.theme = "light-theme";
      });
    },
    set_night_mode: (state) => {
      return produce(state, (draftState) => {
        draftState.theme = "dark-theme";
      });
    },
  },
});

const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);

export const { set_day_mode, set_night_mode } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
  },
});

export const persistor = persistStore(store);
