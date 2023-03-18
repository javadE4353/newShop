import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
//

import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./app/store";

//
// import { productsFatch } from './containers/featcher/product/productSlice';
// import { categoryApi } from './containers/featcher/category/categorySlice';
// store.dispatch(productsFatch())
// store.dispatch(categoryApi())

//
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
