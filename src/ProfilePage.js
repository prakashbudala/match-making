import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './ProfilePage.css'; // Import CSS file

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        location: '',
    });

    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault(); // Prevent the default button behavior
        console.log('Form submitted:', formData);
        // Here you can add your logic to submit the form data, such as sending it to a backend server
        navigate('/food-preferences', { state: { formData } });
    };

    return (
        <div>
            <div className="flex-container">
                <div className="container">
                    <h2>Your Details</h2>
                    <form>
                        <div className="input-container">
                            <label htmlFor="name">Name:</label>
                            <input
                                className="input-field"
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
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
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            />
                        </div>
                        <button className="submit-button" type="submit" onClick={handleClick}>Submit</button> {/* Use the class name from CSS file */}
                    </form>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default ProfilePage;
