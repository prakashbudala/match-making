import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="nav-link" activeClassName="active">Home</Link>
            <Link to="/profile" className="nav-link" activeClassName="active">Profile</Link>
            <Link to="/food-preferences" className="nav-link" activeClassName="active">Food Preferences</Link>
            <Link to="/yourmatch" className="nav-link" activeClassName="active">Your Match</Link>
        </div>
    );
}

export default Navbar;
