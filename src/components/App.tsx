import "../scss/app.scss";
import Home from "../pages/Home";
import { Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Loadable from "react-loadable";
import React, { Suspense } from "react";

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ "../pages/Cart"),
  loading: () => <div>Идет загрузка...</div>,
});

const FullPizza = Loadable({
  loader: () =>
    import(/* webpackChunkName: "FullPizza" */ "../pages/FullPizza"),
  loading: () => <div>Идет загрузка...</div>,
});

const NotFound = Loadable({
  loader: () => import(/* webpackChunkName: "FullPizza" */ "./notFound"),
  loading: () => <div>Идет загрузка...</div>,
});

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={"loading..."}>
              {" "}
              <FullPizza />{" "}
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={"loading..."}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
