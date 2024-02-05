import React from "react";
import { createRoot } from "react-dom/client";
import App from "../App";
import ApiProvider from "../api/apiProvider.jsx";

export const navbarlinks_signedout = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "signin",
    title: "Sign In",
  },
  {
    id: "registration",
    title: "Register",
  },
];

export const navbarlinks_signedin = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "explore",
    title: "Explore",
  },
  {
    id: "myprofile",
    title: "My Profile",
  },
  {
    id: "signout",
    title: "Sign Out",
  },
];

const container = document.getElementById("root");
const root = createRoot(container); //Create a root.

root.render(
  <React.StrictMode>
    <ApiProvider>
      <App />
    </ApiProvider>
  </React.StrictMode>,
);
