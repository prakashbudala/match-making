import React, { useEffect, useRef, useState, useCallback } from 'react';
import './YourMatch.css'; // Import CSS file
import foodieCouple from './Assets/foodieCouple.svg';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation hook
import Chart from 'chart.js/auto'; // Import Chart.js library
import { arraysToCompare } from './constants';

function YourMatch() {
    const navigate = useNavigate();
    const location = useLocation(); // Use useLocation hook to access location state
    const [matchPercentages, setMatchPercentages] = useState([]);
    const [matchedItems, setMatchedItems] = useState([]);
    const chartRefs = useRef([]);
    const [isCommon, setIsCommon] = useState(false); // Corrected variable name
    const renderCharts = useCallback(() => {
        chartRefs.current.forEach((chartRef, index) => {
            const ctx = document.getElementById(`chart-${index}`);
            if (ctx && matchPercentages[index] !== null) {
                if (chartRef) {
                    chartRef.destroy(); // Destroy previous chart instance if it exists
                }

                const matchedPercentage = matchPercentages[index];
                const remainingPercentage = 100 - matchedPercentage;

                chartRefs.current[index] = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["Matched", "Unmatched"],
                        datasets: [
                            {
                                label: 'Match Percentage',
                                data: [Math.round(matchedPercentage), Math.round(remainingPercentage)],
                                backgroundColor: ['Green', 'Red'], // Green and Red colors
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        cutout: '70%',
                    },
                });
            }
        });
    }, [matchPercentages, chartRefs]);

    const arraysToCompareRef = useRef(arraysToCompare);
    arraysToCompareRef.current = arraysToCompare;

    useEffect(() => {
        const selectedFoods = location.state?.data;
        function findCommonElements(array1, array2) {
            // Create a Set from the first array to remove duplicates
            const set1 = new Set(array1);

            // Filter the second array to only include elements that are present in the set
            return array2.filter(element => set1.has(element));
        }

        if (selectedFoods) {
            const matchedItemsArray = arraysToCompareRef.current.map(({ items }) => {
                const commonArray = findCommonElements(selectedFoods, items);

                if (commonArray.length > 0) {
                    setIsCommon(true);
                }
                return commonArray; // Return matched items array
            });
            setMatchedItems(matchedItemsArray); // Set matched items array
            const percentages = matchedItemsArray.map(commonArray => (commonArray.length / selectedFoods.length) * 100);
            setMatchPercentages(percentages);
        }

        // Cleanup chart instances when component unmounts
        return () => {
            chartRefs.current.forEach(chartRef => {
                if (chartRef) {
                    chartRef.destroy();
                }
            });
        };
    }, [location.state?.data]);


    // Initialize chartRefs array and render charts when matchPercentages change
    useEffect(() => {
        chartRefs.current = new Array(matchPercentages.length).fill(null);
        renderCharts();
    }, [matchPercentages, renderCharts]);

    return (
        <div className="your-match-container">
            <p className="your-match-title">Your Match:</p>

            <img src={foodieCouple} alt="Foodie Couple" className="foodie-couple-image" style={{ height: "200px" }} />
            {isCommon ? matchPercentages.map((percentage, index) => (
                percentage > 0 &&
                <div key={index} style={{ display: "flex", alignItems: "center", boxShadow: "0px 0px 5px 2px rgba(0, 0, 0, 0.2)", padding: "10px", width: "500px", margin: "10px", borderRadius: "8px" }}>
                    <div style={{ height: "200px", width: "200px" }}>
                        <canvas id={`chart-${index}`} />
                    </div>

                    <div className="matched-items">
                        <h2> {arraysToCompare[index].name}</h2>

                        <ul>
                            {matchedItems[index].map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )) : <p>No matched found <span style={{ color: "blue", cursor: "pointer" }} onClick={() => {
                navigate('/food-preferences');
            }}>Click Here</span> to add food items..</p>}

        </div>
    );
}

export default YourMatch;
