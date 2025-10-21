import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";

import{BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from '../src/landing_page/home/HomePage';
import Signup from '../src/landing_page/signup/signup';
import AboutPage from '../src/landing_page/about/AboutPage';
import ProductPage from '../src/landing_page/products/productpage';
import PricingPage from '../src/landing_page/pricing/PricingPage';
import SupportPage from '../src/landing_page/support/SupportPage';
import Navbar from '../src/landing_page/Navbar';
import Footer from '../src/landing_page/Footer';
import PageNotFound from '../src/landing_page/PageNotFound';








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
<Navbar />
<Routes>


  <Route path='/' element={<HomePage/>} />
  <Route path='/signup' element={< Signup />} />

  <Route path='/about' element={<AboutPage />} />
  <Route path='/product' element={< ProductPage/>} />
  <Route path='/pricing' element={< PricingPage/>} />
  <Route path='/support'  element={< SupportPage />} />
  <Route path='*' element={<PageNotFound/>} />

   
   
 
</Routes>
<Footer />
</BrowserRouter>
);


