import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { ContextProvider } from "./ContextProvider";
import { Provider } from "react-redux";
import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    myValue: "",
  },
  reducers: {
    setValue: (state, action) => {
      state.myValue = action.payload;
    },
  },
});
const store = configureStore({
  reducer: mySlice.reducer,
});
store.dispatch(mySlice.actions.setValue("light-theme"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ContextProvider>
  </Provider>
);
