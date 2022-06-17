import React from 'react';
import Header from './Header';
import Cart from './pages/Cart';
import '../scss/app.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';
import FullPizza from "./pages/FullPizza";
import Layout from "./layouts/Layout";

const App = () => {
  return (
          <Routes>
           <Route to='/' element={<Layout />}>
               <Route path="" element={<Home />} />
               <Route path="cart" element={<Cart />} />
               <Route path="pizza/:id" element={<FullPizza />} />
               <Route path="*" element={<NotFound />} />
           </Route>
          </Routes>
  );
};

export default App;
