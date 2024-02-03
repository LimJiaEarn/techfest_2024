import {Routes, Route} from 'react-router-dom';
import React, {useState} from "react";

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import Registration from './components/Registration.jsx';
import Footer from './components/Footer.jsx';

import styles from './styles.js';


export default function App() {

  return (

      <div className="bg-black1 w-full overflow-hidden min-h-screen">
        
        <div className={`w-full`}>
          <NavBar/>
        </div>

        <div className={`flex ${styles.marginX} ${styles.marginY} border-2 border-pink`}>
          <Routes>
              
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/testimonials" element={<Testimonials />}></Route>
            <Route path="/registration" element={<Registration />}></Route>

          
          </Routes>
        </div>

        <div className={`my-5  w-full border-2 border-white fixed bottom-0`}>
          <Footer/>
        </div>
        
        
      </div>

  )
}
