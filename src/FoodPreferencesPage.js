import React from 'react';
import foodPreference from './Assets/foodPreference.jpg'
import FoodSearch from './FoodSearch';
import { useNavigate } from 'react-router';

const MatchingPage = () => {
    const containerStyle = {
        textAlign: 'center',
        marginTop: '20px',
    };
    const navigate = useNavigate();
    const imageStyle = {
        width: '200px',
        height: '200px',
    };
    const isLoggedIn = sessionStorage.getItem("loggedIn");
    return (
        <div style={containerStyle}>
            {isLoggedIn ?
                <><p> Choose your Favourite foods</p><img src={foodPreference} alt="Foodie Couple" style={imageStyle} /><FoodSearch /></>
                : <p>Please<span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                    navigate('/profile');
                }}> LogIn</span> to our Page </p>}
        </div>
    );
};

export default MatchingPage;
