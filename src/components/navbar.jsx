import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { FaAddressBook } from "react-icons/fa";
import { CiUser, CiSearch } from "react-icons/ci";
import "./navbar.css";

export const Navbar = () => {
  return (
    <div>
      <nav className="section__container nav__container">
        <Link to="/" className="nav__logo">YOU ZEX</Link>
        <ul className="nav__links">
          <li className="link"><Link to="/">HOME</Link></li>
          <li className="link"><Link to="/shop">SHOES</Link></li>
          <li className="link"><Link to="/shirts">SHIRTS</Link></li>
          <li className="link"><Link to="/accessories">ACCESSORIES</Link></li>
        </ul>
        <div className="nav__icons">
          <Link to="/search">
            <span><CiSearch size={32} /></span>
          </Link>
          <Link to="/signin">
            <span><CiUser size={32} /></span>
          </Link>
          <Link to="/cart">
            <span><ShoppingCart size={32} /></span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
