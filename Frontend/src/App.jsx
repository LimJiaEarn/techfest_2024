import { Routes, Route } from 'react-router-dom';
import React , { createContext, useState, useContext }from "react";

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Testimonials from './components/Testimonials.jsx';
import SignIn from './components/SignIn.jsx';
import Registration from './components/Registration.jsx';
import Footer from './components/Footer.jsx';

import styles from './styles.js';

const UserContext = createContext();

export default function App() {

  const [userID, setUserID] = useState(null);
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <UserContext.Provider value={{ userID, setUserID, currentPage, setCurrentPage }}> 
      <div className="bg-black1 w-full overflow-hidden min-h-screen root">
        
        <div className={`w-full`}>
          <NavBar/>
        </div>

        <div className={`flex ${styles.marginX} ${styles.marginY} `}>
          <Routes>
              
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/testimonials" element={<Testimonials />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/registration" element={<Registration />}></Route>


          
          </Routes>
        </div>

        <div className={`my-5  w-full border-2 border-white fixed bottom-0`}>
          <Footer/>
        </div>
        
        
      </div>
    </UserContext.Provider>
  )
}

// Custom hook to consume the context
export const useUser = () => useContext(UserContext);