import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route } from "react-router-dom";
import { ContextProvider } from "./ContextProvider";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ContextProvider>
      <React.StrictMode>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </React.StrictMode>
    </ContextProvider>
  </Provider>
);
