import React, { useEffect, useRef, useState } from 'react';
import './YourMatch.css'; // Import CSS file
import foodieCouple from './Assets/foodieCouple.svg';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Chart from 'chart.js/auto'; // Import Chart.js library

function YourMatch() {
    const location = useLocation(); // Use useLocation hook to access location state
    const selectedFoods = ["Pizza"]; // Access selected foods from location state
    const [matchPercentage, setMatchPercentage] = useState(0);
    const chartRef = useRef(null);

    useEffect(() => {
        if (selectedFoods) {
            const commonArray = findCommonElements(selectedFoods, ["Pizza"]); // Call findCommonElements with appropriate arguments
            const percentage = (commonArray.length / selectedFoods.length) * 100;
            setMatchPercentage(percentage);
        }
    }, [selectedFoods]);

    useEffect(() => {
        renderChart();
        // Cleanup chart instance when component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [matchPercentage]);

    function findCommonElements(array1, array2) {
        // Create a Set from the first array to remove duplicates
        const set1 = new Set(array1);

        // Filter the second array to only include elements that are present in the set
        return array2.filter(element => set1.has(element));
    }

    function renderChart() {
        const ctx = document.getElementById('chart');
        if (ctx && matchPercentage !== null) {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
            chartRef.current = new Chart(ctx, {
                type: 'doughnut', // Set chart type to doughnut
                data: {
                    labels: [`Match Percentage ${matchPercentage}`],
                    datasets: [
                        {
                            label: 'Match Percentage',
                            data: [matchPercentage],
                            backgroundColor: ['#36A2EB'], // Blue color
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    cutout: '70%', // Adjust doughnut hole size
                },
            });
        }
    }

    return (
        <div className="your-match-container">
            <p className="your-match-title">Your Match:</p>
            <img src={foodieCouple} alt="Foodie Couple" className="foodie-couple-image" style={{ height: "200px" }} />
            <div style={{ height: "200px", width: "200px" }}>
                <canvas id="chart" />
            </div>
        </div>
    );
}

export default YourMatch;
