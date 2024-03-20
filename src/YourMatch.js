import React, { useEffect, useRef, useState, useCallback } from 'react';
import './YourMatch.css'; // Import CSS file
import foodieCouple from './Assets/foodieCouple.svg';
// import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Chart from 'chart.js/auto'; // Import Chart.js library

function YourMatch() {
    // const location = useLocation(); // Use useLocation hook to access location state
    const [matchPercentages, setMatchPercentages] = useState([]);
    const [matchedItems, setMatchedItems] = useState([]);
    const chartRefs = useRef([]);

    // Define arraysToCompare internally
    const arraysToCompare = [
        { name: "Virat", items: ["Pizza"] },
        { name: "Sachin", items: ["Burger", "Pizza"] },
        { name: "Dhoni", items: ["Sushi", "Pizza", "Salad"] }
    ];

    const renderCharts = useCallback(() => {
        chartRefs.current.forEach((chartRef, index) => {
            const ctx = document.getElementById(`chart-${index}`);
            if (ctx && matchPercentages[index] !== null) {
                if (chartRef) {
                    chartRef.destroy();
                }
                chartRefs.current[index] = new Chart(ctx, {
                    type: 'doughnut', // Set chart type to doughnut
                    data: {
                        labels: [`Match Percentage ${matchPercentages[index]}`],
                        datasets: [
                            {
                                label: 'Match Percentage',
                                data: [matchPercentages[index]],
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
        });
    }, [matchPercentages]);

    const arraysToCompareRef = useRef(arraysToCompare);
    arraysToCompareRef.current = arraysToCompare;

    useEffect(() => {
        const selectedFoods = ["Pizza"]; // Access selected foods from location state

        function findCommonElements(array1, array2) {
            // Create a Set from the first array to remove duplicates
            const set1 = new Set(array1);

            // Filter the second array to only include elements that are present in the set
            return array2.filter(element => set1.has(element));
        }

        if (selectedFoods) {
            const percentages = arraysToCompareRef.current.map(({ items }) => {
                const commonArray = findCommonElements(selectedFoods, items);
                const percentage = (commonArray.length / selectedFoods.length) * 100;
                setMatchedItems(commonArray); // Set matched items
                return percentage;
            });
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
    }, []); // No dependencies here since arraysToCompareRef is static


    // Initialize chartRefs array and render charts when matchPercentages change
    useEffect(() => {
        chartRefs.current = new Array(matchPercentages.length).fill(null);
        renderCharts();
    }, [matchPercentages, renderCharts]);

    return (
        <div className="your-match-container">
            <p className="your-match-title">Your Match:</p>
            <img src={foodieCouple} alt="Foodie Couple" className="foodie-couple-image" style={{ height: "200px" }} />
            {matchPercentages.map((percentage, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center" }}>
                    <div style={{ height: "200px", width: "200px" }}>
                        <canvas id={`chart-${index}`} />
                    </div>
                    <div className="matched-items">
                        <p>Matched Items for {arraysToCompare[index].name}:</p>
                        <ul>
                            {matchedItems.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default YourMatch;
