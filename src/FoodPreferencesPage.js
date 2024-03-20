import React from 'react';
import foodPreference from './Assets/foodPreference.jpg'
import FoodSearch from './FoodSearch';

const MatchingPage = () => {
    const containerStyle = {
        textAlign: 'center',
        marginTop: '20px',
    };

    const imageStyle = {
        width: '200px',
        height: '200px',
    };

    return (
        <div style={containerStyle}>
            <p> Choose your Favourite foods</p>
            <img src={foodPreference} alt="Foodie Couple" style={imageStyle} />
            <FoodSearch />
        </div>
    );
};

export default MatchingPage;
