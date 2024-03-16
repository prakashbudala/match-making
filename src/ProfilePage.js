import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './ProfilePage.css'; // Import CSS file

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        location: '',
        foodPreferences: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault(); // Prevent the default button behavior
        console.log('Form submitted:', formData);
        // Here you can add your logic to submit the form data, such as sending it to a backend server
        navigate('/yourmatch');
    }

    return (
        <div className="container">
            <h2>Form</h2>
            <form>
                <div className="input-container">
                    <label htmlFor="name">Name:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="age">Age:</label>
                    <input
                        className="input-field"
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="location">Location:</label>
                    <input
                        className="input-field"
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="foodPreferences">Food Preferences:</label>
                    <textarea
                        className="input-field"
                        id="foodPreferences"
                        name="foodPreferences"
                        value={formData.foodPreferences}
                        onChange={handleChange}
                    />
                </div>
                <button className="submit-button" type="submit" onClick={handleClick}>Submit</button> {/* Use the class name from CSS file */}
            </form>
        </div>
    );
};

export default ProfilePage;
