import {useState, useContext} from "react";
import { NavLink } from 'react-router-dom';
import {Context} from "../App";

import { navbarlinks } from "../constants";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";



const NavBar = () => {

  const [page, setPage] = useContext(Context);
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center">

      {/* This is the navbar for sm and above */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">

        {navbarlinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`cursor-pointer text-18px ${page.toLowerCase() === nav.title.toLowerCase() ? "text-coral1" : "text-textwhite"}
            ${index === navbarlinks.length - 1 ? "mr-20" : "mr-10"}`}
            onClick={() => setPage(nav.title)}
          >
            <NavLink to={`${nav.id}`} className={`${page.toLowerCase() === nav.title.toLowerCase() ? "text-coral1" : "text-textwhite"}`}>{nav.title}</NavLink>
          </li>
        ))}

      </ul>

      {/* This is the navbar for sm screens */}
      <div className="sm:hidden flex flex-1 justify-end items-center">

        {/* Icon to toggle pop up navbar */}
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain cursor-pointer"
          onClick={() => setToggle(!toggle)}
        />

        <div className={`${!toggle ? "hidden" : "flex"} p-6 bg-grey4 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navbarlinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`cursor-pointer text-16px ${
                  page.toLowerCase() === nav.title.toLowerCase() ? "text-coral1" : "text-textwhite"
                } ${index === navbarlinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setPage(nav.title)}
              >
                <NavLink to={`${nav.id}`} className={`${page.toLowerCase() === nav.title.toLowerCase() ? "text-coral1" : "text-textwhite"}`}>{nav.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>


    </nav>

  )
}

export default NavBar
