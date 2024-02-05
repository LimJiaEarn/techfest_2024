import {useState} from "react";
import {NavLink, useNavigate} from 'react-router-dom';
import { useUser } from '../App';
import { navbarlinks_signedin, navbarlinks_signedout } from "../constants";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";


const NavBar = () => {

  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  const { userID, setUserID, currentPage, setCurrentPage } = useUser();

  const handleSignOut = () => {

    navigate('/home');
    setCurrentPage("Home");
    setUserID(null);
    localStorage.removeItem('userID');
    console.log("Signed Out and removed userID!");
};

  return (
    <nav className="w-full flex py-4 justify-between items-center max-h-100">
      
      <div className="flex items-center justify-center gap-[20px]">
        <NavLink to="/home" onClick={() => setCurrentPage("home")} className="ml-10 sm:ml-[60px]">
          <img src={logo} alt="logo" className="w-[70px] h-[70px] object-contain rounded-full" />
        </NavLink>
        <p className="text-[1.85rem] text-yellow-100">Skill Sync</p>

      </div>


      {/* This is the navbar for sm and above */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">

      {userID === null ? (
        navbarlinks_signedout.map((nav, index) => (
          <li
            key={nav.id}
            className={`cursor-pointer text-18px ${
              currentPage === nav.title ? "text-coral1" : "text-textwhite"
            } ${index === navbarlinks_signedout.length - 1 ? "mr-[120px]" : "mr-10"}`}
            onClick={() => setCurrentPage(nav.title)}
          >
            <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
          </li>
        ))
      ) : (
        navbarlinks_signedin.map((nav, index) => (
          nav.title !== "Sign Out" ? (
            <li
              key={nav.id}
              className={`cursor-pointer text-18px ${
                currentPage === nav.title ? "text-coral1" : "text-textwhite"
              } ${index === navbarlinks_signedin.length - 1 ? "mr-[120px]" : "mr-10"}`}
              onClick={() => setCurrentPage(nav.title)}
            >
              <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
            </li>
          ) : (
            <button onClick={handleSignOut} key={nav.id} 
              className={`cursor-pointer text-18px ${currentPage === nav.title ? "text-coral1" : "text-textwhite"} ${index === navbarlinks_signedin.length - 1 ? "mr-[120px]" : "mr-10"}`}>
              Sign Out
            </button>
          )
        ))
      )}

        

      </ul>

      {/* This is the navbar for sm screens */}
      <div className="sm:hidden flex flex-1 justify-end items-center">

        {/* Icon to toggle pop up navbar */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="mr-10 w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-grey4 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl`}>
          <ul className="list-none flex justify-end items-start flex-1 flex-col">

            {userID === null ? (
              navbarlinks_signedout.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer text-18px ${
                    currentPage === nav.title ? "text-coral1" : "text-textwhite"
                  } ${index === navbarlinks_signedout.length - 1 ? "mr-[120px]" : "mr-10"}`}
                  onClick={() => setCurrentPage(nav.title)}
                >
                  <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
                </li>
              ))
            ) : (
              navbarlinks_signedin.map((nav, index) => (
                nav.title !== "Sign Out" ? (
                  <li
                    key={nav.id}
                    className={`cursor-pointer text-18px ${
                      currentPage === nav.title ? "text-coral1" : "text-textwhite"
                    } ${index === navbarlinks_signedin.length - 1 ? "mr-[120px]" : "mr-10"}`}
                    onClick={() => setCurrentPage(nav.title)}
                  >
                    <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
                  </li>
                ) : (
                  <button onClick={handleSignOut} key={nav.id} 
                    className={`cursor-pointer text-18px ${currentPage === nav.title ? "text-coral1" : "text-textwhite"} ${index === navbarlinks_signedin.length - 1 ? "mr-[120px]" : "mr-10"}`}>
                    Sign Out
                  </button>
                )
              ))
            )}


          </ul>
        </div>
      </div>


    </nav>

  )
}

export default NavBar
