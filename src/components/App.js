import React from 'react';
import Header from './Header';
import Cart from './pages/Cart';
import '../scss/app.scss';
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';

const App = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
