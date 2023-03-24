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
  scroll: "True",
  scrollPosition: "True",
  scrollRecently: "True",
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

const scrollSlice = createSlice({
  name: "scroll",
  initialState,
  reducers: {
    set_scroll: (state) => {
      return produce(state, (draftState) => {
        draftState.scroll = "False";
      });
    },
  },
});
const scrollSlicePosition = createSlice({
  name: "scrollPosition",
  initialState,
  reducers: {
    set_scroll_position: (state) => {
      return produce(state, (draftState) => {
        draftState.scrollPosition = "False";
      });
    },
  },
});
const scrollSliceRecently = createSlice({
  name: "scrollRecently",
  initialState,
  reducers: {
    set_scroll_recently: (state) => {
      return produce(state, (draftState) => {
        draftState.scrollRecently = "False";
      });
    },
  },
});
const persistedReducer = persistReducer(persistConfig, counterSlice.reducer);
const persistedReducer2 = persistReducer(persistConfig, scrollSlice.reducer);
const persistedReducer3 = persistReducer(
  persistConfig,
  scrollSlicePosition.reducer
);
const persistedReducer4 = persistReducer(
  persistConfig,
  scrollSliceRecently.reducer
);

export const { set_day_mode, set_night_mode } = counterSlice.actions;
export const { set_scroll } = scrollSlice.actions;
export const { set_scroll_position } = scrollSlicePosition.actions;
export const { set_scroll_recently } = scrollSliceRecently.actions;

export const store = configureStore({
  reducer: {
    theme: persistedReducer,
    scroll: persistedReducer2,
    scrollPosition: persistedReducer3,
    scrollRecently: persistedReducer4,
  },
});

export const persistor = persistStore(store);
