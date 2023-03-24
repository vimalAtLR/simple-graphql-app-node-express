import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
        <header className="main-navigation">
            <div className="main-navigation__logo">
                <h1>EasyEvent</h1>
            </div>
            <nav className="main-navigation__items">
            <ul>
                <li>
                    <Link to="/login">Authenticate</Link>
                </li>
                <li>
                    <Link to="/events">Events</Link>
                </li>
            </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
