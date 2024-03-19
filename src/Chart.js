import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ matchedData, notMatchedData }) => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy(); // Destroy the previous chart instance
            }

            const ctx = chartContainer.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ["Matched", "Not Matched"],
                    datasets: [{
                        label: 'My First Dataset',
                        data: [matchedData.length, notMatchedData.length],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }

        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy(); // Cleanup the chart instance when the component unmounts
            }
        };
    }, [matchedData, notMatchedData]);

    return (
        <div style={{ width: '50%' }}>
            <canvas ref={chartContainer}></canvas>
        </div>
    );
};

export default PieChart;
