import { StrictMode } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import "./styles/globals.css";
import Router from "./Router";
import store, { persistedStore } from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
