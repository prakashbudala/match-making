import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
function Navbar() {
    return (
        <div className="navbar">
            <Link to="/" className="nav-link" activeClassName="active">Home</Link>
            <Link to="/profile" className="nav-link" activeClassName="active">Profile</Link>
            <Link to="/yourmatch" className="nav-link" activeClassName="active">Matchmaking</Link>
        </div>
    );
}

export default Navbar;
