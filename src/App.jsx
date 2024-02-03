import {Routes, Route} from 'react-router-dom';
import React, {useState} from "react";

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';

import styles from './styles.js';

export const Context = React.createContext();

export default function App() {

  const [page, setPage] = useState("home");

  return (

    <Context.Provider value={[page, setPage]}>
      <div className="bg-black1 w-full overflow-hidden">
        
        <div className={`my-5 w-full`}>
          <NavBar/>
        </div>

        <div className={`flex ${styles.marginX} ${styles.marginY}`}>
          <Routes>
              
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/testimonials" element={<Testimonials />}></Route>

          
          </Routes>
        </div>

        <div className={`my-5  w-full`}>
          <Footer/>
        </div>
        
        
      </div>
    </Context.Provider>

  )
}
