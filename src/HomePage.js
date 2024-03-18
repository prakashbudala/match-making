import React from 'react';
import { useNavigate } from 'react-router';
import './HomePage.css'
const HomePage = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to a different route
        navigate('/profile');
    }

    return (
        <div className="container">
            <h1 className="heading">Foodie Match</h1>
            <p className="subheading">Find Your Perfect Foodie Partner :)</p>
            <button className="get-started-btn" onClick={handleClick}>Get Started</button>
        </div>
    );
};

export default HomePage;
