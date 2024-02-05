import { Routes, Route } from 'react-router-dom';
import { useEffect, createContext, useState, useContext } from "react";

import NavBar from './components/NavBar.jsx';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import Registration from './components/Registration.jsx';
import Explore from './components/Explore.jsx';
import MyProfile from './components/MyProfile.jsx';
import Footer from './components/Footer.jsx';

import { useResumeContext, ResumeProvider } from "./contexts/resumeContext.jsx";

import styles from './styles.js';

const UserContext = createContext();

export default function App() {

  const localStorageUserId = localStorage.getItem('userID');

  // if (localStorageUserId !== null) {
  //   console.log('userID exists in local storage:', localStorageUserId);
  // } else {
  //   console.log('userID does not exist in local storage');
  // }

  const [userID, setUserID] = useState(localStorageUserId);


  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || ""
  );

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <UserContext.Provider value={{ userID, setUserID, currentPage, setCurrentPage }}> 
     <ResumeProvider>
      <div className="bg-black1 w-full overflow-hidden min-h-screen root">
        
        <div className="w-full z-100 mb-5">
          <NavBar/>
        </div>

        <div className="flex justify-center">

          {/* Not Signed in Yet Routes */}
          { userID===null? (
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/signin" element={<SignIn />}></Route>
              <Route path="/registration" element={<Registration />}></Route>
            </Routes>
          ) :
          // Signed in Routes
          (
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/explore" element={<Explore />}></Route>
              <Route path="/myprofile" element={<MyProfile />}></Route>
              <Route path="/registration" element={<Registration />}></Route>
            </Routes>
          )
          }
          
        </div>

        {/* <div className={`mt-5  w-full border-2 border-white fixed bottom-0 bg-black z-100`}>
          <Footer/>
        </div> */}
        
        
      </div>
      </ResumeProvider>
    </UserContext.Provider>
  )
}

// Custom hook to consume the context
export const useUser = () => useContext(UserContext);