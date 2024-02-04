import {useState, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import { useUser } from '../App';
import { navbarlinks_signedin, navbarlinks_signedout } from "../constants";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import logo from "../assets/logo.png";


const NavBar = () => {

  const [toggle, setToggle] = useState(false);
  const { currentPage, setCurrentPage } = useUser();
  const { userID, setUserID } = useUser();


  return (
    <nav className="w-full flex py-4 justify-between items-center max-h-100 border-2 border-white">

      <NavLink to="/home" onClick={() => setCurrentPage("home")} className="ml-10 sm:ml-[60px]">
        <img src={logo} alt="logo" className="w-[100px] h-[100%] object-contain" />
      </NavLink>

      {/* This is the navbar for sm and above */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">

      {userID === null ? (
        navbarlinks_signedout.map((nav, index) => (
          <li
            key={nav.id}
            className={`cursor-pointer text-18px ${
              currentPage === nav.title ? "text-coral1" : "text-textwhite"
            } ${index === navbarlinks_signedout.length - 1 ? "mr-[100px]" : "mr-10"}`}
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
              } ${index === navbarlinks_signedin.length - 1 ? "mr-[100px]" : "mr-10"}`}
              onClick={() => setCurrentPage(nav.title)}
            >
              <NavLink to={`${nav.id}`}>{nav.title}</NavLink>
            </li>
          ) : (
            <button onClick={() => console.log("Signing Out")} key={nav.id}
              className={`cursor-pointer text-18px ${currentPage === nav.title ? "text-coral1" : "text-textwhite"} ${index === navbarlinks_signedin.length - 1 ? "mr-[100px]" : "mr-10"}`}>
              {/* {nav.title} */}
              Sign Out Button
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

        <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-grey4 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navbarlinks_signedout.map((nav, index) => (
              <li
                key={nav.id}
                className={`cursor-pointer text-16px ${
                  currentPage === nav.title ? "text-coral1" : "text-textwhite"
                } ${index === navbarlinks_signedout.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setCurrentPage(nav.title)}
              >
                <NavLink to={`${nav.id}`} >{nav.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </nav>

  )
}

export default NavBar
