import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Avatar from './Assets/avatar.png'; // Assuming this is the correct path to your avatar image

function Navbar() {
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const user = sessionStorage.getItem("formData") ? JSON.parse(sessionStorage.getItem("formData")).name : "User";
    const handleLogout = () => {
        sessionStorage.removeItem("loggedIn");
        sessionStorage.removeItem("formData");
        setShowPopup(false);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="navbar">
            <Link to="/" className="nav-link" activeClassName="active">Home</Link>
            <Link to="/profile" className="nav-link" activeClassName="active">Profile</Link>
            <Link to="/food-preferences" className="nav-link" activeClassName="active">Food Preferences</Link>
            <Link to="/yourmatch" className="nav-link" activeClassName="active">Your Match</Link>
            <div className="avatar-container">
                <p style={{ color: "#fffff" }} onClick={togglePopup}> Hey {user}</p>
                <img src={Avatar} alt="Avatar" className="nav-link" onClick={togglePopup} />
                {showPopup && sessionStorage.getItem("formData") && (
                    < >
                        <Link to="/" className="nav-link" activeClassName="active" onClick={handleLogout}>Log Out</Link>

                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;
