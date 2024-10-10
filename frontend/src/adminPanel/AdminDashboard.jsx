import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const AdminDashboard = () => {
    const chartRef = useRef(null); // Reference for the canvas
    const chartInstanceRef = useRef(null); // Reference for the chart instance

    // Sample data for the chart
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Sales Data',
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Sales',
                },
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        // Cleanup function to destroy the chart instance
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="admin-dashboard">
            <h1 className="text-3xl font-bold text-center text-purple-500 mb-8">
                Admin Dashboard
            </h1>
            <div className="chart-container mx-auto" style={{ maxWidth: '600px' }}>
                <Bar ref={chartRef} data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default AdminDashboard;
