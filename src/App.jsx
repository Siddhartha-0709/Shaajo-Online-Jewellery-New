import React from 'react'
import Home from './components/Home'
import Order from './components/Order'
import Delivery from './components/Delivery';
import About from './components/About'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Contact from './components/Contact';
import Privacy from './components/Privacy';
import Upload from './components/Upload';
import Checkout from './components/Checkout';
import Track from './components/Track';
import Detailsorder from './components/Detailsorder';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/track" element={<Track />} />
          <Route path="/detailsorder" element={<Detailsorder/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
