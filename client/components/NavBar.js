import React from "react";
import { Link } from "react-router-dom";


const NavBar = () => {
  return (
    <ul className="navBar">
      <li className="navLi">
        <Link to="/">Home</Link>
      </li>
      <li className="navLi">
        <Link to="/raidTeams">Raid Teams</Link>
      </li>
      <li className="navLi">
        <Link to="/about">About</Link>
      </li>
      <li className="navLi">
        <Link to="/apply">Apply</Link>
      </li>
    </ul>
  );
};

export default NavBar;
