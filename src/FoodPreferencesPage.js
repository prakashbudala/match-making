import React from 'react';
import foodieCouple from './Assets/foodieCouple.svg';
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
            <img src={foodieCouple} alt="Foodie Couple" style={imageStyle} />
            <FoodSearch />
        </div>
    );
};

export default MatchingPage;
