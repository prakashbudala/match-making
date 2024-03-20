import React, { useState } from 'react';
import './FoodSearch.css'; // Import CSS file
import removeIcon from './Assets/remove.png';
import { useNavigate } from 'react-router';

function FoodSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const popularFoods = [
        "Pizza", "Burger", "Sushi", "Tacos", "Pasta", "Fried Chicken",
        "Steak", "Sushi", "Ramen", "Burrito", "Sandwich", "Curry",
        "Salad", "Ice Cream", "Donuts", "Pancakes", "Waffles", "Dim Sum",
        "Pho", "Lasagna"
    ];

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filteredSuggestions = popularFoods.filter(food =>
            food.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const removeFood = (index) => {
        const newSelectedFoods = [...selectedFoods];
        newSelectedFoods.splice(index, 1);
        setSelectedFoods(newSelectedFoods);
    };

    const addFood = (food) => {
        if (!selectedFoods.includes(food)) {
            setSelectedFoods([...selectedFoods, food]);
        }
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleGetMatch = () => {
        // Add logic to get the match based on selected foods
        console.log("Getting your match...");
        navigate('/yourmatch', { state: { data: selectedFoods } });

    };

    return (
        <div>
            <div className="food-container">
                <div className="food-input-container">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        placeholder="Enter food item"
                    />
                    <button className="get-match-button" onClick={handleGetMatch}>Get Your Match</button>

                </div>
                {suggestions.length > 0 && (
                    <div className="suggestions-container">
                        <ul>
                            {suggestions.map((food, index) => (
                                <li key={index} onClick={() => addFood(food)}>
                                    {food}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <p className="selected-foods-title">Selected foods:</p>
            <div className="selected-foods-container">
                <ul>
                    {selectedFoods.map((food, index) => (
                        <li key={index}>
                            {food}
                            <img src={removeIcon} alt="Remove" className="remove-icon" onClick={() => removeFood(index)} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FoodSearch;
