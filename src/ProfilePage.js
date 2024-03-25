import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './ProfilePage.css'; // Import CSS file

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        location: '',
    });
    const [isLoggedIn, setLoggedIn] = useState(sessionStorage.getItem('loggedIn'));
    const navigate = useNavigate();
    const handleClick = (e) => {
        e.preventDefault(); // Prevent the default button behavior
        if (formData.name.length > 0 && formData.age.length > 0 && formData.location.length > 0) {
            sessionStorage.setItem('loggedIn', true);
            sessionStorage.setItem('formData', JSON.stringify(formData));
            setLoggedIn(true);
            // Here you can add your logic to submit the form data, such as sending it to a backend server
            navigate('/food-preferences', { state: { formData } });
        } else {
            alert("Please fill the required details");
        }

    };

    const LoggedIndata = sessionStorage.getItem('formData');
    return (
        <>
            {!isLoggedIn ? (
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
                                <button className="submit-button" type="submit" onClick={handleClick}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    <div></div>
                </div>
            ) : <div className="container">
                <h2>Welcome to Foodie Match {JSON.parse(LoggedIndata)?.name}</h2> <br></br><span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                    navigate('/food-preferences');
                }}>Click Here</span><span> to add food items..</span><br></br><br></br>
                or <br></br>
                <br></br>
                <button class="logout-button" onClick={() => {
                    sessionStorage.removeItem("loggedIn")
                    setLoggedIn(false)
                }}>Logout</button>

            </div>}
        </>
    );
};

export default ProfilePage;
